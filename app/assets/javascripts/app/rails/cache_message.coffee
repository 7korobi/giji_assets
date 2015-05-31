
new Cache.Rule("message").schema ->
  @belongs_to "event", dependent: true
  @belongs_to "face"

  @order "updated_at"

  timespan = 1000 * 3600
  Cache.messages.has_face = has_face = {}
  {visible, bit, mask} = RAILS.message

  @scope (all)->
    seeing: ->
      all
      .where (o)-> 15 < o.seeing
      .sort "desk", "seeing"

    timeline: (mode)->
      enables =  visible.talk[mode]
      all.where (o)-> (o.show & enables)

    anchor: (mode, scroll)->
      enables = RAILS.message.visible.talk[mode]
      message = Cache.messages.find scroll
      if message
        [folder, vid, turn, logid] = scroll.split("-")
        regexp = ///<mw\ #{logid},#{turn},///
        all
        .where (o)-> (o.show & enables) && regexp.test o.search_words
      else
        all
        .where (o)-> false

    pins: (story_id, pins)->
      enables = RAILS.message.visible.appendex.event_desc
      all
      .sort "desc", "updated_at"
      .where (o)-> (o.show & enables) || pins["#{o.event.turn}-#{o.logid}"] && (o.story_id == story_id)

    home: (mode)->
      enables = visible.home[mode]
      all
      .where (o)-> (o.show & enables)

    talk: (mode, open, hides, search)->
      enables = visible.talk[mode]
      enables &= mask.NOT_OPEN unless open
      all
      .where (o)-> (o.show & enables) && ! hides[o.face_id]
      .search search

    memo: (mode, uniq, hides, search)->
      enables = visible.memo[mode]
      query = all
      .sort("desc", "updated_at")
      .where (o)-> (o.show & enables) && ! hides[o.face_id]
      .search search

      query = query.distinct("pen", "max_is") if uniq
      query

    warning: (hides)->
      enables = visible.warning.all
      all
      .where (o)-> (o.show & enables) && ! hides[o.face_id]

  @deploy (o)->
    logtype = o.logid[0..1]
    lognumber = o.logid[2..-1]
    switch o.mestype
      when "QUEUE"
        o.mestype = "SAY"
    switch logtype
      when "IS"
        o.logid = "II#{lognumber}"
      when "iS"
        o.logid = "iI#{lognumber}"
      when "CS"
        o.logid = "cI#{lognumber}"
      when "AS"
        o.mestype = "ADMIN"
      when "DS"
        o.mestype = "DELETED"
      when "TS"
        o.mestype = "TSAY"
    # legacy support

    o._id = o.event_id + "-" + o.logid
    o.csid ?= null
    o.face_id ?= null
    o.user_id = o.sow_auth_id

    anchor_num = o.logid[2..-1] - 0 || 0
    o.anchor = RAILS.log.anchor[o.logid[0]] + anchor_num || ""
    o.pen = "#{o.logid[0..1]}-#{o.face_id}"
    o.potof_id = "#{o.event_id}-#{o.csid}-#{o.face_id}"

    unless o.updated_at
      o.updated_at = new Date(o.date) - 0

    vdom = GUI.message.xxx
    o.mask =
      switch
        when o.logid.match /^[\-WPX]./
          "CLAN"
        when o.logid.match /^[Ti]./
          "THINK"
        when o.logid.match /^[D]./
          o.anchor = "del"
          "DELETE"
        else
          "OPEN"

    o.show =
      switch
        when o.logid.match /^.[SX]/
          vdom = GUI.message.talk
          bit.TALK
        when o.logid.match /^.[AB]/
          vdom = GUI.message.action
          o.anchor = "act"
          bit.ACTION
        when o.logid.match /^.[M]/
          vdom = GUI.message.memo
          o.anchor = "memo"
          bit.MEMO
        when o.logid.match /^.I/
          vdom = GUI.message.info
          o.anchor = "info"
          bit.INFO
        when o.logid == "EVENT-ASC"
          bit.EVENT_ASC
        when o.logid == "EVENT-DESC"
          bit.EVENT_DESC

    switch o.mestype
      when "MAKER", "ADMIN"
        vdom = GUI.message.guide unless o.show == bit.ACTION
        o.mask = "ANNOUNCE"
      when "CAST"
        vdom = GUI.message.potofs
      when "EVENT"
        vdom = GUI.message.event
        o.pen = o.event_id
        o.mask = "ALL"
        o.anchor = "info"

    o.show &= mask[o.mask]
    o.vdom = vdom

    o.log ?= ""
    o.search_words = o.log

  @map_reduce (o, emit)->
    has_face[o.face_id] = true

    if o.vdom == GUI.message.talk || o.vdom == GUI.message.guide
      time_id = Serial.serializer.Date(o.updated_at / timespan)
      item =
        count: o.log.length
        min: o.updated_at
        max: o.updated_at
      emit "mask", time_id, o.mestype, item
      emit "mask", time_id, "all", item
    emit "event", o.event_id,
      max: o.updated_at
    emit "pen", o.pen,
      max: o.updated_at


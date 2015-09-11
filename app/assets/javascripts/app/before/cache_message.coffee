
new Mem.Rule("message").schema ->
  @belongs_to "event", dependent: true
  @belongs_to "story", dependent: true
  @belongs_to "face"

  @order "updated_at"

  timespan = 1000 * 3600
  {visible, bit, mask} = RAILS.message

  ids = {}
  has =
    face: {}
    vsay: false
    bug: false

  @scope (all)->
    ids: ids
    has: has
    anker_id: (folder, vid, turn, logid)->
      id = "#{folder}-#{vid}-#{turn}-#{logid}"
      id = all.ids[id] || id
      if all.find(id)
        id
      else
        all.anker_id(folder, vid, turn - 1, logid)

    anchor: (mode, scroll)->
      enables = RAILS.message.visible.talk[mode]
      message = all.find scroll
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
      .where (o)->
        (o.show & enables) || pins["#{o.turn}-#{o.logid}"] && (o.story_id == story_id)

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

  @default ->
    log: ""
    csid: null
    face_id: null

  @deploy (o)->
    logtype = o.logid[0..1]
    lognumber = o.logid[2..-1]
    switch o.mestype
      when "QUEUE"
        o.mestype = "SAY" # data cleaned
      when "VSAY"
        story = o.story()
        event = o.event()
        has.vsay = true
        if story && event && "grave" == story.type.mob && ! event.name.match /プロローグ|エピローグ/
          o.mestype = "VGSAY"

    switch logtype
      when "IS"
        o.logid = "II#{lognumber}" # data cleaned
      when "iS"
        o.logid = "iI#{lognumber}" # data cleaned
      when "CS"
        o.logid = "cI#{lognumber}" # data cleaned
      when "AS"
        o.mestype = "ADMIN"        # data cleaned
      when "DS"
        o.mestype = "DELETED"      # data cleaned
      when "TS"
        if o.to
          has.to = true
        else
          o.mestype = "TSAY"       # data cleaned
    # legacy support

    [folder, vid, turn] = o.event_id.split("-")
    o.folder ||= folder
    o.vid ||= vid
    o.turn ||= turn

    o._id = o.event_id + "-" + o.logid
    o.user_id = o.sow_auth_id

    anchor_num = o.logid[2..-1] - 0 || 0
    o.anchor = RAILS.log.anchor[o.logid[0]] + anchor_num || ""
    o.pen = "#{o.mestype}-#{o.face_id}"
    o.potof_id = "#{o.event_id}-#{o.csid}-#{o.face_id}"

    unless o.updated_at
      o.updated_at = new Date(o.date) - 0

    vdom = GUI.message.xxx
    switch o.logid[1]
      when "S", "X"
        vdom = GUI.message.talk
        o.show = bit.TALK
      when "A", "B"
        vdom = GUI.message.action
        o.anchor = "act"
        o.show = bit.ACTION
      when "M"
        tail = o.logid[1..-1]
        anker_id = o.event_id + "-M" + tail
        o.logid = o.mestype[0..0] + tail  # data cleaned
        ids[anker_id] = o._id
        vdom = GUI.message.memo
        o.anchor = "memo"
        o.show = bit.MEMO
      when "I"
        vdom = GUI.message.info
        o.anchor = "info"
        o.show = bit.INFO

    o.mask =
      switch o.logid[0]
        when "-", "W", "P", "X"
          has.clan = true
          "CLAN"
        when "T", "i"
          has.think = true
          "THINK"
        when "V", "G"
          has.grave = true
          "GRAVE"
        when "D"
          o.anchor = "del"
          "DELETE"
        else
          "MAIN"

    switch o.mestype
      when "MAKER", "ADMIN"
        vdom = GUI.message.guide unless o.show == bit.ACTION
        o.mask = "ANNOUNCE"
      when "CAST"
        vdom = GUI.message.potofs
      when "STORY"
        o.pen = o.event_id
        o.mask = "ALL"
        switch o.logid
          when "STORY-TEXT"
            vdom = GUI.message.story_text
          when "STORY-RULE"
            vdom = GUI.message.story_rule
          when "STORY-GAME"
            vdom = GUI.message.story_game
      when "EVENT"
        vdom = GUI.message.event
        o.pen = o.event_id
        o.mask = "ALL"

    o.show &= mask[o.mask]
    o.vdom = vdom

    o.search_words = o.log

  @map_reduce (o, emit)->
    has.face[o.face_id] = true

    if o.vdom == GUI.message.talk || o.vdom == GUI.message.guide
      if o.log
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

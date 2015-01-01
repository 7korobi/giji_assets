
new Cache.Rule("message").schema ->
  @order "updated_at"
  @belongs_to "face"
  @belongs_to "event"
  @belongs_to "sow_auth"

  is_show = RAILS.message.visible
  bit = RAILS.message.bit
  mask = RAILS.message.mask

  @scope (all)->
    home: (mode)->
      enables = is_show.home[mode]
      all
      .where (o)-> (o.show & enables)

    talk: (event_id, mode, open, hides, search)->
      enables = is_show.talk[mode]
      enables &= mask.NOT_OPEN unless open
      all
      .where (o)-> (o.show & enables) && !(event_id > o.event_id) && ! hides[o.face_id]
      .search search

    memo: (mode, uniq, hides, search)->
      enables = is_show.memo[mode]
      query = all
      .sort("desc", "updated_at")
      .where (o)-> (o.show & enables) && ! hides[o.face_id]
      .search search

      query = query.distinct("pen", "max_is") if uniq
      query

    warning: (event_id, hides)->
      enables = is_show.warning.all
      all
      .where (o)-> (o.show & enables) && !(event_id > o.event_id) && ! hides[o.face_id]

    after: (updated_at, hides)->
      all
      .where (o)-> updated_at <= o.updated_at && ! hides[o.face_id]

  @deploy (o)-> 
    o._id = o.event_id + "-" + o.logid
    anchor_num  = o.logid[2..-1] - 0 || 0
    o.anchor = RAILS.log.anchor[o.logid[0]] + anchor_num || ""
    o.pen = "#{o.logid[0..1]}-#{o.face_id}"

    o.updated_at ?= new Date(o.date) - 0
    o.updated_timer ?= new Timer o.updated_at,
      prop: ->
    delete o.date

    vdom = GUI.message.xxx
    o.show =
      switch
        when o.logid.match /^vilinfo/
          vdom = GUI.story
          bit.VILLAGE
        when o.logid.match /^potofs/
          vdom = GUI.potofs
          bit.CAST
        when o.logid.match /^I./
          vdom = GUI.message.info
          bit.TALK | bit.INFO
        when o.logid.match /^[SX]./
          vdom = GUI.message.talk
          bit.TALK
        when o.logid.match /^[M]./
          vdom = GUI.message.memo
          bit.MEMO
        else
          0

    o.show |=
      switch
        when o.mestype == "MAKER"
          vdom = GUI.message.admin
          bit.INFO
        when o.mestype == "ADMIN"
          vdom = GUI.message.admin
          bit.INFO
        else
          0

    if o.logid.match /^.[AB]/
      vdom = GUI.message.action
      o.show |= bit.ACTION

    o.show &=
      switch
        when o.logid.match /^([D].\d+)/
          mask.DELETE
        when o.logid.match /^([Ti].\d+)/
          mask.THINK
        when o.logid.match /^([\-WPX].\d+)/
          mask.CLAN
        else
          mask.ALL

    o.vdom = vdom

    o.search_words = [o.log]

  has_face = {}
  Cache.messages.has_face = has_face

  @map_reduce (o, emit)->
    has_face[o.face_id] = true
    item = 
      max: o.updated_at
      min: o.updated_at

    emit "event", o.event_id, item
    emit "pen", o.pen, item


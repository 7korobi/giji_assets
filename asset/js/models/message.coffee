
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
  ats = {}

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
    if o.sow?
      o.mestype = SOW_RECORD.mestypes[o.sow.mestype]

    logtype = o.logid[0..1]
    lognumber = o.logid[2..-1]
    switch o.mestype
      when "QUEUE"
        o.mestype = "SAY" # data cleaned
      when "VSAY"
        { story, event } = o
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
    if ats[o.updated_at]
      o.updated_at += ats[o.updated_at]++
    else
      ats[o.updated_at] = 1

    template = o.template
    switch o.logid[1]
      when "S", "X"
        template = "talk"
        o.show = bit.TALK
      when "A", "B"
        template = "action"
        o.anchor = "act"
        o.show = bit.ACTION
      when "M"
        template = "memo"
        o.anchor = "memo"
        o.show = bit.MEMO
        tail = o.logid[1..-1]
        anker_id = o.event_id + "-M" + tail
        ids[anker_id] = o._id
        # o.logid = o.mestype[0..0] + tail  # data cleaned
      when "I"
        template = "info"
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
        template = "guide" unless o.show == bit.ACTION
        o.mask = "ANNOUNCE"
      when "CAST"
        template = "potofs"
      when "STORY"
        o.pen = o.event_id
        o.mask = "ALL"
      when "EVENT"
        o.pen = o.event_id
        o.mask = "ALL"

    o.show &= mask[o.mask]
    o.template = template

    o.search_words = o.log

  @map_reduce (o, emit)->
    has.face[o.face_id] = true

    switch o.template
      when "talk", "guide"
        if o.log
          time_id = pack.Date(o.updated_at / timespan)
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

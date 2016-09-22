
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
      .sort ["updated_at"], ["desc"]
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
      .sort ["updated_at"], ["desc"]
      .where (o)-> (o.show & enables) && ! hides[o.face_id]
      .search search

      query = query.distinct("pen", "max_is") if uniq
      query

    warning: (hides)->
      enables = visible.warning.all
      all
      .where (o)-> (o.show & enables) && ! hides[o.face_id]

  class @model extends @model
    log: ""
    csid: null
    face_id: null
    constructor: ->
      if @sow?
        @mestype = SOW_RECORD.mestypes[@sow.mestype]

      logtype = @logid[0..1]
      lognumber = @logid[2..-1]
      switch @mestype
        when "QUEUE"
          @mestype = "SAY" # data cleaned
        when "VSAY"
          { story, event } = @
          has.vsay = true
          if story && event && "grave" == story.type.mob && ! event.name.match /プロローグ|エピローグ/
            @mestype = "VGSAY"

      switch logtype
        when "IS"
          @logid = "II#{lognumber}" # data cleaned
        when "iS"
          @logid = "iI#{lognumber}" # data cleaned
        when "CS"
          @logid = "cI#{lognumber}" # data cleaned
        when "AS"
          @mestype = "ADMIN"        # data cleaned
        when "DS"
          @mestype = "DELETED"      # data cleaned
        when "TS"
          if @to
            has.to = true
          else
            @mestype = "TSAY"       # data cleaned
      # legacy support
      [folder, vid, turn] = @event_id.split("-")
      @folder ||= folder
      @vid ||= vid
      @turn ||= turn

      @_id = @event_id + "-" + @logid
      @user_id = @sow_auth_id

      anchor_num = @logid[2..-1] - 0 || 0
      @anchor = RAILS.log.anchor[@logid[0]] + anchor_num || ""
      @pen = "#{@mestype}-#{@face_id}"
      @potof_id = "#{@event_id}-#{@csid}-#{@face_id}"

      unless @updated_at
        @updated_at = new Date(@date) - 0
      if ats[@updated_at]
        @updated_at += ats[@updated_at]++
      else
        ats[@updated_at] = 1

      template = @template
      switch @logid[1]
        when "S", "X"
          template = "talk"
          @show = bit.TALK
        when "A", "B"
          template = "action"
          @anchor = "act"
          @show = bit.ACTION
        when "M"
          template = "memo"
          @anchor = "memo"
          @show = bit.MEMO
          tail = @logid[1..-1]
          anker_id = @event_id + "-M" + tail
          ids[anker_id] = @_id
          # @logid = @mestype[0..0] + tail  # data cleaned
        when "I"
          template = "info"
          @anchor = "info"
          @show = bit.INFO

      @mask =
        switch @logid[0]
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
            @anchor = "del"
            "DELETE"
          else
            "MAIN"

      switch @mestype
        when "MAKER", "ADMIN"
          template = "guide" unless @show == bit.ACTION
          @mask = "ANNOUNCE"
        when "CAST"
          template = "potofs"
        when "STORY"
          @pen = @event_id
          @mask = "ALL"
        when "EVENT"
          @pen = @event_id
          @mask = "ALL"

      @show &= mask[@mask]
      @template = template

      @search_words = @log

    @map_reduce: (o, emit)->
      has.face[o.face_id] = true

      switch o.template
        when "talk", "guide"
          if o.log
            time_id = Mem.pack.Date(o.updated_at / timespan)
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

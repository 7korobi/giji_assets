new Cache.Rule("map_face").schema ->
  @belongs_to "face", dependent: true
  @fields
    _id: (o)-> 
      o._id = o.face_id
      list = Cache.chr_jobs.where(face:[o.face_id]).sort()
      if list
        o.search_words =
          for chr_job in list
            chr_job.job 
        o.chr_set_ids =
          for chr_job in list
            chr_job.chr_set_id 
      else
        o.search_words = o.chr_set_ids = []
      o.win.value.合計 = o.win.all
    face_name: (o)->
      o.search_words.push o.face.name
      for sow_auth_id of o.sow_auth_id.value
        o.search_words.push sow_auth_id

  @scope "chr_set", (o)-> o.chr_set_ids
  @search (o)-> o.search_words

new Cache.Rule("map_face_story_log").schema ->
  @scope "folder", (o)-> [o.folder]
  @fields
    _id: (o)->
      o._id = o.logid_head
      o.folder = o.logid_head.split("-")[0].toUpperCase()
  @order (o)-> o.date.max


new Cache.Rule("message").schema ->
  @order_by "created_at"
  @belongs_to "face"
  @belongs_to "sow_auth"
  @scope "logid", (o)-> [o.logid]
  @scope "unread", (o)-> null
  @scope "info",   (o)-> o.is.info   && o.security
  @scope "action", (o)-> o.is.action && o.security
  @scope "talk",   (o)-> o.is.talk   && o.security
  @scope "memo",   (o)-> o.is.memo   && o.security

  @fields
    _id: (o)-> 
      o.created_at = new Date(o.date) - 0
      o._id = ID.at(o.created_at)
      delete o.date
    security: (o)->
      o.security =
        switch
          when o.logid.match /^([D].\d+)/
            ["delete", "think", "all"]
          when o.logid.match /^([qcS].\d+)|(MM\d+)/
            ["open", "clan", "think", "all"]
          when o.mestype == "MAKER"
            ["announce", "open", "clan", "think", "all"]
          when o.mestype == "ADMIN"
            ["announce", "open", "clan", "think", "all"]
          when o.logid.match /^([I].\d+)|(vilinfo)|(potofs)/
            ["announce", "open", "clan", "think", "all"]
          when o.logid.match /^([Ti].\d+)/
            ["think", "all"]
          when o.logid.match /^([\-WPX].\d+)/
            ["clan", "all"]
          else
            []
      o.scene_id = o.event_id + "-" + o.security[0]

    vdom: (o)->
      o.is = {}
      if o.mestype == "MAKER"
        o.is.info = true
      if o.mestype == "ADMIN"
        o.is.info = true
      if o.logid.match /^vilinfo/
        o.vdom = GUI.story(o)
        o.is.info = true
      if o.logid.match /^potofs/
        o.vdom = GUI.potofs(o)
        o.is.info = true
      if o.logid.match /^.[I]/
        o.vdom = GUI.message.info(o)
        o.is.info = true
      if o.logid.match /^.[AB]/
        o.vdom = GUI.message.action(o)
        o.is.action = true
      if o.logid.match /^.[SX]/
        o.vdom = GUI.message.talk(o)
        o.is.talk = true
      if o.logid.match /^.[M]/
        o.vdom = GUI.message.memo(o)
        o.is.memo = true

new Cache.Rule("potof").schema ->

new Cache.Rule("event").schema ->

new Cache.Rule("story").schema ->
  @scope "folder", (o)-> [o.folder]
  @scope "game", (o)-> [o.type.game]
  @scope "rating", (o)-> [o.rating]
  @scope "say_limit", (o)-> [o.view.say_limit]
  @scope "update_at", (o)-> [o.view.update_at]
  @scope "update_interval", (o)-> [o.view.update_interval]
  @scope "player_length", (o)-> [o.view.player_length]
  @scope "role", (o)-> o.view.role_types
  @scope "event", (o)-> o.view.event_types
  @search (o)-> [o.name]

  caption = (field, key)->
    data = field[key]
    if data
      data.CAPTION
    else
      null

  all_events = Object.keys RAILS.events

  @fields
    _id: (o)->
      o.card.role = _.difference o.card.config, all_events
      o.view = 
        rating:
          m "img",
            src: GUI.img_head + "/icon/cd_#{o.rating}.png"
        update_at:
          Timer.hhmm(o.upd.hour, o.upd.minute)
        update_interval:
          "#{o.upd.interval * 24}時間"
        player_length:
          o.vpl.last
        role_types:
          GUI.names.config o.card.role, (name, size)-> name
        event_types:
          GUI.names.config o.card.event, (name, size)-> name
        roles:
          GUI.names.config o.card.role, (name, size)->
            m "kbd", "#{name}x#{size}"
        events:
          GUI.names.config o.card.event, (name, size)->
            m "kbd", "#{name}x#{size}"
        say_limit: caption(RAILS.saycnt,    o.type.say)  || "――"
        game_rule: caption(RAILS.game_rule, o.type.game) || "タブラの人狼"


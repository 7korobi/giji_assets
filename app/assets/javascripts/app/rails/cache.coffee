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


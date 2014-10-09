new Cache.Rule("map_face").schema ->
  @belongs_to "face", dependent: true
  @fields
    _id: (o)-> 
      o._id = o.face_id
      list = Cache.chr_jobs.face[o.face_id]
      o.chr_set_ids = 
        if list
          chr_job.chr_set_id for chr_job in list
        else
          []
      o.win.value.合計 = o.win.all

  @scope "chr_set", (o)-> o.chr_set_ids

new Cache.Rule("map_face_story_log").schema ->
  @scope "folder", (o)-> [o.folder]
  @fields
    _id: (o)->
      o._id = o.logid_head
      o.folder = o.logid_head.split("-")[0].toUpperCase()
  @order (o)-> - o.date.max

new Cache.Rule("story").schema ->
  @scope "folder", (o)-> [o.folder]
  @scope "game_rule", (o)-> [o.view.game_rule]
  @scope "say_limit", (o)-> [o.view.say_limit]
  @scope "update_at", (o)-> [o.view.update_at]
  @scope "update_interval", (o)-> [o.view.update_interval]
  @scope "player_length", (o)-> [o.view.player_length]

  caption = (field, key)->
    data = field[key]
    if data
      data.CAPTION
    else
      null

  @fields
    _id: (o)->
      o.view = 
        rating:
          m "img",
            src: "//7korobi.gehirn.ne.jp/images/icon/cd_#{o.rating}.png"
        update_at:
          Timer.hhmm(o.upd.hour, o.upd.minute)
        update_interval:
          "#{o.upd.interval * 24}時間"
        player_length:
          o.vpl.last
        configs:
          GUI.names.config o.card.config, (name, size)->
            m "span.mark", "#{name}x#{size}"
        events:
          GUI.names.config o.card.event, (name, size)->
            m "span.mark", "#{name}x#{size}"
        say_limit: caption(RAILS.saycnt,    o.type.say)  || "――"
        game_rule: caption(RAILS.game_rule, o.type.game) || "タブラの人狼"


new Mem.Rule("story").schema ->
  @scope (all)->
    menu: (folder, game, rating, event_type, role_type, say_limit, player_length, update_at, update_interval, search)->
      all.sort("desc", "order").search(search).where (o)->
        tf = true
        tf &&= o.folder == folder if folder != "all"
        tf &&= o.rating == rating if rating != "all"
        tf &&= o.type.game == game if game != "all"
        tf &&= o.view.say_limit == say_limit if say_limit != "all"
        tf &&= o.view.update_at == update_at if update_at != "all"
        tf &&= o.view.player_length == Number(player_length) if player_length != "all"
        tf &&= o.view.update_interval == update_interval if update_interval != "all"
        tf &&= _.find(o.view.role_types, (v)-> v == role_type) if role_type != "all"
        tf &&= _.find(o.view.event_types, (v)-> v == event_type) if event_type != "all"
        tf

    playing: ->
      all.where(mode: "playing")

    prologue: ->
      all.where(mode: "prologue")

    oldlog: ->
      all.where(mode: "oldlog")

    dispose: ->
      all.where(mode: "dispose")


  caption = (field, key)->
    data = field[key]
    if data
      data.CAPTION
    else
      null

  all_traps = Mem.Query.traps.ids

  @deploy (o)->
    o.order = o.folder + GUI.field(o.vid, 4)
    o.rating = "default" unless o.rating
    o.user_id = o.sow_auth_id
    o.card.role = _.difference o.card.config, all_traps

    o.type.game ?= "TABULA"
    o.type.mob  ?= "visiter"

    if mob = Mem.Query.roles.find(o.type.mob)
      Mem.Query.roles.find("mob").name = mob.name

    o.evil ||= Mem.conf.folder[o.folder].story.evil
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
        GUI.names.config o.card.role, (size, {name})-> name
      event_types:
        GUI.names.config o.card.event, (size, {name})-> name
      role_cards:
        GUI.names.config o.card.role, (size, {name, win})->
          if size > 1
            m ".emboss.WIN_#{win}", "#{name}x#{size}"
          else
            m ".emboss.WIN_#{win}", "#{name}"
      trap_cards:
        GUI.names.config o.card.event, (size, {name, win})->
          if size > 1
            m ".emboss.WIN_#{win}", "#{name}x#{size}"
          else
            m ".emboss.WIN_#{win}", "#{name}"
      say_limit: Mem.conf.say[   o.type.say ]?.CAPTION || "――"
      say_limit_help: Mem.conf.say[   o.type.say ]?.HELP || "――"
      game_rule: Mem.conf.rule[o.type.game]?.CAPTION || "タブラの人狼"

    o.search_words = o.name

  @map_reduce (o, emit)->
    item =
      count: 1
    emit "all", "all", item
    emit "folder", o.folder, item
    emit "game", o.type.game, item
    emit "rating", o.rating, item
    emit "say_limit", o.view.say_limit, item
    emit "update_at", o.view.update_at, item
    emit "update_interval", o.view.update_interval, item
    emit "player_length", o.view.player_length, item
    for role_type in o.view.role_types
      emit "role_type", role_type, item
    for event_type in o.view.event_types
      emit "event_type", event_type, item

new Cache.Rule("map_face").schema ->
  @belongs_to "face", dependent: true
  @scope (all)->
    active: (order, chr_set, search)->
      order = RAILS.map_faces_orders[order].order
      all.in(chr_set_ids: chr_set).search(search).sort "desc", (o)->
        o.win.value[order] ?= 0

  @deploy (o)->
    o._id = o.face_id
    o.win.value.合計 = o.win.all

    list = Cache.chr_jobs.face(o.face_id).list()
    if list
      search_words = list.map (o)-> o.job
      o.chr_set_ids = list.map (o)-> o.chr_set_id
    else
      search_words = o.chr_set_ids = []

    search_words.push o.face.name
    for sow_auth_id of o.sow_auth_id.value
      search_words.push sow_auth_id
    o.search_words = search_words.join("\t")

  item =
    count: 1
  @map_reduce (o, emit)->
    for id in o.chr_set_ids
      emit "chr_set", id, item


new Cache.Rule("map_face_story_log").schema ->
  @order (o)-> o.date.max

  @deploy (o)->
    o._id = o.logid_head
    o.folder = o.logid_head.split("-")[0].toUpperCase()


new Cache.Rule("item").schema ->
  @deploy (o)->

new Cache.Rule("event").schema ->
  @order "_id"

  {visible, bit, mask} = RAILS.message

  @deploy (o)->
    o._id ||= "#{o.story_id}-#{o.turn}"
    o.event_id = o._id

new Cache.Rule("story").schema ->
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
        tf &&= o.view.role_types.find((v)-> v == role_type) if role_type != "all"
        tf &&= o.view.event_types.find((v)-> v == event_type) if event_type != "all"
        tf

  caption = (field, key)->
    data = field[key]
    if data
      data.CAPTION
    else
      null

  all_events = Object.keys RAILS.events

  @deploy (o)->
    o.order = o.folder + GUI.field(o.vid, 4)
    o.rating = "default" unless o.rating
    o.user_id = o.sow_auth_id
    o.card.role = _.difference o.card.config, all_events

    o.type.game ?= "TABULA"
    o.type.mob  ?= "visiter"
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
      role_cards:
        GUI.names.config o.card.role, (name, size)->
          if size > 1
            m ".emboss", "#{name}x#{size}"
          else
            m ".emboss", "#{name}"
      event_cards:
        GUI.names.config o.card.event, (name, size)->
          if size > 1
            m ".emboss", "#{name}x#{size}"
          else
            m ".emboss", "#{name}"
      say_limit: RAILS.saycnt[   o.type.say ]?.CAPTION || "――"
      game_rule: RAILS.game_rule[o.type.game]?.CAPTION || "タブラの人狼"

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

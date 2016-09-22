new Mem.Rule("story").schema ->
  @scope (all)->
    menu: (folder, game, rating, event_type, role_type, say_limit, player_length, update_at, update_interval, search)->
      all.sort(["order"],["desc"]).search(search).where (o)->
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


  all_traps = Mem.Query.traps.ids

  class @model extends @model
    constructor: ->
      @order = @folder + GUI.field(@vid, 4)
      @rating = "default" unless @rating
      @user_id = @sow_auth_id
      @card.role = _.difference @card.config, all_traps

      @type.game ?= "TABULA"
      @type.mob  ?= "visiter"

      if mob = Mem.Query.roles.find(@type.mob)
        Mem.Query.roles.find("mob").name = mob.name

      @evil ||= Mem.conf.folder[@folder].story.evil
      @view =
        rating:
          m "img",
            src: GUI.img_head + "/icon/cd_#{@rating}.png"
        update_at:
          Timer.hhmm(@upd.hour, @upd.minute)
        update_interval:
          "#{@upd.interval * 24}時間"
        player_length:
          @vpl.last
        role_types:
          GUI.names.config @card.role, (size, {label})-> label
        event_types:
          GUI.names.config @card.event, (size, {label})-> label
        role_cards:
          GUI.names.config @card.role, (size, {label, win})->
            if size > 1
              m ".emboss.WIN_#{win}", "#{label}x#{size}"
            else
              m ".emboss.WIN_#{win}", "#{label}"
        trap_cards:
          GUI.names.config @card.event, (size, {label, win})->
            if size > 1
              m ".emboss.WIN_#{win}", "#{label}x#{size}"
            else
              m ".emboss.WIN_#{win}", "#{label}"
        say_limit_help: Mem.conf.say[  @type.say  ]?.help || "――"
        say_limit:      Mem.conf.say[  @type.say  ]?.label || "――"
        game_rule:      Mem.conf.rule[ @type.game ]?.label || "タブラの人狼"

      @search_words = @name

    @map_reduce: (o, emit)->
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

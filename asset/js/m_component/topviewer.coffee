doc.component.topviewer =
  controller: ->

    inputs = []
    deploy = (type, hash)->
      inputs.push type
      Mem.Query.inputs.hash[type].options = hash

    deploy "menu_order",           Mem.conf.map_faces_order
    deploy "menu_chr_set",         Mem.Query.map_faces.reduce
    if Url.conf.stories
      story = (h)->
        Mem.Query.storys.menu(Url.params.folder, Url.conf.stories.values(h)...).reduce

      deploy "menu_folder",          story()
      deploy "menu_game",            story game: "all"
      deploy "menu_rating",          story rating: "all"
      deploy "menu_say_limit",       story say_limit: "all"
      deploy "menu_update_at",       story update_at: "all"
      deploy "menu_role_type",       story role_type: "all"
      deploy "menu_event_type",      story event_type: "all"
      deploy "menu_player_length",   story player_length: "all"
      deploy "menu_update_interval", story update_interval: "all"
    @tie = InputTie.btns Url.params, inputs
    return

    main_menu.drill "order",
      label: "並び順"
      view: ->
        for key, o of Mem.conf.map_faces_order
          attr = g.menu key, params.order, {}
          m "span", attr, o.label
    main_menu.drill "chr_set",
      label: "キャラセット"
      view: (sub_menu)->
        sub_menu.radio {class: "chr_set"}, params.chr_set, Mem.Query.map_faces.reduce, "chr_set", (key)->
          Mem.Query.chr_sets.find(key).label
    main_menu.drill "rating",
      label: "こだわり"
      view: (sub_menu)->
        m ".paragraph",
          sub_menu.radio {class:"edge rating"}, Url.prop.rating, reduce(rating: "all"), "rating", (key, o)->
            m "span",
              m "img.pull-left",
                src: GUI.img_head + "/icon/cd_#{o.min_is.rating}.png"
              Mem.conf.rating[key].label
    main_menu.drill "game",
      label: "ルール"
      view: (sub_menu)->
        m ".paragraph",
          sub_menu.radio {class:"edge game"}, Url.prop.game, reduce(game: "all"), "game", (key, o)->
            o.min_is.view.game_rule
    main_menu.drill "folder",
      label: "州"
      view: (sub_menu)->
        m ".paragraph",
          sub_menu.radio {class:"edge folder"}, Url.prop.folder, reduce(), "folder", (key, o)->
            CONF_FOLDER[key]?.nation
    main_menu.drill "say_limit",
      label: "発言制限"
      view: (sub_menu)->
        m ".paragraph",
          sub_menu.radio {class:"edge say_limit"}, Url.prop.say_limit, reduce(say_limit: "all"), "say_limit", (key, o)->
            o.min_is.view.say_limit
    main_menu.drill "update_at",
      label: "更新時刻"
      view: (sub_menu)->
        m ".paragraph",
          sub_menu.radio {class:"edge update_at"}, Url.prop.update_at, reduce(update_at: "all"), "update_at", (key, o)->
            o.min_is.view.update_at
    main_menu.drill "update_interval",
      label: "更新間隔"
      view: (sub_menu)->
        m ".paragraph",
          sub_menu.radio {class:"edge update_interval"}, Url.prop.update_interval, reduce(update_interval: "all"), "update_interval", (key, o)->
            o.min_is.view.update_interval
    main_menu.drill "event_type",
      label: "事件"
      view: (sub_menu)->
        m ".paragraph",
          sub_menu.radio {class:"edge event_type"}, Url.prop.event_type, reduce(event_type: "all"), "event_type", (key, o)->
            key
    main_menu.drill "role_type",
      label: "役職"
      view: (sub_menu)->
        m ".paragraph",
          sub_menu.radio {class:"edge role_type"}, Url.prop.role_type, reduce(role_type: "all"), "role_type", (key, o)->
            key
    main_menu.drill "player_length",
      label: "人数"
      view: (sub_menu)->
        m ".paragraph",
          sub_menu.radio {class:"edge player_length"}, Url.prop.player_length, reduce(player_length: "all"), "player_length", (key, o)->
            o.min_is.view.player_length + "人"

  view: ->
    timeline = ->
      m.component doc.component.timeline, "#timeline", size: [2 * doc.width.content(), 150]

    m ".paragraph",
      switch menu.params.icon
        when "cog"
          btns = (btn)->
            [btn.head(), btn.field() ]
          input = Url.tie.input
          [
            btns input.theme
            btns input.width
            btns input.layout
            btns input.font
          ]
        when "pin", "home"
          [
            timeline()
          ]
        when "mail"
          [
            timeline()
            m "h6", "貼り付けたメモを表示します。 - メモ"
            m.component doc.component.security_modes, Url.prop.memo
            m.component doc.component.potof_modes
          ]
        when "chat-alt"
          [
            timeline()
            m "h6", "村内の発言を表示します。 - 発言"
            m.component doc.component.security_modes, Url.prop.talk
            m.component doc.component.potof_modes
          ]
        when "clock"
          [
            timeline()
            m "h6", "メモを履歴形式で表示します。 - メモ"
            m.component doc.component.security_modes, Url.prop.memo
            m.component doc.component.potof_modes
          ]
        when "search"
          input = Url.tie.input
          input.search

          [
            timeline()
            input.search.field()
            input.search.label()
            m "hr.black"
          ]

          # search
          [
            m "h6", "検索する。"
            input.search.field()
            main_menu.drills {}, ["folder", "game", "event_type", "role_type", "rating", "say_limit", "player_length", "update_at", "update_interval"]
          ]

        when "th-large"
          # characters
          [
            m "h6", "タグを選んでみよう"
            input.tag.field vdom
          ]

          # chr_sets
          [
            m "h6", "詳しく検索してみよう"
            input.search.field()
            m "span", "検索条件：キャラクター名 / 肩書き / プレイヤー "
            m "h6", "キャラセットを選んでみよう"
            main_menu.drills {}, ["order", "chr_set"]
          ]
        when "resize-full"
          []
        when "resize-normal"
          []
        else
          []


doc.component.topviewer =
  controller: ->
    reduce = (h)->
      Mem.Query.storys.menu(Url.params.folder, Url.conf.stories.values(h)...).reduce
    return

    main_menu.drill "order",
      caption: "並び順"
      view: ->
        for key, o of Mem.conf.map_faces_order
          attr = g.menu key, params.order, {}
          m "span", attr, o.caption
    main_menu.drill "chr_set",
      caption: "キャラセット"
      view: (sub_menu)->
        sub_menu.radio {class: "chr_set"}, params.chr_set, Mem.Query.map_faces.reduce, "chr_set", (key)->
          Mem.Query.chr_sets.find(key).caption
    main_menu.drill "rating",
      caption: "こだわり"
      view: (sub_menu)->
        m ".paragraph",
          sub_menu.radio {class:"edge rating"}, Url.prop.rating, reduce(rating: "all"), "rating", (key, o)->
            m "span",
              m "img.pull-left",
                src: GUI.img_head + "/icon/cd_#{o.min_is.rating}.png"
              Mem.conf.rating[key].caption
    main_menu.drill "game",
      caption: "ルール"
      view: (sub_menu)->
        m ".paragraph",
          sub_menu.radio {class:"edge game"}, Url.prop.game, reduce(game: "all"), "game", (key, o)->
            o.min_is.view.game_rule
    main_menu.drill "folder",
      caption: "州"
      view: (sub_menu)->
        m ".paragraph",
          sub_menu.radio {class:"edge folder"}, Url.prop.folder, reduce(), "folder", (key, o)->
            CONF_FOLDER[key]?.nation
    main_menu.drill "say_limit",
      caption: "発言制限"
      view: (sub_menu)->
        m ".paragraph",
          sub_menu.radio {class:"edge say_limit"}, Url.prop.say_limit, reduce(say_limit: "all"), "say_limit", (key, o)->
            o.min_is.view.say_limit
    main_menu.drill "update_at",
      caption: "更新時刻"
      view: (sub_menu)->
        m ".paragraph",
          sub_menu.radio {class:"edge update_at"}, Url.prop.update_at, reduce(update_at: "all"), "update_at", (key, o)->
            o.min_is.view.update_at
    main_menu.drill "update_interval",
      caption: "更新間隔"
      view: (sub_menu)->
        m ".paragraph",
          sub_menu.radio {class:"edge update_interval"}, Url.prop.update_interval, reduce(update_interval: "all"), "update_interval", (key, o)->
            o.min_is.view.update_interval
    main_menu.drill "event_type",
      caption: "事件"
      view: (sub_menu)->
        m ".paragraph",
          sub_menu.radio {class:"edge event_type"}, Url.prop.event_type, reduce(event_type: "all"), "event_type", (key, o)->
            key
    main_menu.drill "role_type",
      caption: "役職"
      view: (sub_menu)->
        m ".paragraph",
          sub_menu.radio {class:"edge role_type"}, Url.prop.role_type, reduce(role_type: "all"), "role_type", (key, o)->
            key
    main_menu.drill "player_length",
      caption: "人数"
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
          btns = ({head, field})->
            [head(), field (o)-> o.caption ]
          input = Url.tie.input
          btns input.theme
          btns input.width
          btns input.layout
          btns input.font
        when "pin", "home"
          timeline()
        when "mail"
          timeline()
          m "h6", "貼り付けたメモを表示します。 - メモ"
          m.component doc.component.security_modes, Url.prop.memo
          m.component doc.component.potof_modes
        when "chat-alt"
          timeline()
          m "h6", "村内の発言を表示します。 - 発言"
          m.component doc.component.security_modes, Url.prop.talk
          m.component doc.component.potof_modes
        when "clock"
          timeline()
          m "h6", "メモを履歴形式で表示します。 - メモ"
          m.component doc.component.security_modes, Url.prop.memo
          m.component doc.component.potof_modes
        when "search"
          timeline()
          m "input.medium", Txt.input Url.prop.search
          m "span", "発言中の言葉を検索します。"
          m "hr.black"

          # search
          m "h6", "検索する。"
          m "input.mini", Txt.input(Url.prop.search)
          main_menu.drills {}, ["folder", "game", "event_type", "role_type", "rating", "say_limit", "player_length", "update_at", "update_interval"]

        when "th-large"
          # characters
          m "h6", "タグを選んでみよう"
          input.tag.field vdom

          # chr_sets
          m "h6", "詳しく検索してみよう"
          input.search.field()
          m "span", "検索条件：キャラクター名 / 肩書き / プレイヤー "
          m "h6", "キャラセットを選んでみよう"
          main_menu.drills {}, ["order", "chr_set"]

        when "resize-full"
          null
        when "resize-normal"
          null
        else
          null

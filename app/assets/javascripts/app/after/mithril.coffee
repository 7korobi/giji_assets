GUI.if_exist "#contentframe", (dom)->

GUI.if_exist "#buttons", (dom)->
  unless head.browser.ios
    win.on.orientation.push ->
      {alpha, beta, gamma} = win.orientation
      z = - alpha + beta + gamma
      rotate = "rotateZ(#{z}deg)"

      anime = (box)->
        box.style.webkitTransform = rotate
        box.style.mozTransform = rotate if head.browser.ff
        box.style.msTransform = rotate if head.browser.ie
        box.style.oTransform = rotate if head.browser.opera
        box.style.transform = rotate
      for box in document.querySelectorAll(".icon-cog")
        anime box

  layout = new GUI.Layout dom, 1, -1, 120
  layout.width = 5
  layout.transition()

  m.mount dom,
    controller: ->
    view: ->
      vdoms = []
      section = (icon)->
        return unless menu.icon.nodes[icon]
        vdom =
          m "section", menu.icon.start({class:"glass"}, icon),
            m ".bigicon",
              m ".icon-#{icon}", " "
            m ".badge.pull-right", badges[icon]() if badges[icon]
        vdoms.push vdom

      badges =
        "pin": ->
          doc.messages.pins(Url.prop).list().length - Cache.events.list().length
        "home": ->
          Cache.messages.home("announce").list().length - Cache.events.list().length
        "mail": ->
          prop = _.merge {}, Url.prop,
            memo: -> "all"
            uniq: -> true
            search: -> ""
          doc.messages.memo(prop).list().length - Cache.events.list().length
        "clock": ->
          prop = _.merge {}, Url.prop,
            talk: -> "all"
            open: -> true
            search: -> ""
          doc.messages.history(prop).list().length - Cache.events.list().length
        "chat-alt": ->
          prop = _.merge {}, Url.prop,
            talk: -> "all"
            open: -> true
            search: -> ""
          doc.messages.talk(prop).list().length - Cache.events.list().length
        "th-large": ->
          Cache.map_faces.active(Url.prop.order(), Url.prop.chr_set(), Url.prop.search()).list().length

      switch menu.scope.state()
        when "pins"
          section "pin"

        when "memo", "history"
          section "home"
          section "clock"
          section "mail"
          section "chat-alt"

        when "home", "talk"
          section "home"
          section "mail"
          section "chat-alt"

        when "full"
          section "resize-normal"
        when "normal"
          section "resize-full"

      section "pencil"
      section "th-large"
      section "search" unless "pins" == menu.scope.state()
      section "cog"

      m "table", m "tr", m "td", vdoms


GUI.if_exist "#topviewer", (dom)->
  layout = new GUI.Layout dom, 0, 1, 110, head.browser.ios, 0

  m.mount dom,
    controller: ->
    view: ->
      menu.icon.view()


GUI.if_exist "title", (dom)->
  m.mount dom,
    controller: ->
    view: ->
      story = Cache.storys.find Url.prop.story_id()
      event = Cache.events.find Url.prop.event_id()
      if story? && event?
        "#{story.name} #{event.name}"
      else
        "人狼議事"

if gon?.potofs? && gon?.events? && gon.event?
  catch_gon.villages()

if gon?.potofs?
  GUI.if_exist "#sayfilter", (dom)->
    layout = new GUI.Layout dom, -1, 1, 100
    layout.small_mode = true
    layout.large_mode = ->
      ! (menu.icon.state() || layout.small_mode)

    wide_attr = GUI.attrs {}, ->
      @click ->
        layout.small_mode = ! layout.small_mode
        unless layout.small_mode
          menu.icon.state ""
      @actioned ->
        layout.translate()

    seeing_top = 100
    seeing_measure =
      config: (elem)->
        seeing_top = elem.offsetTop

    line_text_height = 27
    line_text_height_measure =
      config: (elem)->
        line_text_height = elem.offsetHeight

    m.mount dom,
      controller: ->
      view: ->
        layout.width  = Url.prop.right_width()
        layout.width += Url.prop.content_width() if layout.large_mode()


        if layout.width < 90
          layout.width = 90
          potofs =
            m "section.table-swipe",
              m "table",
                m "tfoot",
                  m "tr.center",
                    m "th[colspan=2]"
                m "tbody.plane", {test:"test"},
                  m "tr",
                      m "th.calc", "…"
          filter = []
        else
          filter_size = Math.floor((win.height - seeing_top) / line_text_height) - 3
          center_id = win.scroll.prop()
          potofs = GUI.message.potofs()

          anchorview = doc.messages.anchor(Url.prop).list()
          seeingview = doc.messages.seeing(filter_size, win.scroll.center)

          go_click = (o)->
            GUI.attrs {}, ->
              @click ->
                Url.prop.talk_at o._id
                Url.prop.pins {}
                menu.icon.change ""
                menu.scope.change "talk"
                Url.prop.scroll ""
                win.scroll.rescroll Url.prop.talk_at

          day = 24 * 60 * 60
          star = (o)->
            if doc.seeing[o._id] >= day
              attr = GUI.attrs {}, ->
                @end (e)->
                  delete doc.seeing[o._id]
              m "span.#{o.mestype}.btn.edge", attr, "★ "

            else
              attr = GUI.attrs {}, ->
                @end (e)->
                  doc.seeing_add o._id, day
              m "span.#{o.mestype}.btn.edge", attr, "☆ "

          filter =
            m "section.plane",
              m "h6", "参照ログ"
              for o in anchorview
                m ".line_text",
                  m ".#{o.mestype}.badge", go_click(o), "#{o.turn}:#{o.anchor}"
                  m.trust o.log.line_text
              m "h6", seeing_measure, "よく見ていたログ"
              for o in seeingview
                if o._id == center_id
                  tag = ".line_text.attention"
                else
                  tag = ".line_text"
                m tag, line_text_height_measure,
                  star(o)
                  m ".#{o.mestype}.badge", go_click(o), "#{o.turn}:#{o.anchor}"
                  m.trust "#{o.name} #{o.log.line_text}"

        potofs.children[0].children[1].attrs.className = "plane fine"
        for key, val of wide_attr
          potofs.children[0].children[1].attrs[key] = val

        event = Cache.events.find Url.prop.event_id()
        m "div",
          if event?
            m ".head", event.name
          else
            m ".foot"
          m "aside",
            potofs
            filter
          m ".foot"


if gon?.events? && gon.event?
  GUI.if_exist "#messages", (dom)->
    win.scroll.size = 30

    change_pin = (id)->
      target = menu.scope.state()
      switch target
        when "history"
          target_at = Url.prop.memo_at
        when "memo", "talk", "home"
          target_at = Url.prop["#{target}_at"]

      if target_at
        target_at id
        Url.prop.back target

      Url.prop.scroll id
      menu.icon.change "pin"

    GUI.message.delegate.tap_anchor = (turn, logid, id, by_id)->
      [folder, vid, by_turn, by_logid] = by_id.split("-")
      anker_id = Cache.messages.anker_id(folder, vid, turn, logid)
      [__, __, __, logid] = anker_id.split("-")

      has_tap = Cache.messages.find(anker_id)
      event = Cache.events.find("#{folder}-#{vid}-#{turn}")
      doc.load.event has_tap, event, ->
        pins = Url.prop.pins()
        pins["#{by_turn}-#{by_logid}"] = true
        pins["#{turn}-#{logid}"] = true
        change_pin(by_id)

    GUI.message.delegate.tap_identity = (turn, logid, id)->
      pins = Url.prop.pins()
      pins["#{turn}-#{logid}"] = true
      Url.prop.pins pins
      change_pin(id)

    menu.scope.node "history",
      open: ->
        Url.prop.scroll ""
        win.scroll.rescroll Url.prop.memo_at
    menu.scope.node "memo",
      open: ->
        Url.prop.scroll ""
        win.scroll.rescroll Url.prop.memo_at
    menu.scope.node "talk",
      open: ->
        Url.prop.scroll ""
        win.scroll.rescroll Url.prop.talk_at
    menu.scope.node "home",
      open: ->
        Url.prop.scroll ""
        win.scroll.rescroll Url.prop.home_at
    menu.scope.node "pins",
      open: ->
        win.scroll.rescroll Url.prop.scroll

    menu.icon.icon "pin",
      open: ->
        menu.scope.change "pins"
      close: ->
        Url.prop.pins {}
        menu.scope.change Url.prop.back()
      view: ->
        [ m ".paragraph",
            doc.timeline()
        ]

    menu.icon.icon "home",
      open: ->
        menu.scope.change "home"
      view: ->
        [ doc.timeline()
        ]

    menu.icon.icon "mail",
      open: ->
        menu.scope.change "memo"
      view: ->
        [ m ".paragraph",
            doc.timeline()
            m "h6", "貼り付けたメモを表示します。 - メモ"
            doc.security_modes Url.prop.memo
          doc.potofs()
        ]

    menu.icon.icon "chat-alt",
      open: ->
        menu.scope.change "talk"
      view: ->
        [ m ".paragraph",
            doc.timeline()
            m "h6", "村内の発言を表示します。 - 発言"
            doc.security_modes Url.prop.talk
          doc.potofs()
        ]

    menu.icon.icon "clock",
      open: ->
        menu.scope.change "history"
      view: ->
        [ m ".paragraph",
            doc.timeline()
            m "h6", "メモを履歴形式で表示します。 - メモ"
            doc.security_modes Url.prop.memo
          doc.potofs()
        ]

    menu.icon.icon "search",
      view: ->
        m ".paragraph",
          doc.timeline()
          m "input.medium", Txt.input Url.prop.search
          m "span", "発言中の言葉を検索します。"
          m "hr.black"


    m.mount dom,
      controller: ->
      view: ->
        win.scroll.pager "div", doc.messages[menu.scope.state()](Url.prop).list(), (o)->
          anchor_num  = o.logid[2..] - 0 || 0
          o.anchor = RAILS.log.anchor[o.logid[0]] + anchor_num || ""
          unless o.updated_at
            o.updated_at = new Date(o.date) - 0
            delete o.date
          if o.vdom
            o.vdom(o)
          else
            m ".paragraph", JSON.stringify o

    m.startComputation()
    window.requestAnimationFrame ->
      catch_gon.messages()

      menu.scope.open()
      m.endComputation()

if gon?.stories?
  Cache.rule.story.set gon.stories
  GUI.if_exist "#stories", (dom)->
    menu.icon.icon "resize-full",
      open: ->
        win.scroll.size = 30
        menu.scope.change "full"
    menu.icon.icon "resize-normal",
      deploy: ->
        win.scroll.size = 120
        menu.scope.change "normal"
      open: ->
        win.scroll.size = 120
        menu.scope.change "normal"

    m.mount dom,
      controller: ->
      view: ->
        query = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values()...)
        m ".paragraph",
          menu.icon.icon "search",
            deploy: (main_menu)->
              main_menu.drill "rating",
                caption: "こだわり"
                view: (sub_menu)->
                  reduce = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(rating: "all")...).reduce()
                  m ".paragraph",
                    sub_menu.radio {class:"edge rating"}, Url.prop.rating, reduce, "rating", (key, o)->
                      m "span",
                        m "img.pull-left",
                          src: GUI.img_head + "/icon/cd_#{o.min_is.rating}.png"
                        RAILS.rating[key].caption
              main_menu.drill "game",
                caption: "ルール"
                view: (sub_menu)->
                  reduce = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(game: "all")...).reduce()
                  m ".paragraph",
                    sub_menu.radio {class:"edge game"}, Url.prop.game, reduce, "game", (key, o)->
                      o.min_is.view.game_rule
              main_menu.drill "folder",
                caption: "州"
                view: (sub_menu)->
                  reduce = Cache.storys.menu("all", Url.routes.search.stories.values()...).reduce()
                  m ".paragraph",
                    sub_menu.radio {class:"edge folder"}, Url.prop.folder, reduce, "folder", (key, o)->
                      GAME[key]?.nation
              main_menu.drill "say_limit",
                caption: "発言制限"
                view: (sub_menu)->
                  reduce = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(say_limit: "all")...).reduce()
                  m ".paragraph",
                    sub_menu.radio {class:"edge say_limit"}, Url.prop.say_limit, reduce, "say_limit", (key, o)->
                      o.min_is.view.say_limit
              main_menu.drill "update_at",
                caption: "更新時刻"
                view: (sub_menu)->
                  reduce = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(update_at: "all")...).reduce()
                  m ".paragraph",
                    sub_menu.radio {class:"edge update_at"}, Url.prop.update_at, reduce, "update_at", (key, o)->
                      o.min_is.view.update_at
              main_menu.drill "update_interval",
                caption: "更新間隔"
                view: (sub_menu)->
                  reduce = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(update_interval: "all")...).reduce()
                  m ".paragraph",
                    sub_menu.radio {class:"edge update_interval"}, Url.prop.update_interval, reduce, "update_interval", (key, o)->
                      o.min_is.view.update_interval
              main_menu.drill "event_type",
                caption: "事件"
                view: (sub_menu)->
                  reduce = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(event_type: "all")...).reduce()
                  m ".paragraph",
                    sub_menu.radio {class:"edge event_type"}, Url.prop.event_type, reduce, "event_type", (key, o)->
                      key
              main_menu.drill "role_type",
                caption: "役職"
                view: (sub_menu)->
                  reduce = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(role_type: "all")...).reduce()
                  m ".paragraph",
                    sub_menu.radio {class:"edge role_type"}, Url.prop.role_type, reduce, "role_type", (key, o)->
                      key
              main_menu.drill "player_length",
                caption: "人数"
                view: (sub_menu)->
                  reduce = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(player_length: "all")...).reduce()
                  m ".paragraph",
                    sub_menu.radio {class:"edge player_length"}, Url.prop.role_type, reduce, "player_length", (key, o)->
                      o.min_is.view.player_length + "人"

            view: (main_menu)->
              m ".paragraph",
                m "h6", "検索する。"
                m "input.mini", Txt.input(Url.prop.search)
                main_menu.drills {}, ["folder", "game", "event_type", "role_type", "rating", "say_limit", "player_length", "update_at", "update_interval"]

          m "table.vindex",
            m "thead",
              m "tr",
                m "th"
            win.scroll.pager "tbody", query.list(), (o)->
              header = m "div",
                m "a",
                  href: "http://giji.check.jp#{o.link}"
                , m "code.icon-download"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/#{o._id}.html"
                , m "code.icon-download"
                m "kbd.note",
                  o._id
                m "a",
                  href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/#{o._id}"
                , m.trust o.name
                m "kbd",
                  o.view.rating

              m "tr", {key: o._id },
                if menu.icon.state() == "resize-full"
                  m "td",
                    header
                    m "table.detail",
                      m "tbody",
                        m "tr",
                          m "th", "更新"
                          m "td", "#{o.view.update_at} #{o.view.update_interval}"
                        m "tr",
                          m "th", "規模"
                          m "td", "#{o.view.player_length}人 #{o.view.say_limit}"
                        m "tr",
                          m "th", "ルール"
                          m "td", "#{o.view.game_rule}"
                    m ".list", o.view.role_cards
                    m ".list", o.view.event_cards

                else
                  m "td",
                    header

if gon?.form?
  catch_gon.form()
  menu.icon.icon "pencil",
    open: ->
    close: ->
    view: ->
      [ m ".SAY.paragraph",
          doc.timeline()
          m "h6", "あなたが書き込む内容です。 - 記述"
          doc.writer()
      ]

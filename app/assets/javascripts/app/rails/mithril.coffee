Cache.potofs.has_faces =
  all:    ->
    delete Cache.messages.has_face.undefined
    delete Cache.messages.has_face.null
    delete Cache.messages.has_face.admin
    delete Cache.messages.has_face.maker
    Object.keys(Cache.messages.has_face).sort()
  potofs: ->
    Object.keys(Cache.potofs.has_face).sort()
  others: ->
    for face_id in Cache.potofs.has_faces.all()
      continue if Cache.potofs.has_face[face_id]
      face_id

scroll_spy = GUI.ScrollSpy.global = new GUI.ScrollSpy(Url.prop.scroll)
icon_mode_menu = new GUI.MenuTree
icon_mode_menu.state = Url.prop.scope
icon_menu = new GUI.MenuTree.Icon
icon_menu.state = Url.prop.icon

if gon?.map_reduce?.faces?
  Cache.rule.chr_set.schema ->
    @order (o)->
      Cache.map_faces.reduce().chr_set[o._id].count

  Cache.rule.map_face.set gon.map_reduce.faces

  GUI.if_exist "#map_faces", (dom)->
    m.module dom,
      controller: ->
      view: ->
        map_order_set = RAILS.map_faces_orders[Url.prop.order()]
        chrs = Cache.map_faces.active(Url.prop.order(), Url.prop.chr_set(), Url.prop.search()).list()
        headline = ""
        if chrs?.length
          headline = [
            m ".GSAY.badge", Cache.chr_sets.find(Url.prop.chr_set()).caption
            "の#{chrs.length}人を、"
            m ".GSAY.badge", map_order_set.headline
            "回数で並べています"
          ]

        [ m "div", headline
          m "hr.black"
          for o in chrs
            chr_job = Cache.chr_jobs.find("#{Url.prop.chr_set()}_#{o.face._id}")
            job_name = chr_job.job

            attr = GUI.attrs {}, ->
              elem = null
              @over -> GUI.Animate.jelly.up elem
              @out ->  GUI.Animate.jelly.down elem
              @config (_elem)-> elem = _elem

            m ".chrbox", {key: o._id},
              GUI.portrate o.face._id, attr
              m ".chrblank.line4",
                m "div", job_name
                m "div", o.face.name
                m "div",
                  m "a.mark",
                    href: "/map_reduce/faces/#{o.face._id}"
                  , "#{map_order_set.caption} #{o.win.value[map_order_set.order]}回"
                m "div", "♥#{o.sow_auth_id.max_is}"
          m "hr.black"
        ]

  GUI.if_exist "#chr_sets", (dom)->
    m.module dom,
      controller: ->
      view: ->
        icon_menu.icon "th-large",
          deploy: (main_menu)->
            main_menu.drill "order",
              caption: "並び順"
              view: ->
                for key, o of RAILS.map_faces_orders
                  m "span", Btn.set({}, Url.prop.order, key), o.caption

            main_menu.drill "chr_set",
              caption: "キャラセット"
              view: (sub_menu)->
                sub_menu.radio {class: "chr_set"}, Url.prop.chr_set, Cache.map_faces.reduce(), "chr_set", (key)->
                  Cache.chr_sets.find(key).caption

          view: (main_menu)->
            m ".paragraph.guide",
              m "h6", "詳しく検索してみよう"
              m "input.small", Txt.input(Url.prop.search)
              m "span", "検索条件：キャラクター名 / 肩書き / プレイヤー "
              m "h6", "キャラセットを選んでみよう"
              main_menu.drills {}, ["order", "chr_set"]


if gon?.face?
  face = Cache.map_face_detail = gon.face
  Cache.rule.map_face_story_log.set face.story_logs

  face.name = Cache.faces.find(face.face_id).name
  face.story_id_of_folders = _.groupBy face.story_ids, ([k,count])->
    k.split("-")?[0]

  face.role_of_wins = _.groupBy face.roles, ([k,count])->
    role = RAILS.gifts[k] || RAILS.roles[k] || {group: "OTHER"}
    RAILS.wins[role.group].name

  GUI.if_exist "#summary", (dom)->
    m.module dom,
      controller: ->
      view: ->
        letters = [
          GUI.letter "",
            face.name
            "全部で"
            m "span.mark", face.role.all
            "の役職になりました"
          for win in face.win.keys
            GUI.letter "",
              "#{win} x#{face.win.value[win]}回"
              for role in face.role_of_wins[win]
                rolename = GUI.name.config role[0]
                width =
                  switch
                    when  4 < rolename.length
                      10.35 # 3.75 * 2 + 0.35
                    else
                       3.75
                GUI.inline_item -> [
                  @center width, rolename
                  @right  2.5, "x" + role[1]
                ]
        ]

        [ m "h2", face.name + " の活躍"
          if face.says[0]?
            m "h6",
              m "span.code", Timer.date_time_stamp new Date face.says[0].date.min
              m "span", m.trust "&nbsp;〜&nbsp;"
              m "span.code", Timer.date_time_stamp new Date face.says[0].date.max
          m "table.SAY.talk", scroll_spy.mark("summary"),
              m "tr",
                m "th",
                  GUI.portrate face.face_id
                m "td",
                  m ".msg", letters
        ]

  GUI.if_exist "#calc", (dom)->
    m.module dom,
      controller: ->
      view: ->
        says_count_lines = [
          m "tr.caution",
            m "th.msg", {colspan: 2}, "総合値"
            m "th.msg.calc", "一番長い発言"
            m "th.msg.calc", "総文字数"
            m "th.msg.calc", "総発言回数"
        ]
        says_calc_lines = [
          m "tr.caution",
            m "th.msg", {colspan: 2}, "平均値"
            m "th.msg.calc", "／村数"
            m "th.msg.calc", "文字数"
            m "th.msg.calc", "発言回数"
        ]
        for say in face.says
          says_count_line =
            m "tr.#{say.logid_head}AY.line",
              m "th.msg"
              m "th.msg", face.say_titles[say.logid_head]
              m "th.msg.calc", "#{GUI.comma say.max  } 字"
              m "th.msg.calc", "#{GUI.comma say.all  } 字"
              m "th.msg.calc", "#{GUI.comma say.count} 回"
          says_calc_line =
            m "tr.#{say.logid_head}AY.line",
              m "th.msg"
              m "th.msg", face.say_titles[say.logid_head]
              m "th.msg.calc", "#{GUI.comma say.vil} 村"
              m "th.msg.calc", "#{GUI.comma say.all / say.vil} 字"
              m "th.msg.calc", "#{GUI.comma say.count / say.vil} 回"
          says_count_lines.push says_count_line
          says_calc_lines.push says_calc_line

        [ m "table.info", scroll_spy.mark("says_count"), says_count_lines
          m "table.info", scroll_spy.mark("says_calc"), says_calc_lines
        ]

  GUI.if_exist "#village", (dom)->
    m.module dom,
      controller: ->
      view: ->
        letters = [
          GUI.letter "", face.name,
            "全部で"
            m "span.mark", "#{face.folder.all}回"
            "登場しました。"
          for folder in face.folder.keys
            GUI.letter "", "#{folder} x#{face.folder.value[folder]}回",
              for story_id in face.story_id_of_folders[folder]
                GUI.inline_item ->
                  @left 2.8 + folder.length * 0.65,
                    m "a",
                      href: "http://7korobi.gehirn.ne.jp/stories/#{story_id[0]}.html"
                    , story_id[0]
        ]
        m ".MAKER.guide", scroll_spy.mark("villages"), letters

  GUI.if_exist "#sow_user", (dom)->
    m.module dom,
      controller: ->
      view: ->
        letters = [
          GUI.letter "",
            face.name
            "全部で"
            m "span.mark", "#{face.sow_auth_ids.length}人"
            "が、"
            m "span.mark", "#{face.sow_auth_id.all}回"
            "登場しました。"
          for sow_auth_id in face.sow_auth_ids
            length = sow_auth_id[0].sjis_length
            width =
              switch
                when 17 < length
                  14.45 # 16.45 = 3.8 * 4 + 1.25
                when 11 < length
                  10.25 # 12.25 = 3.8 * 3 + 0.85
                else
                   6.0  #  8.0  = 3.8 * 2 + 0.20
                        #  5.8  = 3.8 * 1 + 2.00
            GUI.inline_item -> [
              @right width, sow_auth_id[0]
              @right 2.0, "x" + sow_auth_id[1]
            ]
        ]
        m ".ADMIN.guide", scroll_spy.mark("sow_users"), letters

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
  layout.width = 90
  layout.transition()

  m.module dom,
    controller: ->
    view: ->
      vdoms = []
      section = (icon)->
        return unless icon_menu.nodes[icon]
        vdom =
          m "section", icon_menu.start({class:"glass"}, icon),
            m ".bigicon",
              m ".icon-#{icon}", " "
            m ".badge.pull-right", badges[icon]() if badges[icon]
        vdoms.push vdom

      badges =
        "pin": ->
          messages.pins(Url.prop).list().length - Cache.events.list().length
        "home": ->
          Cache.messages.home("announce").list().length - Cache.events.list().length
        "mail": ->
          prop = _.merge {}, Url.prop,
            memo: -> "all"
            uniq: -> true
            search: -> ""
          messages.memo(prop).list().length - Cache.events.list().length
        "clock": ->
          prop = _.merge {}, Url.prop,
            talk: -> "all"
            open: -> true
            search: -> ""
          messages.history(prop).list().length - Cache.events.list().length
        "chat-alt": ->
          prop = _.merge {}, Url.prop,
            talk: -> "all"
            open: -> true
            search: -> ""
          messages.talk(prop).list().length - Cache.events.list().length
        "th-large": ->
          Cache.map_faces.active(Url.prop.order(), Url.prop.chr_set(), Url.prop.search()).list().length

      switch icon_mode_menu.state()
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
      section "search" unless "pins" == icon_mode_menu.state()
      section "cog"

      m "table", m "tr", m "td", vdoms


GUI.if_exist "#topviewer", (dom)->
  layout = new GUI.Layout dom, 0, 1, 110, head.browser.ios, 0

  m.module dom,
    controller: ->
    view: ->
      icon_menu.view()

GUI.if_exist "#css_changer", (dom)->
  icon_menu.icon "cog",
    view: ->
      m ".paragraph.guide",
        m "h6", "スタイル"
        Btns.radio {}, Url.prop.theme,
          cinema: "煉瓦"
          star:   "蒼穹"
          night:  "闇夜"
          moon:   "月夜"
          wa:     "和の国"
        m "h6", "幅の広さ"
        Btns.radio {}, Url.prop.width,
          full: "最大"
          wide: "広域"
          std:  "普通"
        m "h6", "位置"
        Btns.radio {}, Url.prop.layout,
          left:   "左詰"
          center: "中央"
          right:  "右詰"
        m "h6", "位置"
        Btns.radio {}, Url.prop.font,
          large: "大判"
          novel: "明朝"
          std:   "ゴシック"
          small: "繊細"
  m.module dom,
    controller: ->
    view: ->
      m ".guide",
        m "a.menuicon.pull-right.icon-cog", icon_menu.start({}, "cog"), " "
        Btns.radio {}, Url.prop.theme,
          cinema: "煉瓦"
          star:   "蒼穹"
          night:  "闇夜"
          moon:   "月夜"
          wa:     "和の国"
        m "hr.black"



GUI.if_exist "title", (dom)->
  m.module dom,
    controller: ->
    view: ->
      story = Cache.storys.find Url.prop.story_id()
      event = Cache.events.find Url.prop.event_id()
      if story? && event?
        "#{story.name} #{event.name}"
      else
        "人狼議事"

if gon?.potofs?
  Cache.rule.potof.set gon.potofs,
    story_folder: gon.story?.folder
    story_type: gon.story?.type
    story_epilogue: gon.story?.is_epilogue
    event_winner: (gon.event?.winner || gon.events?.last?.winner)

  GUI.if_exist "#sayfilter", (dom)->
    layout = new GUI.Layout dom, -1, 1, 100
    layout.small_mode = true
    layout.large_mode = ->
      ! (icon_menu.state() || layout.small_mode)

    wide_attr = GUI.attrs {}, ->
      @className "plane"
      @click ->
        layout.small_mode = ! layout.small_mode
        unless layout.small_mode
          icon_menu.state ""
      @actioned ->
        layout.translate()

    m.module dom,
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
          potofs = GUI.message.potofs()
          subview = messages.anchor(Url.prop).list()
          filter =
            m "section", wide_attr,
              m "h6", "参照ログ"
              for o in subview
                m ".line_text",
                  m ".#{o.mestype}.badge", "#{o.turn}:#{o.anchor}"
                  m.trust o.log.line_text

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
  if gon?.story?
    Cache.rule.story.set [gon.story]

  Cache.rule.event.merge gon.events,
    story_id: gon.story?._id
#  Cache.rule.event.merge [gon.event],
#    story_id: gon.story?._id

  messages =
    pins: ({story_id,pins})->
      Cache.messages.pins(story_id(), pins())
    anchor: ({talk})->
      Cache.messages.anchor(talk(), scroll_spy.prop())
    home: ({home})->
      Cache.messages.home(home())
    talk: ({talk, open, potofs_hide, search})->
      Cache.messages.talk(talk(), open(), potofs_hide(), search())
    memo: ({memo, potofs_hide, search})->
      Cache.messages.memo(memo(), true, potofs_hide(), search())
    history: ({memo, potofs_hide, search})->
      Cache.messages.memo(memo(), false, potofs_hide(), search())

  security_modes = (prop)->
    [
      m "a", Btn.set({}, prop, "all"),   "すべて"
      m "a", Btn.set({}, prop, "think"), "独り言/内緒話"
      m "a", Btn.set({}, prop, "clan"),  "仲間の会話"
      m "a", Btn.set({}, prop, "open"),  "公開情報のみ"
      m.trust "&nbsp;"
      m "a", Btn.bool({}, Url.prop.open),  "公開情報"
      m "a", Btn.bool({}, Url.prop.human), "/*中の人*/"
    ]

  potofs_portrates = ()->
    potofs = Cache.potofs.view(Url.prop.potofs_desc(), Url.prop.potofs_order()).list()
    hides = Url.prop.potofs_hide()

    m ".chrlist",
      m "h6", "キャラクターフィルタ"
      m "hr.black"
      m ".chrbox", {key: "other-Btns"},
        m ".chrblank.line9",
          m ".btn[style='display:block']", Btn.keys_reset({}, Url.prop.potofs_hide, []                             ), "全員表示"
          m ".btn[style='display:block']", Btn.keys_reset({}, Url.prop.potofs_hide, Cache.potofs.has_faces.others()), "参加者表示"
          m ".btn[style='display:block']", Btn.keys_reset({}, Url.prop.potofs_hide, Cache.potofs.has_faces.potofs()), "その他を表示"
          m ".btn[style='display:block']", Btn.keys_reset({}, Url.prop.potofs_hide, Cache.potofs.has_faces.all()   ), "全員隠す"
      for o in potofs
        attr = (o)->
          GUI.attrs {}, ->
            @className(if hides[o.face_id] then "filter-hide" else "")

            elem = null
            @config (_elem)-> elem = _elem
            @click ->
              hides[o.face_id] = ! hides[o.face_id]
              Url.prop.potofs_hide hides

        m ".chrbox", {key: o._id},
          GUI.portrate o.face_id, attr(o)
          m ".chrblank.line1",
            m "div", o.name
      m "hr.black"

  GUI.if_exist "#story", (dom)->
    story = gon.story
    icon_menu.icon "home",
      open: ->
        icon_mode_menu.change "home"
      view: ->
        event = Cache.events.find Url.prop.event_id()

        if event
          event_card = RAILS.events[event.event]

          texts = []
          texts.push RAILS.winner[event.winner] + "の勝利です。" if "WIN_NONE" != event.winner
          texts.push m "kbd", event_card if event_card
          texts.push RAILS.event_state.grudge    if event.turn == event.grudge
          texts.push RAILS.event_state.riot      if event.turn == event.riot
          texts.push RAILS.event_state.scapegoat if event.turn == event.scapegoat
          texts.push RAILS.event_state.eclipse   if _.find event.eclipse, event.turn

          [ m ".#{event.winner}.guide",
              m "h6", "#{event.name} 村の情報"
              for text in texts
                m "p.text", text
              GUI.message.game story, event
          ]

        else
          [ m ".WIN_NONE.guide",
              m "h6", "村の情報"
              GUI.message.game story
          ]

    m.module dom,
      controller: ->
      view: ->
        [
          icon_menu.icon "search",
            view: ->
              m ".paragraph.guide",
                GUI.timeline
                  base: Cache.messages.timeline(Url.prop.talk())
                  width: Url.prop.content_width()
                  choice: (id)->
                    Url.prop.talk_at id
                    icon_menu.change "search"
                    icon_mode_menu.change "talk"

                m "input.medium", Txt.input Url.prop.search
                m "span", "発言中の言葉を検索します。"
                m "hr.black"
          if story?
            switch icon_mode_menu.state()
              when "home"
                GUI.message.story story
        ]

  GUI.if_exist "#messages", (dom)->
    scroll_spy.avg_height = 150

    change_pin = (id)->
      target = icon_mode_menu.state()
      switch target
        when "history"
          target_at = Url.prop["memo_at"]
        when "memo", "talk", "home"
          target_at = Url.prop["#{target}_at"]

      if target_at
        target_at id
        Url.prop.back target

      Url.prop.scroll id
      icon_menu.change "pin"

    GUI.message.delegate.tap_anchor = (o, turn, logid, id)->
      pins = Url.prop.pins()
      pins["#{o.turn}-#{o.logid}"] = true
      pins["#{turn}-#{logid}"] = true
      Url.prop.pins pins
      change_pin(o._id)

    GUI.message.delegate.tap_identity = (o, turn, logid, id)->
      pins = Url.prop.pins()
      pins["#{turn}-#{logid}"] = true
      Url.prop.pins pins
      change_pin(id)

    icon_mode_menu.node "history",
      open: ->
        scroll_spy.rescroll Url.prop.memo_at
    icon_mode_menu.node "memo",
      open: ->
        scroll_spy.rescroll Url.prop.memo_at
    icon_mode_menu.node "talk",
      open: ->
        scroll_spy.rescroll Url.prop.talk_at
    icon_mode_menu.node "home",
      open: ->
        scroll_spy.rescroll Url.prop.home_at
    icon_mode_menu.node "pins",
      open: ->
        scroll_spy.rescroll Url.prop.scroll

    icon_menu.icon "pin",
      open: ->
        icon_mode_menu.change "pins"
      close: ->
        Url.prop.pins {}
        icon_mode_menu.change Url.prop.back()

    icon_menu.icon "mail",
      open: ->
        icon_mode_menu.change "memo"
      view: ->
        [ m ".paragraph.guide",
            m "h6", "メモ"
            security_modes Url.prop.memo
            m "p", "メモを表示します。"
          potofs_portrates()
        ]

    icon_menu.icon "chat-alt",
      open: ->
        icon_mode_menu.change "talk"
      view: ->
        [ m ".paragraph.guide",
            m "h6", "発言"
            security_modes Url.prop.talk
            m "p", "村内の発言を表示します。"
          potofs_portrates()
        ]

    icon_menu.icon "clock",
      open: ->
        icon_mode_menu.change "history"
      view: ->
        [ m ".paragraph.guide",
            m "h6", "発言"
            security_modes Url.prop.memo
            m "p", "メモ履歴を表示します。"
          potofs_portrates()
        ]

    m.module dom,
      controller: ->
      view: ->
        scroll_spy.pager "div", messages[icon_mode_menu.state()](Url.prop).list(), (o)->
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
      set_event_messages = (event)->
        first = event.messages.first.date
        last  = event.messages.last.date
        set_event_without_messages new Date(first) - 1, new Date(last) - -1, event.messages, event

      set_event_without_messages = (first_date, last_date, messages, {_id, turn, name})->
        messages.unshift
          name: name
          log: name
          logid: "EVENT-ASC"
          mestype: "EVENT"
          updated_at: first_date

        messages.push
          name: name
          log: name
          logid: "EVENT-DESC"
          mestype: "EVENT"
          updated_at: last_date

        Cache.rule.message.merge messages, {event_id: _id, turn}

      interval = gon.story.upd.interval * 1000 * 3600 * 24
      if gon.event.messages
        set_event_messages gon.event
        turn = gon.event.turn

        updated_at = gon.event.messages.last.updated_at
        for event in gon.events by  1
          if event.turn > turn
            set_event_without_messages updated_at + 1, updated_at + interval, [], event
            updated_at += interval

        updated_at = gon.event.messages.first.updated_at
        for event in gon.events by -1
          if event.turn < turn
            set_event_without_messages updated_at - interval, updated_at - 1, [], event
            updated_at -= interval

      for event in gon.events
        if event.messages
          set_event_messages event

      back_state = icon_mode_menu.state()
      icon_mode_menu.change ""
      icon_mode_menu.change "talk"
      icon_mode_menu.change back_state
      m.endComputation()

if gon?.form?
  icon_menu.icon "pencil",
    open: ->
    close: ->
    view: ->
      [ m ".paragraph.guide",
          m "h6", "発言"
          security_modes Url.prop.talk
          m "p", "村内の発言を表示します。"
        potofs_portrates()
      ]



if gon?.villages?
  GUI.if_exist "#villages", (dom)->
    Cache.rule.item.set gon.villages
    m.module dom,
      controller: ->
      view: ->
        scroll_spy.pager "div", Cache.items.list(), (v)->
          GUI.message.action(v)

if gon?.byebyes?
  GUI.if_exist "#byebyes", (dom)->
    Cache.rule.item.set gon.byebyes
    m.module dom,
      controller: ->
      view: ->
        scroll_spy.pager "div", Cache.items.list(), (v)->
          GUI.message.action(v)

if gon?.history?
  GUI.if_exist "#history", (dom)->
    Cache.rule.item.set gon.history
    m.module dom,
      controller: ->
      view: ->
        scroll_spy.pager "div", Cache.items.list(), (v)->
          GUI.message.history(v)

if gon?.stories?
  Cache.rule.story.set gon.stories
  GUI.if_exist "#stories", (dom)->
    icon_menu.icon "resize-full",
      open: ->
        scroll_spy.avg_height = 120
        icon_mode_menu.change "full"
    icon_menu.icon "resize-normal",
      deploy: ->
        icon_mode_menu.change "normal"
      open: ->
        scroll_spy.avg_height = 22
        icon_mode_menu.change "normal"

    m.module dom,
      controller: ->
      view: ->
        query = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values()...)
        [
          icon_menu.icon "search",
            deploy: (main_menu)->
              main_menu.drill "rating",
                caption: "こだわり"
                view: (sub_menu)->
                  reduce = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(rating: "all")...).reduce()
                  sub_menu.radio {class:"rating"}, Url.prop.rating, reduce, "rating", (key, o)->
                    m "span",
                      m "img.pull-left",
                        src: GUI.img_head + "/icon/cd_#{o.min_is.rating}.png"
                      RAILS.rating[key].caption
              main_menu.drill "game",
                caption: "ルール"
                view: (sub_menu)->
                  reduce = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(game: "all")...).reduce()
                  sub_menu.radio {class:"game"}, Url.prop.game, reduce, "game", (key, o)->
                    o.min_is.view.game_rule
              main_menu.drill "folder",
                caption: "州"
                view: (sub_menu)->
                  reduce = Cache.storys.menu("all", Url.routes.search.stories.values()...).reduce()
                  sub_menu.radio {class:"folder"}, Url.prop.folder, reduce, "folder", (key, o)->
                    GAME[key]?.nation
              main_menu.drill "say_limit",
                caption: "発言制限"
                view: (sub_menu)->
                  reduce = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(say_limit: "all")...).reduce()
                  sub_menu.radio {class:"say_limit"}, Url.prop.say_limit, reduce, "say_limit", (key, o)->
                    o.min_is.view.say_limit
              main_menu.drill "update_at",
                caption: "更新時刻"
                view: (sub_menu)->
                  reduce = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(update_at: "all")...).reduce()
                  sub_menu.radio {class:"update_at"}, Url.prop.update_at, reduce, "update_at", (key, o)->
                    o.min_is.view.update_at
              main_menu.drill "update_interval",
                caption: "更新間隔"
                view: (sub_menu)->
                  reduce = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(update_interval: "all")...).reduce()
                  sub_menu.radio {class:"update_interval"}, Url.prop.update_interval, reduce, "update_interval", (key, o)->
                    o.min_is.view.update_interval
              main_menu.drill "event_type",
                caption: "事件"
                view: (sub_menu)->
                  reduce = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(event_type: "all")...).reduce()
                  sub_menu.radio {class:"event_type"}, Url.prop.event_type, reduce, "event_type", (key, o)->
                    key
              main_menu.drill "role_type",
                caption: "役職"
                view: (sub_menu)->
                  reduce = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(role_type: "all")...).reduce()
                  sub_menu.radio {class:"role_type"}, Url.prop.role_type, reduce, "role_type", (key, o)->
                    key
              main_menu.drill "player_length",
                caption: "人数"
                view: (sub_menu)->
                  reduce = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(player_length: "all")...).reduce()
                  sub_menu.radio {class:"player_length"}, Url.prop.role_type, reduce, "player_length", (key, o)->
                    o.min_is.view.player_length + "人"

            view: (main_menu)->
              m ".paragraph.guide",
                m "h6", "検索する。"
                m "input.mini", Txt.input(Url.prop.search)
                main_menu.drills {}, ["folder", "game", "event_type", "role_type", "rating", "say_limit", "player_length", "update_at", "update_interval"]

          m "table",
            m "thead",
              m "tr",
                m "th"
            scroll_spy.pager "tbody", query.list(), (o)->
              header = m "div",
                m "a",
                  href: o.link
                , m "code.icon-download"
                m "kbd.note", 
                  o._id
                m "a",
                  href: o.file
                , m.trust o.name
                m "kbd", 
                  o.view.rating

              m "tr", {key: o._id },
                if icon_menu.state() == "resize-full"
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
        ]

m.endComputation()

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

GUI.ScrollSpy.global = new GUI.ScrollSpy(Url.prop.scroll)
scroll_spy = new GUI.ScrollSpy(Url.prop.scroll)


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
            m "span.badge.badge-info", Cache.chr_sets.find(Url.prop.chr_set()).caption
            "の#{chrs.length}人を、"
            m "span.badge.badge-info", map_order_set.headline
            "回数で並べています"
          ]

        [ m "hr.black" 
          m ".mark", headline
          for o in chrs
            chr_job = Cache.chr_jobs.find("#{Url.prop.chr_set()}_#{o.face._id}")
            job_name = chr_job.job

            attr = GUI.attrs ->
              elem = null
              @over -> GUI.Animate.jelly.up elem
              @out ->  GUI.Animate.jelly.down elem
              @config (_elem)-> elem = _elem

            m ".chrbox", {key: o._id},
              GUI.portrate o.face._id, attr
              m ".chrblank",
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
    touch = new GUI.TouchMenu()
    touch.icon "th-large", ->
      m ".guide.form-inline",
        m "h6", "詳しく検索してみよう"
        m "input.form-control",
          onblur:   m.withAttr("value", Url.prop.search)
          onchange: m.withAttr("value", Url.prop.search)
          value: Url.prop.search()
        m "h6", "キャラセットを選んでみよう"
        m "span.btn.btn-default", touch.start("order"),
          "並び順"
          m "span.note", "▼"
        m "span.btn.btn-default", touch.start("chr_set"),
          "キャラセット"
          m "span.note", "▼"
    touch.menu_set Url.prop, "count",
      order: ->
        for key, o of RAILS.map_faces_orders
          m "a", touch.btn(Url.prop.order, key), o.caption

      chr_set: ->
        @btn_list (key, o)-> Cache.chr_sets.find(key).caption

    m.module dom,
      controller: ->
      view: ->
        touch.query = Cache.map_faces
        touch.menu m ".pagenavi.choice.guide.form-inline",
          m "a.menuicon.icon-th", GUI.TouchMenu.icons.start("th-large"), " "
          m "span", "キャラセットを選んでみよう"

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
          m "table.say.SAY", scroll_spy.mark("summary"),
            m "tbody",
              m "tr",
                m "td.img", 
                  GUI.portrate face.face_id
                m "td.field",
                  m ".msg", letters
        ]

  GUI.if_exist "#calc", (dom)->
    m.module dom,
      controller: ->
      view: ->
        says_count_lines = [
          m "tr.caution",
            m "th.msg", {colspan: 2}, "総合値"
            m "th.msg", {style: "text-align:right"}, "一番長い発言"
            m "th.msg", {style: "text-align:right"}, "総文字数"
            m "th.msg", {style: "text-align:right"}, "総発言回数"
        ]
        says_calc_lines = [
          m "tr.caution",
            m "th.msg", {colspan: 2}, "平均値"
            m "th.msg", {style: "text-align:right"}, "／村数"
            m "th.msg", {style: "text-align:right"}, "文字数"
            m "th.msg", {style: "text-align:right"}, "発言回数"
        ]
        for say in face.says
          says_count_line =
            m "tr.#{say.logid_head}AY",
              m "th.msg"
              m "th.msg", face.say_titles[say.logid_head]
              m "th.msg", {style: "text-align:right"}, "#{GUI.comma say.max  } 字"
              m "th.msg", {style: "text-align:right"}, "#{GUI.comma say.all  } 字"
              m "th.msg", {style: "text-align:right"}, "#{GUI.comma say.count} 回"
          says_calc_line =
            m "tr.#{say.logid_head}AY",
              m "th.msg"
              m "th.msg", face.say_titles[say.logid_head]
              m "th.msg", {style: "text-align:right"}, "#{GUI.comma say.vil} 村"
              m "th.msg", {style: "text-align:right"}, "#{GUI.comma say.all / say.vil} 字"
              m "th.msg", {style: "text-align:right"}, "#{GUI.comma say.count / say.vil} 回"
          says_count_lines.push says_count_line
          says_calc_lines.push says_calc_line
          
        [ m "table.say.info", scroll_spy.mark("says_count"), says_count_lines
          m "table.say.info", scroll_spy.mark("says_calc"), says_calc_lines
        ]

  GUI.if_exist "#village", (dom)->
    touch = new GUI.TouchMenu()
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
                  m "a",
                    style: "display:block; width:#{2.8 + folder.length * 0.65}em; text-align:left;"
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

  layout = new GUI.Layout dom, -1, -1, 120
  layout.transition()
  touch = GUI.TouchMenu.icons
  m.module dom,
    controller: ->
    view: ->
      switch Url.prop.layout()
        when "right", "center"
          layout.dx =  1
        when "left"
          layout.dx = -1

      m "nav",
        for icon in ["pin", "warning", "sitemap", "stopwatch", "home", "chat-alt", "mail", "search", "pencil", "th-large", "cog"] # lock
          continue unless touch.menus[icon]
          m "div", touch.start(icon),
            m ".bigicon",
              m ".icon-#{icon}"
            m ".badge.pull-right", touch.badge[icon]() if touch.badge[icon]?



GUI.if_exist "#topviewer", (dom)->
  layout = new GUI.Layout dom, 0, 1, 110, head.browser.ios, 0

  m.module dom,
    controller: ->
    view: ->
      GUI.TouchMenu.icons.menu()

GUI.if_exist "#css_changer", (dom)->
  ###
  GUI.attrs_to document, "body", ->
    @swipe "thru"
    @left  (diff, flick)-> 
      layout = 
        switch Url.prop.layout()
          when "right"
            "center"
          else
            "left"
      Url.prop.layout layout            

    @right (diff, flick)->
      layout = 
        switch Url.prop.layout()
          when "left"
            "center"
          else
            "right"
      Url.prop.layout layout            
  ###
  touch = new GUI.TouchMenu()
  touch.icon "cog", ->
    m ".guide.form-inline",
      m "h6", "スタイル"
      m ".form-group",
        m "a", touch.btn(Url.prop.theme, "cinema"), "煉瓦"
        m "a", touch.btn(Url.prop.theme, "night"), "月夜"
        m "a", touch.btn(Url.prop.theme, "star"), "蒼穹"
        m "a", touch.btn(Url.prop.theme, "wa"), "和の国"
      m "h6", "幅の広さ"
      m ".form-group",
        m "a", touch.btn(Url.prop.width, "mini"), "携帯"
        m "a", touch.btn(Url.prop.width, "std"),  "普通"
        m "a", touch.btn(Url.prop.width, "wide"), "広域"
      m "h6", "位置"
      m ".form-group",
        m "a", touch.btn(Url.prop.layout, "left"),   "左詰"
        m "a", touch.btn(Url.prop.layout, "center"), "中央"
        m "a", touch.btn(Url.prop.layout, "right"),  "右詰"
      m "h6", "位置"
      m ".form-group",
        m "a", touch.btn(Url.prop.font, "large"),   "大判"
        m "a", touch.btn(Url.prop.font, "novel"),   "明朝"
        m "a", touch.btn(Url.prop.font, "std"), "ゴシック"
        m "a", touch.btn(Url.prop.font, "small"),   "繊細"
  m.module dom,
    controller: ->
    view: ->
      touch.menu m ".pagenavi.choice.guide.form-inline",
        m "a.menuicon.icon-cog", GUI.TouchMenu.icons.start("cog"), " "
        m ".form-group",
          m "a.mark", touch.btn(Url.prop.theme, "cinema"), "煉瓦"
          m "a.mark", touch.btn(Url.prop.theme, "night"), "月夜"
          m "a.mark", touch.btn(Url.prop.theme, "star"), "蒼穹"
          m "a.mark", touch.btn(Url.prop.theme, "wa"), "和の国"


if gon?.potofs?
  Cache.rule.potof.set gon.potofs,
    story_folder: gon.story?.folder
    story_type: gon.story?.type
    story_epilogue: gon.story?.is_epilogue
    event_winner: (gon.event?.winner || gon.events?.last?.winner)

  GUI.if_exist "#sayfilter", (dom)->
    layout = new GUI.Layout dom, 1, 1, 100
    touch = new GUI.TouchMenu()

    toggle_desc = (prop, value)->
      if prop() == value
        attr = touch.btn Url.prop.potofs_desc, {asc: "desc", desc: "asc"}[Url.prop.potofs_desc()]
        attr.className = "btn btn-success"
        attr
      else
        touch.btn prop, value

    wide_attr = GUI.attrs ->
      @start -> 
        layout.large_mode = ! layout.large_mode
      @actioned ->
        layout.translate()

    m.module dom,
      controller: ->
      view: ->
        hides = Url.prop.potofs_hide()
        layout.width = win.width - Url.prop.w() - 4
        switch Url.prop.layout()
          when "right"
            layout.dx =  1
          when "center"
            layout.dx = -1
            layout.width /= 2
          when "left"
            layout.dx = -1

        layout.width += Url.prop.w() if layout.large_mode

        filter = 
          m "div",
            m "h6", "スタイル"
            m "span",
              m "a.menuicon.icon-home", touch.btn(Url.prop.scope, "home"  ), " "
              m "a.menuicon.icon-warning", touch.btn(Url.prop.scope, "action"), " "
              m "a.menuicon.icon-chat-alt", touch.btn(Url.prop.scope, "talk"  ), " "
              m "a.menuicon.icon-mail", touch.btn(Url.prop.scope, "memo"  ), " "

        potofs = 
          m "table.potofs",
            m "tfoot.head",
              m "tr.center",
                m "th[colspan=2]", m "sup", "(スクロールします。)"
                m "th", m "a", toggle_desc(Url.prop.potofs_order, "stat_at"),  "日程"
                m "th", m "a", toggle_desc(Url.prop.potofs_order, "stat_type"),"状態"
                m "th", m "a", toggle_desc(Url.prop.potofs_order, "said_num"), "発言"
                m "th", m "a", toggle_desc(Url.prop.potofs_order, "pt"),       "残り"
                m "th", m "a", toggle_desc(Url.prop.potofs_order, "urge"),     "促"
                m "th", m "span.icon-user", " "
                m "th", m "a", toggle_desc(Url.prop.potofs_order, "select"),     "希望"
                m "th", m "a", toggle_desc(Url.prop.potofs_order, "win_result"), "勝敗"
                m "th", m "a", toggle_desc(Url.prop.potofs_order, "win_side"),   "陣営"
                m "th", m "a", toggle_desc(Url.prop.potofs_order, "role"),       "役割"
                m "th", m "a", toggle_desc(Url.prop.potofs_order, "text"),       "補足"
            m "tbody", wide_attr,
              for o in Cache.potofs.view(Url.prop.potofs_desc(), Url.prop.potofs_order()).list()
                filter_class = 
                  if hides[o.face_id]
                    "filter-hide"
                  else
                    ""
                m "tr", {className: filter_class},
                  m "th.calc", {}, o.view.job
                  m "th", {}, o.name
                  m "td.calc", {}, o.view.stat_at
                  m "td", {}, o.view.stat_type
                  m "td.calc", {}, o.view.said_num
                  m "td.calc", {}, o.view.pt
                  m "td.center", {}, o.view.urge
                  m "td.center", {}, o.view.sow_auth_id
                  m "td.center", {}, o.view.select
                  m "td.WIN_#{o.view.win}.center", {}, o.view.win_result
                  m "td.WIN_#{o.view.win}.calc", {}, o.view.win_side
                  m "td.WIN_#{o.view.win}", {}, o.view.role
                  m "td.WIN_#{o.view.win}", {}, o.view.text

        event = Cache.events.find Url.prop.event_id()
        m "div",
          if event?
            m ".sayfilter_heading", event.name
          else
            m ".sayfilter_heading.bottom"
          m ".insayfilter",
            m ".paragraph",
              m ".table-swipe.sayfilter_content", potofs
            m ".paragraph",
              m ".sayfilter_content.form-inline",
                m ".form-group", filter
          m ".sayfilter_heading.bottom"


if gon?.events? && gon.event?
  if gon?.story?
    Cache.rule.story.set [gon.story]

  Cache.rule.event.merge gon.events

  messages =
    home: ({home})->
      Cache.messages.home(home())
    after: ({scroll, potofs_hide})->
      updated_at = Cache.messages.find(scroll())?.updated_at || 0
      Cache.messages.after(updated_at, potofs_hide())
    talk: ({event_id, talk, open, potofs_hide, search})->
      Cache.messages.talk(event_id(), talk(), open(), potofs_hide(), search())
    memo: ({memo, uniq, potofs_hide, search})->
      Cache.messages.memo(memo(), uniq(), potofs_hide(), search())
    warning: ({event_id, potofs_hide})->
      Cache.messages.warning(event_id(), potofs_hide())

  potofs_portrates = (touch)->
    potofs = Cache.potofs.view(Url.prop.potofs_desc(), Url.prop.potofs_order()).list()
    hides = Url.prop.potofs_hide()

    [ m "h6", "キャラクターフィルタ"
      m "hr.black" 
      m ".chrbox", {key: "other-buttons"},
        m ".chrblank", {style: "min-height: 179px; margin-top: 1px"},
          m ".mark[style='display:block']", touch.btn(Url.prop.potofs_hide, [],                             Serial.serializer.Keys), "全員表示"
          m ".mark[style='display:block']", touch.btn(Url.prop.potofs_hide, Cache.potofs.has_faces.others(),Serial.serializer.Keys), "参加者表示"
          m ".mark[style='display:block']", touch.btn(Url.prop.potofs_hide, Cache.potofs.has_faces.potofs(),Serial.serializer.Keys), "その他を表示"
          m ".mark[style='display:block']", touch.btn(Url.prop.potofs_hide, Cache.potofs.has_faces.all(),   Serial.serializer.Keys), "全員隠す"
      for o in potofs
        attr = (o)->
          GUI.attrs ->
            @className(if hides[o.face_id] then "filter-hide" else "")

            elem = null
            @config (_elem)-> elem = _elem
            @over -> GUI.Animate.jelly.up elem
            @out -> GUI.Animate.jelly.down elem
            @end ->
              hides[o.face_id] = ! hides[o.face_id]
              Url.prop.potofs_hide hides

        m ".chrbox", {key: o._id},
          GUI.portrate o.face_id, attr(o)
          m ".chrblank",
            m "div", o.name
      m "hr.black"
    ]

  GUI.if_exist "#story", (dom)->
    story = gon.story

    touch = new GUI.TouchMenu()
    touch.badge "home", ->
      Cache.messages.home("announce").list().length
    touch.icon "home", -> # 情報
      Url.prop.scope "home"
      Url.prop.scroll messages.home(Url.prop).list().first?._id
      m ".pagenavi.choice.guide.form-inline",
        m "h6", "村の情報"
        m "p", "村に関する情報、アナウンスを表示します。"
        potofs_portrates(touch)

    m.module dom,
      controller: ->
      view: ->
        event = Cache.events.find Url.prop.event_id()
        if event?
          touch.icon "sitemap", ->
            m ".pagenavi.choice.guide.form-inline",
              m "h6", "ステータス"
              GUI.message.event event, story
              potofs_portrates(touch)
        else
          touch.icon "sitemap"

        if story?
          switch Url.prop.scope()
            when "home"
              GUI.message.story story

  GUI.if_exist "#messages", (dom)->
    scroll_spy.avg_height = 150
    touch = new GUI.TouchMenu()

    touch.icon "pin", -> # アンカー
      # {home} = Url.prop
      # Url.prop.scope "pin"
      # Url.prop.scroll messages.pin(Url.prop).list().first?._id


    touch.badge "stopwatch", ->
      messages.after(Url.prop).list().length
    touch.icon "stopwatch", -> # 新着
      Url.prop.scope "after"
      m ".pagenavi.choice.guide.form-inline",
        m "h6", "新着状況"
        m "p", "今見ている発言より新しい、新着情報を表示します。"
        potofs_portrates(touch)


    touch.badge "chat-alt", ->
      prop = _.merge {}, Url.prop,
        talk: -> "all"
        open: -> true
        search: -> ""
      messages.talk(prop).list().length
    touch.icon "chat-alt", -> # 発言
      Url.prop.scope "talk"
      Url.prop.scroll messages.talk(Url.prop).list().first?._id
      m ".pagenavi.choice.guide.form-inline",
        m "h6", "発言"
        m "p", "村内の発言を表示します。"
        potofs_portrates(touch)


    touch.badge "mail", ->
      prop = _.merge {}, Url.prop,
        memo: -> "all"
        uniq: -> true
        search: -> ""
      messages.memo(prop).list().length
    touch.icon "mail", -> # メモ
      Url.prop.scope "memo"
      Url.prop.scroll messages.memo(Url.prop).list().first?._id
      m ".pagenavi.choice.guide.form-inline",
        m "h6", "メモ"
        m "p", "メモを表示します。"
        potofs_portrates(touch)


    touch.badge "warning", ->
      messages.warning(Url.prop).list().length
    touch.icon "warning", -> 
      Url.prop.scope "warning"
      m ".pagenavi.choice.guide.form-inline",
        m "h6", "警報"
        m "p", "アラートを表示します。"
        potofs_portrates(touch)


    touch.icon "pencil", -> # 書き込み


    touch.icon "search", -> # 検索
      m ".pagenavi.choice.guide.form-inline",
        m "h6", "検索する。"
        m "input.form-control",
          onblur:   m.withAttr("value", Url.prop.search)
          onchange: m.withAttr("value", Url.prop.search)
          value: Url.prop.search()
        potofs_portrates(touch)


    m.module dom,
      controller: ->
      view: ->
        [folder, vid, turn, logid] = Url.prop.scroll().split("-")
        subview = Cache.messages.search("#{logid},#{turn},").list()
        console.log subview

        scroll_spy.pager "div", messages[Url.prop.scope()](Url.prop).list(), (o)->
          anchor_num  = o.logid.substring(2) - 0 || 0
          o.anchor = RAILS.log.anchor[o.logid[0]] + anchor_num || ""
          o.updated_at ?= new Date(o.date) - 0
          o.updated_timer ?= new Timer o.updated_at,
            prop: ->
          delete o.date
          if o.vdom
            o.vdom(o)
          else
            m ".paragraph", JSON.stringify o

    m.startComputation()
    setTimeout ->
      if gon.event.messages
        Cache.rule.message.merge gon.event.messages,
          event_id: gon.event._id

      for event in gon.events
        if event.messages
          Cache.rule.message.merge event.messages,
            event_id: event._id

      m.endComputation()
    , DELAY.presto

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
    touch_sw = new GUI.TouchMenu()
    touch = new GUI.TouchMenu()
    touch.menu_set Url.prop, "count", 
      rating: ->
        @btn_group 27, (key, o)->
          m "span",
            m "img.pull-left",
              src: GUI.img_head + "/icon/cd_#{o.min_is.rating}.png"
            RAILS.rating[key].caption
      game: ->
        @btn_group 21, (key, o)-> o.min_is.view.game_rule
      folder: ->
        @btn_group 15, (key)-> GAME[key]?.nation
      say_limit: ->
        @btn_group 15, (key, o)-> o.min_is.view.say_limit
      update_at: ->
        @btn_group 15, (key, o)-> o.min_is.view.update_at
      update_interval: ->
        @btn_group 15, (key, o)-> o.min_is.view.update_interval
      event_type: ->
        @btn_group 12, (key)-> key
      role_type: ->
        @btn_group 10, (key)-> key
      player_length: ->
        @btn_group  9, (key, o)-> o.min_is.view.player_length + "人"

    touch.icon "home", ->
      icon =
        if touch_sw.state()
          "icon-resize-normal"
        else
          "icon-resize-full"

      m ".pagenavi.choice.guide.form-inline",
        m "h6", "検索する。　　　　"
        m "input.form-control",
          onblur:   m.withAttr("value", Url.prop.search)
          onchange: m.withAttr("value", Url.prop.search)
          value: Url.prop.search()
        m "span.btn.btn-default", touch_sw.start(true),
          m "i.#{icon}"
        m "span.btn.btn-default", touch.start("folder"),
          m "i.icon-book"
          m "span.note", "▼"
        m "span.btn.btn-default", touch.start("game"),
          "ルール"
          m "span.note", "▼"
        m "span.btn.btn-default", touch.start("event_type"),
          "事件"
          m "span.note", "▼"
        m "span.btn.btn-default", touch.start("role_type"),
          "役職"
          m "span.note", "▼"
        m "span.btn.btn-default", touch.start("rating"),
          "こだわり"
          m "span.note", "▼"
        m "span.btn.btn-default", touch.start("say_limit"),
          "発言制限"
          m "span.note", "▼"
        m "span.btn.btn-default", touch.start("player_length"),
          "人数"
          m "span.note", "▼"
        m "span.btn.btn-default", touch.start("update_at"),
          "更新時刻"
          m "span.note", "▼"
        m "span.btn.btn-default", touch.start("update_interval"),
          "更新間隔"
          m "span.note", "▼"

    m.module dom,
      controller: ->
      view: ->
        if touch_sw.state()
          scroll_spy.avg_height = 120
        else
          scroll_spy.avg_height = 22
        touch.query = Cache.storys.menu(Url.prop.folder(), Url.routes.search.stories.values()...)
        vdom = touch.menu m ".pagenavi.choice.guide.form-inline",
          m "a.menuicon.icon-home", GUI.TouchMenu.icons.start("home"), " "
          m "span", "村を検索してみよう。"          

        # m ".table-swipe",
        vdom.push m "table.table.table-border.table-hover",
            m "thead",
              m "tr", 
                m "th"
            scroll_spy.pager "tbody", touch.query.list(), (o)->
              m "tr", {key: o._id },
                if touch_sw.state()
                  m "td",
                    m "a",
                      href: o.link
                    , m "code.icon-download"
                    m "kbd.note", o._id
                    m "a",
                      href: o.file
                    , m.trust o.name
                    o.view.rating
                    m "table",
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

                    m "div", o.view.role_cards
                    m "div", o.view.event_cards
                else
                  m "td",
                    m "a",
                      href: o.link
                    , m "code.icon-download"
                    m "kbd.note", o._id
                    m "a",
                      href: o.file
                    , o.name
                    o.view.rating
        vdom

GUI.if_exist "#headline", (dom)->
  touch = new GUI.TouchMenu()
  touch.state "finish"

  m.module dom,
    controller: ->
    view: ->
      max_vage    = GAME.PERJURY.config.cfg.MAX_VILLAGES
      max_crazy   = GAME.CRAZY  .config.cfg.MAX_VILLAGES
      max_xebec   = GAME.XEBEC  .config.cfg.MAX_VILLAGES
      max_ciel    = GAME.CIEL   .config.cfg.MAX_VILLAGES
      max_cafe    = GAME.CABALA .config.cfg.MAX_VILLAGES
      max_pan     = GAME.PAN    .config.cfg.MAX_VILLAGES
      max_morphe  = GAME.MORPHE .config.cfg.MAX_VILLAGES
      max_all     = ( max_vage + max_crazy + max_xebec + max_ciel )
      max_all    += ( max_cafe + max_morphe )

      m ".choice",
        m "table.board",
          if "progress" == touch.state()
            m "tr",
              m "th.choice[colspan=2]",
                m "strong", "進行中の村"
              m "th.no_choice[colspan=2]",
                m "a", touch.start("finish"), "終了した村を見る"
          if "finish" == touch.state()
            m "tr",
              m "th.no_choice[colspan=2]",
                m "a", touch.start("progress"), "進行中の村を見る"
              m "th.choice[colspan=2]",
                m "strong", "終了した村"
          m "tr.link",
            m "th.choice", "ロビー"
            m "th.choice", "夢の形"
            m "th.choice", "陰謀"
            m "th.choice", "ＲＰ"
          if "progress" == touch.state()
            m "tr",
              m "td.no_choice",
                m "a",
                  href: GAME.LOBBY.config.cfg.URL_SW + "/sow.cgi"
                , "lobby"
                m "br"
                "offparty"
                m "br"
                m "br"
                m "br"
              m "td.no_choice",
                "#{max_morphe}村:"
                m "a",
                  href: GAME.MORPHE.config.cfg.URL_SW + "/sow.cgi"
                , "morphe"
                m "br"
                "#{max_cafe}村:"
                m "a",
                  href: GAME.CABALA.config.cfg.URL_SW + "/sow.cgi"
                , "cafe"
                m "br"
                m "br"
                m "br"
              m "td.no_choice",
                "wolf"
                m "br"
                "ultimate"
                m "br"
                "allstar"
                m "br"
                m "br"
              m "td.no_choice",
                "role-play"
                m "br"
                "RP-advance"
                m "br"
                "#{max_vage}村:"
                m "a",
                  href: GAME.PERJURY.config.cfg.URL_SW + "/sow.cgi"
                , "perjury"
                m "br"
                "#{max_xebec}村:"
                m "a",
                  href: GAME.XEBEC.config.cfg.URL_SW + "/sow.cgi"
                , "xebec"
                m "br"
                "#{max_crazy}村:"
                m "a",
                  href: GAME.CRAZY.config.cfg.URL_SW + "/sow.cgi"
                , "crazy"
                m "br"
                "#{max_ciel}村:"
                m "a",
                  href: GAME.CIEL.config.cfg.URL_SW + "/sow.cgi"
                , "ciel"
          if "finish" == touch.state()
            m "tr",
              m "td.no_choice",
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=LOBBY"
                , "lobby"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=OFFPARTY"
                ,"offparty"
                m "br"
                m "br"
                m "br"
              m "td.no_choice",
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=MORPHE"
                , "morphe"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=CABALA"
                , "cafe"
                m "br"
                m "br"
                m "br"
              m "td.no_choice",
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=WOLF"
                , "wolf"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=ULTIMATE"
                , "ultimate"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=ALLSTAR"
                , "allstar"
                m "br"
                m "br"
              m "td.no_choice", 
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=RP"
                , "role-play"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=PRETENSE"
                , "advance"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=PERJURY"
                , "perjury"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=XEBEC"
                , "xebec"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=CRAZY"
                , "crazy"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=CIEL"
                , "ciel"


###
    h6(ng-if="event") ページ移動
    .form-inline(ng-if="event" style="text-align:right;")
      .form-group(ng-if="page && ! event.is_news" template="navi/paginate")
      | &thinsp;
      .form-group(ng-if="mode")
        a.mark.click(ng-click="mode.value = mode_common[1].value") メモ
      | &thinsp;
      .form-group(ng-if="mode")
        a.mark.click(ng-click="mode.value = mode_common[2].value") 議事
      | &thinsp;
      .form-group
        input.form-control.input-medium(type="text" ng-model="search_input" ng-blur="search.value = search_input" placeholder="ログを探す")
      | &thinsp;
      .form-group(ng-if="event.is_progress")
        a.mark.click.icon-pencil(ng-click="go.form()")
###

GUI.if_exist "#to_root", (dom)->
  day_or_night = m.prop()
  m.module dom,
    controller: ->
      hour = 1000 * 60 * 60

      GUI.do_tick (now)->
        zone = now + 3*hour # means - 6hours base. (GMT is - 9 hours)
        day_or_night Math.floor(zone / (12*hour)) % 2
        12*hour - zone % (12*hour)

    view: ->
      [ m "a",
          href: "//giji.check.jp/"
        , GUI.title Url.prop.w(), Url.prop.theme(), day_or_night()
      ]

m.endComputation()
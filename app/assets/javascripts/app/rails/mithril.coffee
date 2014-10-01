if gon?.map_reduce?.faces?
  Cache.rule.map_face.set gon.map_reduce.faces
  map_orders = (prop)->
    order = RAILS.map_faces_orders[prop]
    order.func = (o)-> o.win.value[order.order] ||= 0
    Cache.rule.map_face.schema ->
      @order (o)-> - order.func(o)
    order

  GUI.if_exist "map_faces", (dom)->
    m.module dom, 
      controller: ->
      view: ->
        map_order_set = map_orders(Url.prop.order())
        chrs = Cache.map_faces.chr_set[Url.prop.chr_set()]
        headline = ""
        if chrs?.length
          headline = [
            m "span.badge.badge-info", Cache.chr_sets.find[Url.prop.chr_set()].caption
            "の#{chrs.length}人を、"
            m "span.badge.badge-info", map_orders(Url.prop.order()).headline
            "回数で並べています"
          ]

        GUI.chrs chrs, headline, (o, face)->
          chr_job = Cache.chr_jobs.find["#{Url.prop.chr_set()}_#{face._id}"]
          job_name = chr_job.job

          [ m "div", job_name
            m "div", face.name
            m "div", 
              m "a.mark",
                href: "/map_reduce/faces/#{face._id}"
              , "#{map_order_set.caption} #{map_order_set.func(o)}回"
            m "div", "♥#{o.sow_auth_id.max_is}"
          ]

  GUI.if_exist "chr_sets", (dom)->
    touch = new GUI.TouchMenu()
    m.module dom,
      controller: ->
      view: ->
        chr_sets = Cache.chr_sets.all
        m "div", [
          m ".choice.guide", [
            "キャラセットを選んでみよう "
            m "a.glyphicon.glyphicon-tags", touch.start()
          ]
          if touch.state()
            m ".drag",
              m ".contentframe", [
                for key, o of RAILS.map_faces_orders
                  m "a", touch.btn(Url.prop.order, key), o.caption
                m "ul", 
                  for cs in chr_sets
                    m "li.btn-block", touch.btn(Url.prop.chr_set, cs._id) , cs.caption
              ]
        ]

if gon?.face?
  face = Cache.map_face_detail = gon.face
  face.name = Cache.faces.find[face.face_id].name
  face.story_id_of_folders = _.groupBy face.story_ids, ([k,count])->
    k.split("-")?[0]

  face.role_of_wins = _.groupBy face.roles, ([k,count])->
    role = RAILS.gifts[k] || RAILS.roles[k] || {group: "OTHER"}
    RAILS.groups[role.group].name

  GUI.if_exist "summary", (dom)->
    m.module dom,
      controller: ->
      view: ->
        [ m "h2", face.name + " の活躍"
          m "h6", 
            if face.says[0]?
              [ m "span.code", Timer.date_time_stamp face.says[0].date.min
                m.trust "&nbsp;〜&nbsp;"
                m "span.code", Timer.date_time_stamp face.says[0].date.max
              ]
          m "table.say.SAY",
            m "tbody",
              m "tr", [
                m "td.img", 
                  GUI.portrate face.face_id
                m "td.field", [
                  m ".msg", [
                    GUI.letter face.name, [
                      "全部で"
                      m "span.mark", face.role.all
                      "の役職になりました"
                    ]
                    for win in face.win.keys
                      GUI.letter "#{win} x#{face.win.value[win]}回",
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
                ]
              ]
        ]

  GUI.if_exist "calc", (dom)->
    m.module dom,
      controller: ->
      view: ->
        says_count_lines =
          [ m "a", {name: "says_count"}
            m "tr.caution", [
              m "th.msg", {colspan: 2}, "総合値"
              m "th.msg", {style: "text-align:right"}, "一番長い発言"
              m "th.msg", {style: "text-align:right"}, "総文字数"
              m "th.msg", {style: "text-align:right"}, "総発言回数"
            ]
          ]
        says_calc_lines =
          [ m "a", {name: "says_calc"}
            m "tr.caution", [
              m "th.msg", {colspan: 2}, "平均値"
              m "th.msg", {style: "text-align:right"}, "／村数"
              m "th.msg", {style: "text-align:right"}, "文字数"
              m "th.msg", {style: "text-align:right"}, "発言回数"
            ]
          ]
        for say in face.says
          says_count_line =
            m "tr.#{say.logid_head}AY", [
              m "th.msg"
              m "th.msg", face.say_titles[say.logid_head]
              m "th.msg", {style: "text-align:right"}, "#{GUI.comma say.max  } 字"
              m "th.msg", {style: "text-align:right"}, "#{GUI.comma say.all  } 字"
              m "th.msg", {style: "text-align:right"}, "#{GUI.comma say.count} 回"
            ]
          says_calc_line =
            m "tr.#{say.logid_head}AY", [
              m "th.msg"
              m "th.msg", face.say_titles[say.logid_head]
              m "th.msg", {style: "text-align:right"}, "#{GUI.comma say.vil} 村"
              m "th.msg", {style: "text-align:right"}, "#{GUI.comma say.all / say.vil} 字"
              m "th.msg", {style: "text-align:right"}, "#{GUI.comma say.count / say.vil} 回"
            ]
          says_count_lines.push says_count_line
          says_calc_lines.push says_calc_line
          
        [ m "table.say.info", says_count_lines
          m "table.say.info", says_calc_lines
        ]

  GUI.if_exist "village", (dom)->
    m.module dom,
      controller: ->
      view: ->
        [ m "a", {name: "village"}
          m ".MAKER.guide", [
            GUI.letter face.name, [
              "全部で"
              m "span.mark", "#{face.folder.all}回"
              "登場しました。"
            ]
            for folder in face.folder.keys
              GUI.letter "#{folder} x#{face.folder.value[folder]}回", 
                for story_id in face.story_id_of_folders[folder]
                  GUI.inline_item -> 
                    m "a",
                      style: "display:block; width:#{2.8 + folder.length * 0.65}em; text-align:left;"
                      href: "http://7korobi.gehirn.ne.jp/stories/#{story_id[0]}.html"
                    , story_id[0]
          ]
        ]

  GUI.if_exist "sow_user", (dom)->
    m.module dom,
      controller: ->
      view: ->
        [ m "a", {name: "sow_user"}
          m ".ADMIN.guide", [
            GUI.letter face.name, [
              "全部で"
              m "span.mark", "#{face.sow_auth_ids.length}人"
              "が、"
              m "span.mark", "#{face.sow_auth_id.all}回"
              "登場しました。"
            ]
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
        ]

GUI.if_exist "buttons", (dom)->
  m.module dom,
    controller: ->
    view: ->
      m "nav", [
        m "span",
          m "a.btn.btn-default.click.glyphicon.glyphicon-search",
            onclick: ->
        m "span",
          m "a.btn.btn-default.click.glyphicon.glyphicon-pencil",
            onclick: ->
        for o in []
          m "span",
            m "a.btn.click",
              onclick: ->
            , o.name
        m "a.btn.btn-default",
          onclick: ->
        , "✗"
      ]
  new Layout -12,-1, dom

GUI.if_exist "sayfilter", (dom)->
  m.module dom,
    controller: ->
    view: ->
      []
  new Layout   1,-1, dom

GUI.if_exist "topviewer", (dom)->
  m.module dom,
    controller: ->
    view: ->
      []
  new Layout   0, 1, dom

GUI.if_exist "css_changer", (dom)->
  touch = new GUI.TouchMenu()
  m.module dom,
    controller: ->
    view: ->
      [ m "span", [
          m "a.mark", touch.btn(Url.prop.theme, "cinema"), "煉瓦"
          m "a.mark", touch.btn(Url.prop.theme, "night"), "月夜"
          m "a.mark", touch.btn(Url.prop.theme, "star"), "蒼穹"
          m "a.mark", touch.btn(Url.prop.theme, "wa"), "和の国"
          m "a.glyphicon.glyphicon-cog", touch.start()
        ]
        if touch.state()
          m ".drag",
            m ".contentframe", touch.cancel(), [
              m "h6", "幅の広さ"
              m ".form-inline",
                m ".form-group", [
                  m "a", touch.btn(Url.prop.width, "mini"), "携帯"
                  m "a", touch.btn(Url.prop.width, "std"),  "普通"
                  m "a", touch.btn(Url.prop.width, "wide"), "広域"
                ]
              m "h6", "位置"
              m ".form-inline",
                m ".form-group", [
                  m "a", touch.btn(Url.prop.layout, "left"),   "左詰"
                  m "a", touch.btn(Url.prop.layout, "center"), "中央"
                  m "a", touch.btn(Url.prop.layout, "right"),  "右詰"
                ]
              m "h6", "位置"
              m ".form-inline",
                m ".form-group", [
                  m "a", touch.btn(Url.prop.font, "large"),   "大判"
                  m "a", touch.btn(Url.prop.font, "novel"),   "明朝"
                  m "a", touch.btn(Url.prop.font, "std"), "ゴシック"
                  m "a", touch.btn(Url.prop.font, "small"),   "繊細"
                ]
            ]
      ]

message = 
  say: (v)->
    m "table.say.#{v.mestype}",
      m "tbody",
        m "tr", [
          m "td.img",
            GUI.portrate v.face_id

          m "td.field",
            m ".msg", [
              m "h3.mesname", [
                m.trust "&nbsp;"
                m "b",
                  m.trust v.name
              ]
              m "p.text.#{v.style}",
                m.trust v.log
              m "p.mes_date",
                m "span.mark", v.anchor
            ]
        ]

  action: (v)->
    v.updated_timer ||= new Timer v.updated_at,
      prop: m.prop()
    m ".#{v.mestype}",
      m ".action", [
        m "p.text.#{v.style}", [
          m "b", m.trust v.name
          "は、"
          m.trust v.log
        ]
        m "p.mes_date", v.updated_timer.prop()
      ]

if gon?.villages?
  GUI.if_exist "villages", (dom)->
    m.module dom,
      controller: ->
      view: ->
        message.action(v) for v in gon.villages

if gon?.byebyes?
  GUI.if_exist "byebyes", (dom)->
    m.module dom,
      controller: ->
      view: ->
        message.action(v) for v in gon.byebyes

if gon?.history?
  GUI.if_exist "history", (dom)->
    m.module dom,
      controller: ->
      view: ->
        message.say(v) for v in gon.history

GUI.if_exist "headline", (dom)->
  touch = new GUI.TouchMenu()
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
        m "table.board", [
          m "tr", 
            if touch.state()
              [ m "th.choice",
                  colspan: 2,
                , m "strong", "進行中の村"
                m "th.no_choice",
                  colspan: 2,
                , m "a", touch.start(), "終了した村を見る"
              ]
            else
              [ m "th.no_choice",
                  colspan: 2,
                , m "a", touch.start(), "進行中の村を見る"
                m "th.choice",
                  colspan: 2,
                , m "strong", "終了した村"
              ]
          m "tr.link", [
            m "th.choice", "ロビー"
            m "th.choice", "夢の形"
            m "th.choice", "陰謀"
            m "th.choice", "ＲＰ"
          ]
          if touch.state()
            m "tr", [
              m "td.no_choice", [
                m "a",
                  href: GAME.LOBBY.config.cfg.URL_SW + "/sow.cgi"
                , "lobby"
                m "br"
                "offparty"
                m "br"
                m "br"
                m "br"
              ]
              m "td.no_choice", [
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
              ]
              m "td.no_choice", [
                "wolf"
                m "br"
                "ultimate"
                m "br"
                "allstar"
                m "br"
                "cabala"
                m "br"
              ]
              m "td.no_choice", [
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
              ]
            ]
          else
            m "tr", [
              m "td.no_choice", [
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/lobby?folder=LOBBY"
                , "lobby"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/offparty?folder=OFFPARTY"
                ,"offparty"
                m "br"
                m "br"
                m "br"
              ]
              m "td.no_choice", [
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/offparty?folder=MORPHE"
                , "morphe"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/offparty?folder=CAFE"
                , "cafe"
                m "br"
                m "br"
                m "br"
              ]
              m "td.no_choice", [
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/offparty?folder=WOLF"
                , "wolf"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/offparty?folder=ULTIMATE"
                , "ultimate"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/offparty?folder=ALLSTAR"
                , "allstar"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/offparty?folder=CABALA"
                , "cabala"
                m "br"
              ]
              m "td.no_choice", [
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/offparty?folder=RP"
                , "role-play"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/offparty?folder=PRETENSE"
                , "advance"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/offparty?folder=PERJURY"
                , "perjury"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/offparty?folder=XEBEC"
                , "xebec"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/offparty?folder=CRAZY"
                , "crazy"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/offparty?folder=CIEL"
                , "ciel"
              ]
            ]
        ]



###
  css: new Url "css=:theme-:width-:layout-:font", (params)->

  .pagenavi
    h6(ng-if="mode" style="text-align:left;") 見るログを選ぶ
    .form-inline(ng-if="mode" style="text-align:left;")
      .form-group
        a.mark(ng-click="event.show_info()") 情報
      | &thinsp;
      .form-group(ng-repeat="e in events")
        a.mark(ng-click="e.show_talk()") {{e.name}}
      .form-group(ng-if="story.news().is_progress")
        | &thinsp;/&thinsp;
        a.mark(ng-click="story.news().show_news()") 最新
        | &thinsp;
        a.mark(ng-click="story.news().show_unread()") 未読

    h6(ng-if="show_style_navi && msg_style") ログの表示方法
    .form-inline(ng-if="show_style_navi && msg_style")
      .form-group
        label
          select.form-control.input-medium(ng-model="css.value" ng-options="o.val as o.name group by o.group for o in css.select")
      | &thinsp;
      .form-group
        label
          select.form-control.input-mini(ng-model="msg_styles.power"   ng-options="key as selectors.power[key] for key in selector_keys.power" )
        | &thinsp;
      .form-group
        label
          select.form-control.input-mini(ng-model="msg_styles.order"   ng-options="key as selectors.order[key] for key in selector_keys.order" )
        | &thinsp;
      .form-group
        label
          select.form-control.input-mini(ng-model="msg_styles.row"   ng-options="key as selectors.row[key] for key in selector_keys.row" )
        | &thinsp;

    h6(ng-if="show_style_navi && mode") ログから表示する部分を選ぶ
    .form-inline(ng-if="show_style_navi && mode")
      .form-group.mark
        label
          input(type="radio" tabindex="-1" value="open"  ng-model="modes.view") 公開
        label
          input(type="radio" tabindex="-1" value="clan"  ng-model="modes.view") 内緒話
        label
          input(type="radio" tabindex="-1" value="think" ng-model="modes.view") 独り言
        label
          input(type="radio" tabindex="-1" value="all"   ng-model="modes.view") 全部
      | &thinsp;
      .form-group.mark
        label.checkbox
          input(type="checkbox" tabindex="-1" ng-model="modes.last") 最後の言葉
        label.checkbox
          input(type="checkbox" tabindex="-1" ng-model="modes.open") 公開発言
        label.checkbox
          input(type="checkbox" tabindex="-1" ng-model="msg_styles.pl") 中身発言


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
        a.mark.click.glyphicon.glyphicon-pencil(ng-click="go.form()")
###

GUI.if_exist "to_root", (dom)->
  day_or_night = m.prop()
  m.module document.getElementById("to_root"),
    controller: ->
      hour = 1000 * 60 * 60

      GUI.do_tick (now)->
        zone = now + 3*hour # means - 6hours base. (GMT is - 9 hours)
        day_or_night Math.floor(zone / (12*hour)) % 2
        12*hour - zone % (12*hour)

    view: ->
      [ m "a",
          href: "http://giji.check.jp/"
        , GUI.title Url.prop.w(), Url.prop.theme(), day_or_night()
      ]

m.endComputation()
if gon?.map_reduce?.faces?
  Cache.rule.map_face.set gon.map_reduce.faces
  chr_set = m.prop("all")
  map_order = m.prop("all")
  map_orders = (prop)->
    order = RAILS.map_faces_orders[prop]
    order.func = (o)-> o.win.value[order.caption] ||= 0
    Cache.rule.map_face.schema ->
      @order (o)-> - order.func(o)
    order

  GUI.if_exist "map_faces", (dom)->
    m.module dom, 
      controller: ->
      view: ->
        map_order_set = map_orders(map_order())
        headline = ""
        chrs = Cache.map_faces.chr_set[chr_set()]
        headline = "人気の #{chrs.length}キャラクター" if chrs?.length
        GUI.chrs chrs, headline, (o, face)->
          chr_job = Cache.chr_jobs.find["#{chr_set()}_#{face._id}"]
          job_name = chr_job.job

          [ m "div", job_name
            m "div", face.name
            m "div", 
              m "a.mark",
                href: "/map_reduce/faces/#{face._id}"
              , "#{map_order_set.title} #{map_order_set.func(o)}回"
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
            m "span.badge.badge-info", Cache.chr_sets.find[chr_set()].caption
            m "span.badge.badge-info", map_orders(map_order()).title
            m "a.glyphicon.glyphicon-cog", touch.start()
          ]
          if touch.state()
            m ".drag",
              m ".contentframe", touch.cancel(), [
                m "ul", 
                  for cs in chr_sets
                    m "li.btn-block", touch.btn(chr_set, cs._id) , cs.caption
                for key, o of RAILS.map_faces_orders
                  m "a", touch.btn(map_order, key), o.caption
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
          [ m "tr.caution", [
              m "th.msg", {colspan: 2}, "総合値"
              m "th.msg", {style: "text-align:right"}, "一番長い発言"
              m "th.msg", {style: "text-align:right"}, "総文字数"
              m "th.msg", {style: "text-align:right"}, "総発言回数"
            ]
          ]
        says_calc_lines =
          [ m "tr.caution", [
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
        [ m ".MAKER.guide", [
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
                      style: "display:block; width:#{2.5 + folder.length * 0.6}em; text-align:left;"
                      href: "http://7korobi.gehirn.ne.jp/stories/#{story_id[0]}.html"
                    , story_id[0]
          ]
        ]

  GUI.if_exist "sow_user", (dom)->
    m.module dom,
      controller: ->
      view: ->
        [ m ".ADMIN.guide", [
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

    h6(ng-if="show_style_navi") スタイル（ログの見た目）を調整する
    .form-inline(ng-if="show_style_navi")
      .form-group.mark
        label.checkbox(ng-repeat="key in selector_keys.font")
          input(type="radio" tabindex="-1" value="{{key}}" ng-model="styles.font")
            | {{selectors.font[key]}}
      | &thinsp;
      .form-group.mark
        label.checkbox(ng-repeat="key in selector_keys.width")
          input(type="radio" tabindex="-1" value="{{key}}" ng-model="styles.width")
            | {{selectors.width[key]}}

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
        , GUI.title 770, "cinema", day_or_night()
      ]

m.endComputation()
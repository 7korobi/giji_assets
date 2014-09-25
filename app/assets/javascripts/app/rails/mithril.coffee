touch_events = (touch)->
  list_cmds =
    start: (cb)->
      onmousedown: -> cb()
      ongesturestart: -> cb()
      ontouchstart: -> cb()
    move: (cb)->
      onmousemove: -> cb()
      ongesturechange: -> cb()
      ontouchmove: -> cb()
    end: (cb)->
      onmouseup: -> cb()
      ongestureend: -> cb()
      ontouchend: -> cb()
  touch.call(list_cmds)

if gon?.map_reduce?.faces?
  Cache.rule.map_face.set gon.map_reduce.faces
  chr_set = m.prop("all")
  map_order = m.prop("all")
  touch_state = m.prop(false)
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
        chrs = Cache.map_faces.chr_set[chr_set()]
        headline =
          if chrs
            "人気の #{chrs.length}キャラクター"
          else
            ""

        [ m "hr",
            style: "border-color:black;"
          m ".mark", headline
          for o in chrs
            chr_job = Cache.chr_jobs.find["#{chr_set()}_#{o.face_id}"]
            job_name = chr_job.job
            face_name = o.face.name

            m ".chrbox", [
              GUI.portrate o.face_id
              m ".chrblank", [
                m "div", job_name
                m "div", face_name
                m "div", 
                  m "a.mark",
                    href: "/map_reduce/faces/#{o.face_id}"
                  , "#{map_order_set.title} #{map_order_set.func(o)}回"
                m "div", "♥#{o.sow_auth_id.max_is}"
              ]
            ]
          m "hr",
            style: "border-color:black;"
        ]

  GUI.if_exist "chr_sets", (dom)->
    m.module dom,
      controller: ->
      view: ->
        chr_sets = Cache.chr_sets.all
        div_attrs = touch_events ->
          @start ->
            touch_state true
        head =
          m "div",
            m "label.input-block-level", "キャラセットを選んでみよう ☆ミ"
        [ m "div", div_attrs,
            if touch_state()
              select_chr_set = (o)->
                ->
                  chr_set o._id
                  touch_state false
              select_map_order = (o)->
                ->
                  map_order o
                  touch_state false

              [ head
                m "ul", 
                  for cs in chr_sets
                    attrs = touch_events ->
                      @end select_chr_set cs
                    m "li.mark",attrs , cs.caption
                for key, o of RAILS.map_faces_orders
                  attrs = touch_events ->
                    @end select_map_order key
                  attrs.class =
                    if key == map_order()
                      "btn btn-success"
                    else
                      "btn btn-default"
                  m "a", attrs, o.caption
              ]
            else
              [ head
                m "span.badge.badge-info", Cache.chr_sets.find[chr_set()].caption
                m "span.badge.badge-info", map_orders(map_order()).title
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

GUI.if_exist "to_root", (dom)->
  day_or_night = m.prop()
  test1 = new Timer _.now() + 10000,
    prop: m.prop()
  test2 = new Timer _.now() + 20000,
    prop: m.prop()
  test3 = new Timer _.now() + 40000,
    prop: m.prop()

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
        m "div", test1.prop()
        m "div", test2.prop()
        m "div", test3.prop()
      ]

m.endComputation()
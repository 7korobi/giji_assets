touch_events = (touch)->
  onmousedown: touch.start
  onmousemove: touch.move
  onmouseup:   touch.end
  ongesturestart:  touch.start
  ongesturechange: touch.move
  ongestureend:    touch.end
  ontouchstart: touch.start
  ontouchmove:  touch.move
  ontouchend:   touch.end

if gon?.map_reduce?.faces?
  Cache.rule.map_face.set gon.map_reduce.faces
  win.on.load.push ->
    chr_set = m.prop("all")
    map_order = m.prop("all")
    touch_state = m.prop(false)
    map_orders = (prop)->
      order = RAILS.map_faces_orders[prop]
      order.func = (o)-> o.win.value[order.caption] ||= 0
      Cache.rule.map_face.schema ->
        @order (o)-> - order.func(o)
      order

    m.module document.getElementById("map_faces"), 
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
              m "img", 
                src: "http://7korobi.gehirn.ne.jp/images/portrate/#{o.face_id}.jpg"
              m ".chrblank", [
                m "div", job_name
                m "div", face_name
                m "div", 
                  m "a.mark",
                    href: "/map_reduce/faces/#{o.face_id}"
                  , "#{map_order_set.title} #{map_order_set.func(o)}回"
                m "div", "♥#{o.RAILS_auth_id.max_is}"
              ]
            ]
          m "hr",
            style: "border-color:black;"
        ]

    m.module document.getElementById("chr_sets"),
      controller: ->
      view: ->
        chr_sets = Cache.chr_sets.all
        div_attrs = touch_events
          start: ->
            touch_state true
          move: ->
          end: ->
        head =
          m "div",
            m "label.input-block-level", "キャラセットを選んでみよう ☆ミ"
        [ m "div", div_attrs,
            if touch_state()
              [ head
                m "ul", 
                  for o in chr_sets
                    attrs = touch_events
                      start: ->
                      move: ->
                      end: ->
                        chr_set o._id
                        touch_state false
                    m "li.mark",attrs , o.caption
                for key, o of RAILS.map_faces_orders
                  attrs = touch_events
                    start: ->
                    move: ->
                    end: ->
                      map_order key
                      touch_state false
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
  face.story_id_of_folders = _.groupBy face.story_ids, ([k,count])->
    k.split("-")?[0]

  face.role_of_wins = _.groupBy face.roles, ([k,count])->
    role = RAILS.gifts[k] || RAILS.roles[k] || {group: "OTHER"}
    RAILS.groups[role.group].name

  win.on.load.push ->
    name = 
      config: (o)->
        RAILS.roles[o]?.name || RAILS.gifts[o]?.name || RAILS.events[o]?.name || o || ""

    comma = (num)->
      (String Math.round num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

    inline_item_span = (align, em, vdom)->
      m "span",
        style: "display:inline-block; width:#{em}em; text-align:#{align}; white-space: nowrap;"
      , vdom
    inline_item = (cb)->
      list_cmds =
        center: (em, vdom)-> inline_item_span "center", em, vdom
        right:  (em, vdom)-> inline_item_span "right", em, vdom

      m ".mark.",
        style: "display:inline-block;"
      , cb.call(list_cmds)

    letter = (head, vdom)->
      [ m "h3.mesname",
          m "b", head
        m "p.text", vdom
      ]

    m.module document.getElementById("summary"),
      controller: ->
      view: ->
        [ m "h2", face.name + " の活躍"
          m "h6", [
            m "span.code", Timer.date_time_stamp face.says[0].date.min
            m.trust "&nbsp;〜&nbsp;"
            m "span.code", Timer.date_time_stamp face.says[0].date.max
          ]
          m "table.say.SAY",
            m "tbody",
              m "tr", [
                m "td.img", 
                  m "img",
                    src: "http://7korobi.gehirn.ne.jp/images/portrate/#{face.face_id}.jpg"
                m "td.field", [
                  m ".msg", [
                    letter face.name, [
                      "全部で"
                      m "span.mark", face.role.all
                      "の役職になりました"
                    ]
                    for win in face.win.keys
                      letter "#{win} x#{face.win.value[win]}回",
                        for role in face.role_of_wins[win]
                          inline_item -> [
                            @center 3.75, name.config role[0]
                            @right  2.50, "x" + role[1]
                          ]
                  ]
                ]
              ]
        ]

    m.module document.getElementById("calc"),
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
              m "th.msg", {style: "text-align:right"}, "#{comma say.max  } 字"
              m "th.msg", {style: "text-align:right"}, "#{comma say.all  } 字"
              m "th.msg", {style: "text-align:right"}, "#{comma say.count} 回"
            ]
          says_calc_line =
            m "tr.#{say.logid_head}AY", [
              m "th.msg"
              m "th.msg", face.say_titles[say.logid_head]
              m "th.msg", {style: "text-align:right"}, "#{comma say.vil} 村"
              m "th.msg", {style: "text-align:right"}, "#{comma say.all / say.vil} 字"
              m "th.msg", {style: "text-align:right"}, "#{comma say.count / say.vil} 回"
            ]
          says_count_lines.push says_count_line
          says_calc_lines.push says_calc_line
          
        [ m "table.say.info", says_count_lines
          m "table.say.info", says_calc_lines
        ]

    m.module document.getElementById("village"),
      controller: ->
      view: ->
        [ m ".MAKER.guide", [
            letter face.name, [
              "全部で"
              m "span.mark", "#{face.folder.all}回"
              "登場しました。"
            ]
            for folder in face.folder.keys
              letter "#{folder} x#{face.folder.value[folder]}回", 
                for story_id in face.story_id_of_folders[folder]
                  inline_item -> 
                    m "a",
                      style: "display:block; width:#{2.5 + folder.length * 0.6}em; text-align:left;"
                      href: "http://7korobi.gehirn.ne.jp/stories/#{story_id[0]}.html"
                    , story_id[0]
          ]
        ]

    m.module document.getElementById("sow_user"),
      controller: ->
      view: ->
        [ m ".ADMIN.guide", [
            letter face.name, [
              "全部で"
              m "span.mark", "#{face.sow_auth_ids.length}人"
              "が、"
              m "span.mark", "#{face.sow_auth_id.all}回"
              "登場しました。"
            ]
            for sow_auth_id in face.sow_auth_ids
              inline_item -> [
                @right 9.0, sow_auth_id[0]
                @right 2.0, "x" + sow_auth_id[1]
              ]
          ]
        ]

if_exist = (id, cb)->
  dom = document.getElementById(id)
  if !!dom
    win.on.load.push ->
      cb(dom)

if_exist "buttons", (dom)->
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

if_exist "sayfilter", (dom)->
  m.module dom,
    controller: ->
    view: ->
      []
  new Layout   1,-1, dom

if_exist "topviewer", (dom)->
  m.module dom,
    controller: ->
    view: ->
      []
  new Layout   0, 1, dom

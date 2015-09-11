GUI.if_exist "#css_changer", (dom)->
  m.mount dom,
    controller: ->
    view: ->
      m ".paragraph",
        m "a.menuicon.pull-right.icon-cog", menu.icon.start({}, "cog"), " "
        Btns.radio {}, Url.prop.theme,
          cinema: "煉瓦"
          star:   "蒼穹"
          night:  "闇夜"
          moon:   "月夜"
          wa:     "和の国"
        m "hr.black"

if gon?.map_reduce?.faces?
  catch_gon.map_reduce_faces()

  GUI.if_exist "#map_faces", (dom)->
    m.mount dom,
      controller: ->
      view: ->
        {order, chr_set, search} = Url.prop
        map_order_set = RAILS.map_faces_orders[order()]
        chrs = Mem.map_faces.active(order(), chr_set(), search()).list()
        headline = ""

        if chrs?.length
          headline = [
            m ".GSAY.badge", Mem.chr_sets.find(chr_set()).caption
            "の#{chrs.length}人を、"
            m ".GSAY.badge", map_order_set.headline
            "回数で並べています"
          ]

        [ m "div", headline
          m "hr.black"
          for o in chrs
            chr_job = Mem.chr_jobs.find("#{chr_set()}_#{o.face_id}")
            job_name = chr_job.job


            attr = null
            attr_main = GUI.attrs {}, ->
              elem = null
              config = (_elem)-> elem = _elem
              over = -> GUI.Animate.jelly.up elem
              out = -> GUI.Animate.jelly.down elem
              @config config
              @over over
              @out out

              attr = GUI.attrs {}, ->
                @over over
                @out out

            m ".chrbox", {key: o._id},
              GUI.portrate o.face_id, attr_main
              m ".chrblank.line4", attr,
                m "div", job_name
                m "div", o.face().name
                m "div",
                  m "a.mark",
                    href: "/map_reduce/faces/#{o.face_id}"
                  , "#{map_order_set.caption} #{o.win.value[map_order_set.order]}回"
                m "div", "♥#{o.sow_auth_id.max_is}"
          m "hr.black"
        ]

  GUI.if_exist "#chr_sets", (dom)->
    m.mount dom,
      controller: ->
      view: ->
        menu.icon.icon "th-large",
          deploy: (main_menu)->
            main_menu.drill "order",
              caption: "並び順"
              view: ->
                for key, o of RAILS.map_faces_orders
                  m "span", Btn.set({}, Url.prop.order, key), o.caption

            main_menu.drill "chr_set",
              caption: "キャラセット"
              view: (sub_menu)->
                sub_menu.radio {class: "chr_set"}, Url.prop.chr_set, Mem.map_faces.reduce(), "chr_set", (key)->
                  Mem.chr_sets.find(key).caption

          view: (main_menu)->
            m ".paragraph",
              m "h6", "詳しく検索してみよう"
              m "input.small", Txt.input(Url.prop.search)
              m "span", "検索条件：キャラクター名 / 肩書き / プレイヤー "
              m "h6", "キャラセットを選んでみよう"
              main_menu.drills {}, ["order", "chr_set"]


if gon?.face?
  catch_gon.face()

  GUI.if_exist "#summary", (dom)->
    m.mount dom,
      controller: ->
      view: ->
        face = Mem.map_face_detail
        letters = [
          m "p.name",
            m "b", face.name
          m "p.text",
            "全部で"
            m "span.mark", face.role.all
            "の役職になりました"
          for win_side in face.win.keys
            [ m "p.name",
                m "b", "#{win_side} x#{face.win.value[win_side]}回"
              m "p.text",
                for role in face.role_of_wins[win_side]
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

        [ m "h2", face.name + " の活躍"
          if face.says[0]?
            m "h6",
              m "span.code", Timer.date_time_stamp new Date face.says[0].date.min
              m "span", m.trust "&nbsp;〜&nbsp;"
              m "span.code", Timer.date_time_stamp new Date face.says[0].date.max
          m "table.SAY.talk", win.scroll.mark("summary"),
              m "tr",
                m "th",
                  GUI.portrate face.face_id
                m "td",
                  m ".msg", letters
        ]

  GUI.if_exist "#calc", (dom)->
    m.mount dom,
      controller: ->
      view: ->
        face = Mem.map_face_detail
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

        [ m "table.info", win.scroll.mark("says_count"), says_count_lines
          m "table.info", win.scroll.mark("says_calc"), says_calc_lines
        ]

  GUI.if_exist "#village", (dom)->
    m.mount dom,
      controller: ->
      view: ->
        face = Mem.map_face_detail
        letters = [
          m "p.name",
            m "b", face.name
          m "p.text",
            "全部で"
            m "span.mark", "#{face.folder.all}回"
            "登場しました。"
          for folder in face.folder.keys
            [ m "p.name",
                m "b", "#{folder} x#{face.folder.value[folder]}回"
              m "p.text",
                for story_id in face.story_id_of_folders[folder]
                  GUI.inline_item ->
                    @left 2.8 + folder.length * 0.65,
                      m "a",
                        href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/#{story_id[0]}"
                      , story_id[0]
            ]
        ]
        m ".MAKER.guide", win.scroll.mark("villages"), letters

  GUI.if_exist "#sow_user", (dom)->
    m.mount dom,
      controller: ->
      view: ->
        face = Mem.map_face_detail
        letters = [
          m "p.name",
            m "b", face.name
          m "p.text",
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
        m ".ADMIN.guide", win.scroll.mark("sow_users"), letters


if gon?.villages?
  GUI.if_exist "#villages", (dom)->
    Mem.rule.item.set gon.villages
    m.mount dom,
      controller: ->
      view: ->
        win.scroll.pager "div", Mem.items.list(), (v)->
          GUI.message.action(v)

if gon?.byebyes?
  GUI.if_exist "#byebyes", (dom)->
    Mem.rule.item.set gon.byebyes
    m.mount dom,
      controller: ->
      view: ->
        win.scroll.pager "div", Mem.items.list(), (v)->
          GUI.message.action(v)

if gon?.history?
  GUI.if_exist "#history", (dom)->
    Mem.rule.item.set gon.history
    m.mount dom,
      controller: ->
      view: ->
        win.scroll.pager "div", Mem.items.list(), (v)->
          GUI.message.history(v)

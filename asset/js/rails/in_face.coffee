if gon?.face?
  catch_gon.face()

  win.mount "#summary", (dom)->
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

  win.mount "#calc", (dom)->
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

  win.mount "#village", (dom)->
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

  win.mount "#sow_user", (dom)->
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

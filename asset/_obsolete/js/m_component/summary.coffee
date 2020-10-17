doc.component.summary =
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

doc.component.calc =
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

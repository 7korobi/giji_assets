GUI.if_exist "#css_changer", (dom)->
  m.mount dom,
    controller: ->
    view: ->
      m ".paragraph",
        m "a.menuicon.pull-right.icon-cog", menu.icon.start({}, "cog"), " "
        if false #sow.auth.is_login
          m "a.btn.edge[href=#{gon.url}?ua=mb&cmd=vindex&uid=#{sow.auth.uid()}&pwd=#{sow.auth.pwd()}]", "携帯"
        else
          m "a.btn.edge[href=#{gon.url}?ua=mb]", "携帯"
        Btns.radio {}, Url.prop.theme,
          cinema: "煉瓦"
          star:   "蒼穹"
          night:  "闇夜"
          moon:   "月夜"
          wa:     "和の国"
        m "hr.black"

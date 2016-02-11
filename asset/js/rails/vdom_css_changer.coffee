win.mount "#css_changer", (dom)->
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

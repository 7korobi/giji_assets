GUI.if_exist "#css_changer", (dom)->
  m.module dom,
    controller: ->
    view: ->
      m ".guide",
        m "a.menuicon.pull-right.icon-cog", menu.icon.start({}, "cog"), " "
        Btns.radio {}, Url.prop.theme,
          cinema: "煉瓦"
          star:   "蒼穹"
          night:  "闇夜"
          moon:   "月夜"
          wa:     "和の国"
        m "hr.black"

if gon?.sow_auth?
  GUI.if_exist "#buttons", (dom)->
    catch_gon.sow_auth()
    menu.icon.icon "pin",
      open: ->
      close: ->
      view: ->
        [ m "label",
            m "span.mark.pull-left", "user id : "
            m "input.mini", Txt.input sow.auth.uid
          m "label",
            m "span.mark.pull-left", "password : "
            m "input.mini[type=password]", Txt.input sow.auth.pwd
          m "hr.black"
        ]


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



GUI.if_exist "#topviewer", (dom)->
  layout = new Layout dom, 0, 1, 110, false, 0

  m.mount dom,
    controller: ->
    view: ->
      menu.icon.view()
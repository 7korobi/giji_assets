
win.mount "#topviewer", (dom)->
  controller: ->
    layout = new win.layout dom, 0, 1, false, 0
  view: ->
    menu.icon.view()

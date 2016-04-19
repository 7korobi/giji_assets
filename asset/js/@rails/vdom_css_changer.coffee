win.mount "#css_changer", (dom)->
  controller: ->
    { tie } = Url
    tie

  view: doc.view.css_changer

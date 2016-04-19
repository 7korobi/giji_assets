win.mount "#css_changer", (dom)->
  controller: ->
    url = window.gon?.url
    input = Url.tie.input
    { url, input }

  view: doc.view.sow_css_changer

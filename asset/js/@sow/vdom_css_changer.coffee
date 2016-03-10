win.mount "#css_changer", (dom)->
    controller: ->
    	@url = window.gon?.url
    	return
    view: doc.view.sow_css_changer

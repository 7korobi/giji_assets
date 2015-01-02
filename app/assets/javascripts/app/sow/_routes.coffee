Url.define LOCATION.props, LOCATION.bind
Url.bind = LOCATION.bind

Url.routes =
  search:
    css: new Url "css=:theme~:width~:layout~:font", 
      change: (params)->
        list = 
          for key in ["theme", "width", "layout", "font", "w", "item", "color"]
            "#{Url.prop[key]()}-#{key}"
        list.push "no-player" unless Url.prop.human()
        GUI.header list
        window.requestAnimationFrame ->
          GUI.Layout.resize()

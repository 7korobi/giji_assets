Url.options = LOCATION.options
Url.bind = LOCATION.bind

Url.routes =
  search:
    css: new Url "css=:theme-:width-:layout-:font", 
      change: (params)->
        h = {}
        for key, val of params
          h["#{val}-#{key}"] = true if key? && val? && "String" == ((Url.options[key]?.type) || "String")
        GUI.header Object.keys(h)

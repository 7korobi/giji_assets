Url.options = LOCATION.options
Url.bind = LOCATION.bind

Url.routes =
  search:
    shape: new Url "shape=:chr_set-:order",
      unmatch: gon?.map_reduce?.faces? && "?"

    css: new Url "css=:theme-:width-:layout-:font",
      unmatch: "?"
      change: (params)->
        h = {}
        for key, val of params
          h["#{val}-#{key}"] = true if key? && val? && "String" == ((Url.options[key]?.type) || "String")
        GUI.header Object.keys(h)

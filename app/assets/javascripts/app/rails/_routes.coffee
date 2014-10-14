Url.options = LOCATION.options
Url.bind = LOCATION.bind

Url.routes =
  search:
    stories: new Url "stories=:folder-:game-:rating-:event-:config-:say_limit-:player_length-:update_at-:update_interval",
      unmatch: "?"

    shape: new Url "shape=:chr_set-:order",
      unmatch: gon?.map_reduce?.faces? && "?"

    css: new Url "css=:theme-:width-:layout-:font",
      cookie:
        time: 12
        path: "/"
      unmatch: "?"
      change: (params)->
        h = {}
        for key, val of params
          h["#{val}-#{key}"] = true if key? && val? && "String" == ((Url.options[key]?.type) || "String")
        GUI.header Object.keys(h)

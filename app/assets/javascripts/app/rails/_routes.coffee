Url.options = LOCATION.options
Url.bind = LOCATION.bind

Url.routes =
  pathname:
    folder: new Url "/:folder/stories"
  search:
    folder: new Url "folder=:folder",
      unmatch: gon?.stories? && "?"

    stories: new Url "stories=:game-:rating-:event-:config-:say_limit-:player_length-:update_at-:update_interval",
      unmatch: gon?.stories? && "?"

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

Url.options = LOCATION.options
Url.bind = LOCATION.bind

Url.routes =
  pathname:
    events: new Url "/:story_id/file"
  search:
    folder: new Url "folder=:folder",
      unmatch: gon?.stories? && "?"

    stories: new Url "stories=:game~:rating~:event_type~:role_type~:say_limit~:player_length~:update_at~:update_interval~:search",
      unmatch: gon?.stories? && "?"

    events: new Url "event=:msg_mode~:msg_security",
      unmatch: gon?.events? && "?"

    potofs: new Url "potofs=:potofs_order~:potofs_desc",
      unmatch: gon?.potofs? && "?"

    faces: new Url "faces=:chr_set~:order~:search",
      unmatch: gon?.map_reduce?.faces? && "?"

    scroll: new Url "scroll=:scroll",
      unmatch: "?"

    css: new Url "css=:theme~:width~:layout~:font",
      cookie:
        time: 12
        path: "/"
      unmatch: "?"
      change: (params)->
        h = {}
        for key, val of params
          h["#{val}-#{key}"] = true if key? && val? && "String" == ((Url.options[key]?.type) || "String")
        GUI.header Object.keys(h)
        window.requestAnimationFrame ->
          GUI.Layout.resize()

Url.options = LOCATION.options
Url.bind = LOCATION.bind

Url.routes =
  pathname:
    folder: new Url "/:folder/stories"
  search:
    folder: new Url "folder=:folder",
      unmatch: gon?.stories? && "?"

    stories: new Url "stories=:game~:rating~:event~:config~:say_limit~:player_length~:update_at~:update_interval~:search",
      unmatch: gon?.stories? && "?"

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

        Layout.list.buttons?.dx =
          switch params.layout
            when "right", "center"
              12
            when "left"
              -12

Url.define LOCATION.props, LOCATION.bind
Url.routes =
  pathname:
    events: new Url "/:story_id/file"
    story:  new Url "/:story_id.html"

  hash:
    mode: new Url "mode=:icons",
      unmatch: "#"

    css: new Url "css=:theme~:width~:layout~:font",
      cookie:
        time: 12
        path: "/"
      unmatch: "#"
      change: (params)->
        list =
          for key in ["theme", "width", "layout", "font", "w", "item", "color"]
            "#{Url.prop[key]()}-#{key}"
        list.push "no-player" unless Url.prop.human()
        GUI.header list
        window.requestAnimationFrame ->
          GUI.Layout.resize()

  search:
    pin: new Url "pin=:back~:pins",
      unmatch: gon?.events? && "?"

    faces: new Url "faces=:chr_set~:order~:search",
      unmatch: gon?.map_reduce?.faces? && "?"

    folder: new Url "folder=:folder",
      unmatch: gon?.stories? && "?"

    potofs: new Url "potofs=:potofs_order~:potofs_desc~:potofs_hide",
      unmatch: gon?.potofs? && "?"

    stories: new Url "stories=:game~:rating~:event_type~:role_type~:say_limit~:player_length~:update_at~:update_interval~:search",
      unmatch: gon?.stories? && "?"

    messages: new Url "messages=:scope~:home~:talk~:memo~:open~:uniq~:human~:search",
      unmatch: gon?.events? && "?"

    scroll: new Url "scroll=:scroll",
      unmatch: "?"
      change: (params)->
        GUI.ScrollSpy.global.prop = Url.prop.scroll

        [folder, vid, turn, logid] = params.scroll.split("-")
        if logid?
          updated_at = Cache.messages.find(params.scroll)?.updated_at || 0
          Url.prop.updated_at updated_at, true
          Url.prop.event_id  "#{folder}-#{vid}-#{turn}", true
          Url.prop.message_id "#{folder}-#{vid}-#{turn}-#{logid}", true
        return

GUI.TouchMenu.icons.state = Url.prop.icons

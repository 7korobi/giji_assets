Url.define LOCATION.props, LOCATION.bind
Url.routes =
  pathname:
    events: new Url "/:story_id/file"
    event:  new Url "/:story_id/:turn/messages"
    story:  new Url "/:story_id.html"

  hash:
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

    mode: new Url "mode=:scope~:icon",
      unmatch: "#"

    potofs: new Url "ptf=:potofs_order~:potofs_desc~:potofs_hide",
      unmatch: gon?.potofs? && "#"

    pin: new Url "pin=:back~:pins",
      unmatch: gon?.events? && "#"

  search:
    faces: new Url "face=:chr_set~:order~:search",
      unmatch: gon?.map_reduce?.faces? && "?"

    folder: new Url "folder=:folder",
      unmatch: gon?.stories? && "?"

    stories: new Url "story=:game~:rating~:event_type~:role_type~:say_limit~:player_length~:update_at~:update_interval~:search",
      unmatch: gon?.stories? && "?"

    messages: new Url "log=:home~:talk~:memo~:open~:human~:search",
      unmatch: gon?.events? && "?"

    scrolls: new Url "scr=:scroll~:home_at~:talk_at~:memo_at",
      unmatch: "?"
      change: (params)->
        scroll = GUI.ScrollSpy.global.prop()
        [folder, vid, turn, logid] = scroll.split("-")
        if logid?
          updated_at = Cache.messages.find(scroll)?.updated_at || 0
          Url.prop.updated_at updated_at, true
          Url.prop.event_id  "#{folder}-#{vid}-#{turn}", true
          Url.prop.message_id "#{folder}-#{vid}-#{turn}-#{logid}", true
        return

win.on.resize.push ->
  if win.width < 800 && "wide" == Url.prop.width()
    Url.prop.width "std"

  if win.width < 600 && "std"  == Url.prop.width()
    Url.prop.width "mini"

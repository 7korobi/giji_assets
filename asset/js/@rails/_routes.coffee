Url.define URL_PROPS, {}
Url.routes =
  pathname:
    root:   new Url "/"
    faces:  new Url "/map_reduce/faces"
    events: new Url "/:story_id/file"
    event:  new Url "/:story_id/:turn/messages"
    story:  new Url "/stories/:story_id"

  hash:
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

    scroll: new Url "scr=:scroll~:talk_at~:memo_at",
      unmatch: "?"
      change: (params)->
        scroll = win.scroll.prop()
        [folder, vid, turn, logid] = scroll.split("-")
        if logid?
          updated_at = Mem.Query.messages.find(scroll)?.updated_at || 0
          Url.prop.updated_at updated_at
          Url.prop.folder     folder
          Url.prop.turn       turn
          Url.prop.story_id   "#{folder}-#{vid}"
          Url.prop.event_id   "#{folder}-#{vid}-#{turn}"
          Url.prop.message_id "#{folder}-#{vid}-#{turn}-#{logid}"
        return

Url.cookies =
  css: Url.cookie "css=:theme~:width~:layout~:font", time: 12, path: "/"

Url.cookies.css.options.change = (params)->
  list =
    for key in ["theme", "width", "layout", "font", "item", "color"]
      "#{Url.prop[key]()}-#{key}"
  list.push "no-player" unless Url.prop.human()
  GUI.header list

  window.requestAnimationFrame ->
    win.do.layout()

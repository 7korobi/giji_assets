Url.define URL_PROPS

tie = Mem.Query.options.btns Url.params, ["theme", "width", "layout", "font"]
tie.check = ->
  console.log tie.params
Url.tie = tie

Url.routes =
  pathname:
    root:   new Url "/"
    faces:  new Url "/map_reduce/faces"
    events: new Url "/:story_id/file"
    event:  new Url "/:story_id/:turn/messages"
    story:  new Url "/stories/:story_id"

  hash:
    pin: new Url "pin=:back~:pins"
    mode: new Url "mode=:scope~:icon"
    potofs: new Url "ptf=:potofs_order~:potofs_desc~:potofs_hide"

  search:
    faces: new Url "face=:chr_set~:order~:search"
    scroll: new Url "scr=:scroll~:talk_at~:memo_at"
    folder: new Url "folder=:folder"
    stories: new Url "story=:game~:rating~:event_type~:role_type~:say_limit~:player_length~:update_at~:update_interval~:search"
    messages: new Url "log=:home~:talk~:memo~:open~:human~:search"

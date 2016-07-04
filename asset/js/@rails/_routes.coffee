Store.cookie_options =
  time: 7 * 24 * 60 * 60 * 1000
  path: "/"
  secure: false

Url.maps
  pathname:
    root:   "/"
    story:  "/stories/:story_id"
    faces:  "/map_reduce/faces"
    face:   "/map_reduce/faces/:face_id"
    events: "/:story_id/file"
    event:  "/:story_id/:turn/messages"

  hash:
    pin:    "pin=:back~:pins"
    mode:   "mode=:scope~:icon"
    potofs: "ptf=:potofs_order~:potofs_desc~:potofs_hide"

  search:
    faces:    "face=:chr_set~:order~:search"
    scroll:   "scr=:scroll~:talk_at~:memo_at"
    folder:   "folder=:folder"
    stories:  "story=:game~:rating~:event_type~:role_type~:say_limit~:player_length~:update_at~:update_interval~:search"
    messages: "log=:home~:talk~:memo~:open~:human~:search"

Store.maps
  session: ["theme", "width", "layout", "font"]

Url.tie = InputTie.btns Url.params, ["theme", "width", "layout", "font"]

Url.conf.scroll.current = true

WebStore.cookie_options =
  time: 7 * 24 * 60 * 60 * 1000
  path: "/"
  secure: false

Url.maps
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

WebStore.maps
  session: ["theme", "width", "layout", "font"]

Url.tie = InputTie.btns Url.params, ["theme", "width", "layout", "font"]

Url.conf.scroll.current = true

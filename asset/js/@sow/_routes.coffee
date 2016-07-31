WebStore.cookie_options =
  time: 7 * 24 * 60 * 60 * 1000
  path: "/sow.cgi"
  secure: false

Url.define = (key)->
    Mem.Query.stores.hash[key]

Url.maps
  pathname:
    story:  "/sow.cgi"

  hash:
    pin:    "pin=:back~:pins"
    mode:   "mode=:scope~:icon"
    potofs: "ptf=:potofs_order~:potofs_desc~:potofs_hide"

  search:
    village:  "vid=:vid"
    messages: "log=:home~:talk~:memo~:open~:human~:search"
    scroll:   "scr=:scroll~:talk_at~:memo_at"

Url.conf.scroll.current = true
Url.tie = InputTie.btns Url.params, ["theme", "width", "layout", "font"]

WebStore.maps
  session: ["theme", "width", "layout", "font"]
  cookie:  ["uid", "pwd"]




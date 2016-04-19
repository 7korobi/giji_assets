Url.define URL_PROPS

tie = Mem.Query.options.btns Url.params, ["theme", "width", "layout", "font"]
tie.check = ->
  console.log tie.params
Url.tie = tie

Url.routes =
  pathname:
    story: new Url "/sow.cgi"

  hash:
    pin: new Url "pin=:back~:pins"
    mode: new Url "mode=:scope~:icon"
    potofs: new Url "ptf=:potofs_order~:potofs_desc~:potofs_hide"

  search:
    messages: new Url "log=:home~:talk~:memo~:open~:human~:search"
    scroll: new Url "scr=:scroll~:talk_at~:memo_at"

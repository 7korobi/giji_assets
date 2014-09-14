Url.cookie = ["css"]
Url.search = ["story", "timer"]
Url.hash = ["messages", "news", "all", "page", "hides", "search", "potof", "css", "timer"]
Url.options = LOCATION.options
Url.bind = LOCATION.bind

Url.routes =
  story: new Url "/on/:story_id"
  timer: new Url "timer=:viewed_at"

  messages: new Url "/:event_id/messages/:message_ids/"
  news:     new Url "/:event_id/:mode_id/news/:row/"
  all:      new Url "/:event_id/:mode_id/all/"
  page:     new Url "/:event_id/:mode_id/:page.of.:row/"

  hides:  new Url "/hides/:hide_ids"
  search: new Url "/search/:search"

  potof: new Url "/potof/:potofs_order"

  css: new Url "/css-:theme-:width-:layout-:font", (params)->
    @style_p ||= ""
    h = {}
    for key, val of params
      h["#{val}-#{key}"] = true if key? && val? && "String" == ((Url.options[key]?.type) || "String")
    style = Object.keys(h).join(" ")

    html = document.documentElement
    html.className = html.className.replace @style_p, style
    @style_p = style


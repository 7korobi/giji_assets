LOCATION.pathname = []
LOCATION.cookie = ["css"]
LOCATION.search = ["story", "timer"]
LOCATION.hash = ["messages", "news", "all", "page", "hides", "search", "potof", "css"]

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

  css: new Url "/css.:theme.:width.:layout.:font",
    el: "html"
    ready: ->
      style_p = ""
      @$watch 'url', =>
        html = document.documentElement
        html.className = html.className.replace style_p, @style
        style_p = @style
    computed:
      style: ->
        h = {}
        for key in @params
          val = @url[key]
          h["#{val}-#{key}"] = true if key? && val? && String == LOCATION.options[key].type
        Object.keys(h).join(" ")

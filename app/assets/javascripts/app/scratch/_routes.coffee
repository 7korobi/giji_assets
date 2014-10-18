Url.options = LOCATION.options
Url.bind = LOCATION.bind

Url.routes =
  hash:
    story: new Url "/on/:story_id"
    timer: new Url "timer=:viewed_at"

    messages: new Url "/:event_id/messages/:message_ids/"
    news:     new Url "/:event_id/:mode_id/news/:row/"
    all:      new Url "/:event_id/:mode_id/all/"
    page:     new Url "/:event_id/:mode_id/:page.of.:row/"

    hides:  new Url "/hides/:hide_ids"
    search: new Url "/search/:search"

    potof: new Url "/potof/:potofs_order"

  search:
    css: new Url "css=:theme~:width~:layout~:font",
      unmatch: "?"
      change: (params)->
        h = {}
        for key, val of params
          h["#{val}-#{key}"] = true if key? && val? && "String" == ((Url.options[key]?.type) || "String")
        GUI.header Object.keys(h)

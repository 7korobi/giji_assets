Url.define URL_PROPS

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

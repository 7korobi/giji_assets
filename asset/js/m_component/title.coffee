doc.component.title =
  controller: ->
    html = document.querySelector "html"
    meta = document.querySelector "meta[name=viewport]"

    WebStore.copyTo Url
    Url.popstate()

    params = Url.params
    old_snap = ""

    @scroll_adjust = ->
      scroll = win.scroll.prop()
      return unless scroll
      updated_at = Mem.Query.messages.find(scroll)?.updated_at || 0
      Url.params.scroll = scroll
      Url.params.updated_at = updated_at

      [folder, vid, turn, logid] = scroll.split("-")
      return unless logid?

      Url.params.folder     = folder
      Url.params.turn       = turn
      Url.params.story_id   = "#{folder}-#{vid}"
      Url.params.event_id   = "#{folder}-#{vid}-#{turn}"
      Url.params.message_id = "#{folder}-#{vid}-#{turn}-#{logid}"

    @refresh = ->
      @scroll_adjust()

      Url.replacestate()
      WebStore.copyBy Url

      base_style = html.className.replace(old_snap, "").trim()
      list =
        for key in ["theme", "width", "layout", "font", "item", "color"]
          "#{params[key]}-#{key}"
      list.push "no-player" unless params.human
      old_snap = list.join " "

      list.push base_style
      html.className = list.join " "

      meta.content = head.browser.viewport =
        if win.short < 380
          "width=device-width, maximum-scale=2.0, minimum-scale=0.5, initial-scale=0.5"
        else
          "width=device-width, maximum-scale=4.0, minimum-scale=1.0, initial-scale=1.0"

      window.requestAnimationFrame ->
        win.do.layout()
    return

  view: (c)->
    c.refresh()

    {story_id, event_id} = Url.params
    story = Mem.Query.storys.find story_id
    event = Mem.Query.events.find event_id
    if story? && event?
      "#{story.name} #{event.name}"
    else
      "人狼議事"

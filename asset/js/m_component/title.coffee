doc.component.title =
  controller: ->
    params = Url.params
    html = document.querySelector "html"
    meta = document.querySelector "meta[name=viewport]"

    old_snap = ""
    @refresh = ->
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

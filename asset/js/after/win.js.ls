win.scroll.prop = Url.prop.scroll
win.scroll.tick = (center, sec)->
  if center.subid == "S"
    doc.seeing_add center._id, sec
    if 25 == doc.seeing[center._id]
      m.redraw()

win.on.resize.push ->
  if win.short < 380
    head.browser.viewport = "width=device-width, maximum-scale=2.0, minimum-scale=0.5, initial-scale=0.5"
    document.querySelector("meta[name=viewport]")?.content = head.browser.viewport

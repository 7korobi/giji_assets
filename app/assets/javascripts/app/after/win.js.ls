win.scroll = new ScrollSpy(Url.prop.scroll)
win.scroll.tick = (center, sec)->
  if center.subid == "S"
    doc.seeing_add center._id, sec
    if 25 == doc.seeing[center._id]
      m.redraw()


win.on.scroll_end.push Layout.move
win.on.scroll_end.push ->
  ScrollSpy.capture()

win.on.resize.push Layout.move

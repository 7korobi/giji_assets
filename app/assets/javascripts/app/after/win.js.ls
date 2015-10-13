win.scroll = new ScrollSpy(Url.prop.scroll)
win.scroll.tick = (center, sec)->
  if center.subid == "S"
    doc.seeing_add center._id, sec
    if 25 == doc.seeing[center._id]
      m.redraw()
win.on.scroll_end.push ->
  ScrollSpy.capture()

win.on.resize.push ->
  width = document.querySelector(\#contentframe).offsetWidth

  Url.prop.content_width width
  Url.prop.h1_width 770
  Url.prop.h1_width 580 if width <= 580
  Url.prop.h1_width 458 if width <= 458

  switch Url.prop.layout()
    when "right"
      Url.prop.right_width 0
    when "center"
      Url.prop.right_width (win.width - width - 4) / 2
    when "left"
      Url.prop.right_width (win.width - width - 4)

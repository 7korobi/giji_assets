hour = 1000 * 60 * 60
h1_width = 770
day_or_night = 0

Timer.tick (now)->
  zone = now + 3*hour # means - 6hours base. (GMT is - 9 hours)
  day_or_night = Math.floor(zone / (12*hour)) % 2

  m.redraw()
  12*hour - zone % (12*hour)

win.on.resize.push ->
  width = doc.width.content()

  h1_width = 770
  h1_width = 580 if width <= 580
  h1_width = 458 if width <= 458

doc.view.banner = ->
  theme = Mem.conf.theme[Url.prop.theme()]
  m 'a[href="//giji.check.jp/"]',
    m "img",
      src: GUI.img_head + "/banner/title#{h1_width}" + theme.width[h1_width][day_or_night]

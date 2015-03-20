if head.browser?
  b = head.browser
  b.viewport = "width=device-width, maximum-scale=4.0, minimum-scale=1.0, initial-scale=1.0"

  if navigator.userAgent.toLowerCase().indexOf('windows') != -1
    b.win = true

  if navigator.userAgent.toLowerCase().indexOf('macintosh') != -1
    b.mac = true

  if navigator.userAgent.toLowerCase().indexOf('android') != -1
    b.android = true

head.useragent = navigator.userAgent

# ["feature", "js", "browser", "screen", "load", "test", "ready", "useragent", "domloaded"]
# desktop - mobile
# portrait - landscape
# gradient rgba opacity textshadow multiplebgs boxshadow borderimage borderradius cssreflections csstransforms csstransitions touch retina fontface

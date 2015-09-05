if head.browser?
  b = head.browser
  b.viewport = "width=device-width, maximum-scale=4.0, minimum-scale=1.0, initial-scale=1.0"

  if 'windows' in navigator.userAgent.toLowerCase()
    b.win = true

  if 'macintosh' in navigator.userAgent.toLowerCase()
    b.mac = true

  if 'android' in navigator.userAgent.toLowerCase()
    b.android = true

head.useragent = navigator.userAgent

# ["feature", "js", "browser", "screen", "load", "test", "ready", "useragent", "domloaded"]
# desktop - mobile
# portrait - landscape
# gradient rgba opacity textshadow multiplebgs boxshadow borderimage borderradius cssreflections csstransforms csstransitions touch retina fontface

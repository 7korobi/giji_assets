if head.browser?
  b = head.browser
  b.viewport = "width=device-width, initial-scale=1.0"

  if navigator.userAgent.toLowerCase().indexOf('windows') != -1
    b.win = true

  if navigator.userAgent.toLowerCase().indexOf('macintosh') != -1
    b.mac = true

  if navigator.userAgent.toLowerCase().indexOf('android') != -1
    b.android = true

  if navigator.userAgent.toLowerCase().indexOf('iphone') != -1
    b.viewport = "width=device-width, initial-scale=0.5"

document.querySelector("meta[name=viewport]")?.attributes.content = head.browser.viewport

head.useragent = navigator.userAgent

# ["feature", "js", "browser", "screen", "load", "test", "ready", "useragent", "domloaded"]
# desktop - mobile
# portrait - landscape
# gradient rgba opacity textshadow multiplebgs boxshadow borderimage borderradius cssreflections csstransforms csstransitions touch retina fontface

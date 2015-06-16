

if "onorientationchange" of window
  window.addEventListener 'orientationchange', win.do.scroll
else
  window.addEventListener 'resize', win.do.scroll

window.addEventListener 'scroll', win.do.scroll

if "ondeviceorientation" of window
  window.addEventListener 'deviceorientation', win.do.orientation
if "ondevicemotion" of window
  window.addEventListener 'devicemotion', win.do.motion

if "onhashchange" of window
  window.addEventListener "hashchange", (event)->
    if event.clipboardData
      console.log event
    else
      Url.popstate()

if "onpopstate" of window
  window.addEventListener "popstate", (event)->
    if event.clipboardData
      console.log event
    else
      Url.popstate()

  unless head.browser.safari
    Url.popstate()

if "onmessage" of window
  window.addEventListener "message", (event)->
    console.log "on message"

if "onoffline" of window
  window.addEventListener "offline", (event)->
    console.log "on offline  onLine:#{navigator.onLine}"

if "ononline" of window
  window.addEventListener "online", (event)->
    console.log "on online  onLine:#{navigator.onLine}"

if "onstorage" of window
  window.addEventListener "storage", (event)->
    console.log "on storage"

if "onload" of window
  window.addEventListener "load", win.do.load

win.do.resize()
m.endComputation()

with_throttle = (cb, delay)->
  _.throttle cb, delay,
    leading: false
    trailing: true
if "onorientationchange" of window
  window.addEventListener 'orientationchange', -> window.requestAnimationFrame(win.do.resize)
  window.addEventListener 'orientationchange', with_throttle(win.do.scroll, DELAY.lento)
else
  window.addEventListener 'resize', -> window.requestAnimationFrame(win.do.resize)
  window.addEventListener 'resize', with_throttle(win.do.scroll, DELAY.lento)

window.addEventListener 'scroll', -> window.requestAnimationFrame(win.do.scroll)
window.addEventListener 'scroll', with_throttle(win.do.resize, DELAY.lento)
if "ondevicemotion" of window
  window.addEventListener 'devicemotion', -> window.requestAnimationFrame(win.do.motion)

if "ongesturestart" of window
  window.addEventListener 'gesturestart', with_throttle(win.do.start, DELAY.presto)
  window.addEventListener 'gesturechange', with_throttle(win.do.move, DELAY.presto)
  window.addEventListener 'gestureend', with_throttle(win.do.end, DELAY.presto)

if "ontouchstart" of window
  window.addEventListener 'touchstart', with_throttle(win.do.start, DELAY.presto)
  window.addEventListener 'touchmove', with_throttle(win.do.move, DELAY.presto)
  window.addEventListener 'touchend', with_throttle(win.do.end, DELAY.presto)
else
  window.addEventListener 'mousedown', with_throttle(win.do.start, DELAY.presto)
  window.addEventListener 'mousemove', with_throttle(win.do.move, DELAY.presto)
  window.addEventListener 'mouseup',   with_throttle(win.do.end, DELAY.presto)

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
    console.log "on offline"

if "ononline" of window
  window.addEventListener "online", (event)->
    console.log "on online"

if "onstorage" of window
  window.addEventListener "storage", (event)->
    console.log "on storage"

if "onload" of window
  window.addEventListener "load", win.do.load

win.on.scroll.push GUI.ScrollSpy.scroll
win.on.resize.push GUI.Layout.resize

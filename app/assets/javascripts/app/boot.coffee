if "onorientationchange" of window
  window.addEventListener 'orientationchange', -> window.requestAnimationFrame(win.do.resize)
  window.addEventListener 'orientationchange', _.throttle(win.do.scroll, DELAY.lento)
else
  window.addEventListener 'resize', -> window.requestAnimationFrame(win.do.resize)
  window.addEventListener 'resize', _.throttle(win.do.scroll, DELAY.lento)

window.addEventListener 'scroll', -> window.requestAnimationFrame(win.do.scroll)
window.addEventListener 'scroll', _.throttle(win.do.resize, DELAY.lento)
if "ondevicemotion" of window
  window.addEventListener 'devicemotion', -> window.requestAnimationFrame(win.do.motion)

if "ongesturestart" of window
  window.addEventListener 'gesturestart', _.throttle(win.do.start, DELAY.presto)
  window.addEventListener 'gesturechange', _.throttle(win.do.move, DELAY.presto)
  window.addEventListener 'gestureend', _.throttle(win.do.end, DELAY.presto)

if "ontouchstart" of window
  window.addEventListener 'touchstart', _.throttle(win.do.start, DELAY.presto)
  window.addEventListener 'touchmove', _.throttle(win.do.move, DELAY.presto)
  window.addEventListener 'touchend', _.throttle(win.do.end, DELAY.presto)
else
  window.addEventListener 'mousedown', _.throttle(win.do.start, DELAY.presto)
  window.addEventListener 'mousemove', _.throttle(win.do.move, DELAY.presto)
  window.addEventListener 'mouseup',   _.throttle(win.do.end, DELAY.presto)

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

scroll = -> GUI.ScrollSpy.scroll()
win.on.scroll.push _.debounce scroll, DELAY.animato

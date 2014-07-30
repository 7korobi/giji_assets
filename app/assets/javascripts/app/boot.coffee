if "onorientationchange" of window
  $(window).on 'orientationchange', _.throttle(win.do.resize, DELAY.presto)
  $(window).on 'orientationchange', _.throttle(win.do.scroll, DELAY.lento)
else
  $(window).on 'resize', _.throttle(win.do.resize, DELAY.presto)
  $(window).on 'resize', _.throttle(win.do.scroll, DELAY.lento)

$(window).on 'scroll', _.throttle(win.do.scroll, DELAY.presto)
$(window).on 'scroll', _.throttle(win.do.resize, DELAY.lento)

if "ondevicemotion" of window
  $(window).on 'devicemotion', _.throttle(win.do.motion, DELAY.presto)

if "ongesturestart" of window
  $(window).on 'gesturestart', _.throttle(win.do.start, DELAY.presto)
  $(window).on 'gesturechange', _.throttle(win.do.move, DELAY.presto)
  $(window).on 'gestureend', _.throttle(win.do.end, DELAY.presto)

if "ontouchstart" of window
  $(window).on 'touchstart', _.throttle(win.do.start, DELAY.presto)
  $(window).on 'touchmove', _.throttle(win.do.move, DELAY.presto)
  $(window).on 'touchend', _.throttle(win.do.end, DELAY.presto)
else
  $(window).on 'mousedown', _.throttle(win.do.start, DELAY.presto)
  $(window).on 'mousemove', _.throttle(win.do.move, DELAY.presto)
  $(window).on 'mouseup',   _.throttle(win.do.end, DELAY.presto)

if "onhashchange" of window
  $(window).on "hashchange", (event)->
    if event.clipboardData
      console.log event
    else
      Url.popstate()

if "onpopstate" of window
  $(window).on "popstate", (event)->
    if event.clipboardData
      console.log event
    else
      Url.popstate()

  unless head.browser.safari
    Url.popstate()


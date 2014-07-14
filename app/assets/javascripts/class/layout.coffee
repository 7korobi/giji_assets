win =
  do:
    resize: (e)->
      win.height = window.innerHeight || $(window).height()
      win.width = window.innerWidth || $(window).width()
      win.max =
        top:  $('body').height() - win.height
        left: $('body').width()  - win.width
      #console.log ["resize", e]
      cb() for cb in win.on.resize

    scroll: (e)->
      win.left = window.pageXOffset
      win.top  = window.pageYOffset
      win.left = win.max.left if win.max.left < win.left
      win.top  = win.max.top  if win.max.top  < win.top
      win.left = 0            if                win.left  < 0
      win.top  = 0            if                win.top   < 0

      #console.log ["scroll", e]
      cb() for cb in win.on.scroll

    gesture: (e)->
      #console.log ["touch-gesture", e]
      cb() for cb in win.on.gesture

    motion: (e)->
      win.accel   = e.originalEvent.acceleration
      win.gravity = e.originalEvent.accelerationIncludingGravity
      win.rotate  = e.originalEvent.rotationRate
      #console.log ["touch-motion", e]
      cb() for cb in win.on.motion

    start: (e)->
      win.is_tap = true
      #console.log ["touch-start", e]
      cb() for cb in win.on.start

    move: (e)->
      if win.is_tap
        #console.log ["touch-drag", e]
        cb() for cb in win.on.drag
      else
        #console.log ["touch-move", e]
        cb() for cb in win.on.move

    end: (e)->
      win.is_tap = false
      #console.log ["touch-end", e]
      cb() for cb in win.on.end

  on:
    resize: []
    scroll: []
    gesture: []
    motion: []
    start: []
    move: []
    drag: []
    end: []

  top:    0
  left:   0
  width:  0
  height: 0

  accel:   0
  gravity: 0
  rotate:  0

  is_tap: false

  max:
    top:  0
    left: 0


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


class FixedBox
  @list = {}

  @push = ($, dx, dy, key)->
    @list[key] or= new FixedBox dx, dy, $(key)

  constructor: (dx, dy, fixed_box)->
    @dx = dx
    @dy = dy
    @box = fixed_box

    if @box
      win.on.resize.push(=> @resize())
      win.on.scroll.push(=> @scroll())

  resize: ()->
    return unless @box
    width  = win.width  - @box.width()
    height = win.height - @box.height()

    @left = @dx + width if @dx < 0
    @left = @dx         if   0 < @dx
    @top = @dy + height if @dy < 0
    @top = @dy          if   0 < @dy

  scroll: ()->
    return unless @box && head.browser.power != "simple"
    @box.css
      "z-index": (new Date).getTime()
      position: "fixed"

    if 0 == @dx
      @box.css
        top: 0
        left: ""
        width: @box.parent().width()
    else
      @box.css
        top:  0
        left: 0

    left = @left + win.left
    top  = @top
    @translate(left, top)

  translate: (left, top)->
    transform  = "translate(#{left}px, #{top}px)"
    @box.css "-webkit-transform",  transform  if head.browser.webkit
    @box.css "-moz-transform",   transform  if head.browser.mozilla
    @box.css "-ms-transform",  transform  if head.browser.ie
    @box.css "-o-transform", transform  if head.browser.opera
    @box.css "transform",  transform



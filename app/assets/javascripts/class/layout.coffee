win =
  do:
    resize: (e)->
      win.height = Math.max window.innerHeight, document.documentElement.clientHeight
      win.width  = Math.max window.innerWidth,  document.documentElement.clientWidth
      body_height = Math.max document.body.clientHeight , document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight
      body_width =  Math.max document.body.clientWidth,   document.body.scrollWidth,  document.documentElement.scrollWidth,  document.documentElement.clientWidth
      win.max =
        top:  body_height - win.height
        left: body_width  - win.width
      if win.height > win.width
        win.landscape = false
        win.portlate = true
      else
        win.landscape = true
        win.portlate = false

      #console.log ["resize", e]
      cb(e) for cb in win.on.resize

    scroll: (e)->
      win.left = window.pageXOffset
      win.top  = window.pageYOffset
      win.left = Math.max 0, Math.min win.max.left, win.left
      win.top  = Math.max 0, Math.min win.max.top,  win.top

      #console.log ["scroll", e]
      cb(e) for cb in win.on.scroll

    gesture: (e)->
      #console.log ["touch-gesture", e]
      cb(e) for cb in win.on.gesture

    motion: (e)->
      win.accel   = e.acceleration
      win.gravity = e.accelerationIncludingGravity
      win.rotate  = e.rotationRate
      #console.log ["touch-motion", e]
      cb(e) for cb in win.on.motion

    start: (e)->
      win.is_tap = true
      #console.log ["touch-start", e]
      cb(e) for cb in win.on.start

    move: (e)->
      if win.is_tap
        #console.log ["touch-drag", e]
        cb(e) for cb in win.on.drag
      else
        #console.log ["touch-move", e]
        cb(e) for cb in win.on.move

    end: (e)->
      win.is_tap = false
      #console.log ["touch-end", e]
      cb(e) for cb in win.on.end

    load: ->
      cb() for cb in win.on.load
  on:
    resize: []
    scroll: []
    gesture: []
    motion: []
    start: []
    move: []
    drag: []
    end: []
    load: []

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



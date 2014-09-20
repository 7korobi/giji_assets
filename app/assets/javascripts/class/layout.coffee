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
      win.do.resize()
      win.do.scroll()

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


class Layout
  @list = {}

  constructor: (@dx, @dy, @box)->
    if @box
      win.on.resize.push => @resize()
      win.on.scroll.push => @scroll()
      Layout.list[@box.id] = @
      @box.style.position = "fixed"

  resize: ()->
    return unless @box && head.browser.power != "simple"
    width  = win.width  - @box.offsetWidth
    height = win.height - @box.offsetHeight

    @left = @dx + width if @dx < 0
    @left = @dx         if   0 < @dx
    @top = @dy + height if @dy < 0
    @top = @dy          if   0 < @dy

    @box.style.zIndex = _.now()

    if 0 == @dx
      @box.style.top = 0
      @box.style.left = null
      @box.style.width = @box.parentElement.offsetWidth
    else
      @box.style.top = 0
      @box.style.left = 0

    left = @left + win.left
    top  = @top
    @translate(left, top)

  scroll: ()->

  translate: (left, top)->
    transform  = "translate(#{left}px, #{top}px)"
    @box.style.webkitTransform = transform if head.browser.safari || head.browser.webkit
    @box.style.mozTransform = transform if head.browser.mozilla
    @box.style.msTransform = transform if head.browser.ie
    @box.style.oTransform = transform if head.browser.opera
    @box.style.transform = transform




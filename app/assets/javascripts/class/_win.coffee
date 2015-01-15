win = (->
  set_scroll = (win)->
    win.left = window.pageXOffset || window.scrollX
    win.top  = window.pageYOffset || window.scrollY

  scroll_end = ->
    chk = ->
      3 == list.length && list[0].left == list[1].left == list[2].left && list[0].top == list[1].top == list[2].top
    scan = ->
      list.shift if 3 <= list.length
      list.push val = {}
      set_scroll(val)
      if chk()
        win.do_event_list win.on.scroll_end
        win.do.resize()
      window.requestAnimationFrame scan

    list = []
    scan()



  do_event_list: (list, e)->
    return unless list.length
    cb(e) for cb in list

  do:
    resize: (e)->
      docElem = document.documentElement
      docBody = document.body

      win.height = Math.max window.innerHeight, docElem.clientHeight
      win.width  = Math.max window.innerWidth,  docElem.clientWidth
      win.horizon = win.height / 2
      body_height = Math.max docBody.clientHeight , docBody.scrollHeight, docElem.scrollHeight, docElem.clientHeight
      body_width  = Math.max docBody.clientWidth,   docBody.scrollWidth,  docElem.scrollWidth,  docElem.clientWidth
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
      win.do_event_list win.on.resize, e

    scroll_end: _.debounce scroll_end, DELAY.presto
    scroll: (e)->
      docElem = document.documentElement
      set_scroll win
      win.right = win.left + win.width
      win.bottom = win.top + win.height

      win.do_event_list win.on.scroll, e
      win.do.scroll_end()

    orientation: (e)->
      win.orientation = e
      win.compass = e.webkitCompassHeading
      win.do_event_list win.on.orientation, e

    motion: (e)->
      win.accel   = e.acceleration
      win.gravity = e.accelerationIncludingGravity
      win.rotate  = e.rotationRate
      win.do_event_list win.on.motion, e

    load: (e)->
      win.do_event_list win.on.load, e
      win.do.resize()
      win.do.scroll()

  on:
    resize: []
    scroll: []
    scroll_end: []
    orientation: []
    motion: []
    load: []

  top:     0
  horizon: 0
  bottom:  0
  left:    0
  right:   0
  width:   0
  height:  0

  accel: {}
  rotate: {}
  gravity: {}
  orientation: {}
  compass: 0

  is_tap: false

  max:
    top:  0
    left: 0
)()


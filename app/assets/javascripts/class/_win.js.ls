  set_scroll = (win)->
    win.left = window.pageXOffset || window.scrollX
    win.top  = window.pageYOffset || window.scrollY

  scroll_end = !->
    return if win.scrolling
    check = {}
    count = 0

    chk = ->
      local = {}
      set_scroll local

      if check.top == local.top && check.left == local.left
        10 < count++
      else
        check := local
        count := 0
        false

    scan = !->
      if chk()
        console.log "scroll end."
        win.scrolling = false
        win.do_event_list win.on.scroll_end
        win.do.resize()
      else
        window.requestAnimationFrame scan

    scan()


  export win =
    do_event_list: (list, e)!->
      return unless 0 < list.length
      for cb in list
        cb(e)

    do:
      resize: (e)->
        docElem = document.documentElement
        docBody = document.body

        win.height = Math.max window.innerHeight, docElem.clientHeight
        win.width  = Math.max window.innerWidth,  docElem.clientWidth

        if win.width < 380 || win.height < 380
          head.browser.viewport = "width=device-width, maximum-scale=2.0, minimum-scale=0.5, initial-scale=0.5"
          document.querySelector("meta[name=viewport]")?.content = head.browser.viewport

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

      scroll_end: scroll_end

      scroll: (e)->
        docElem = document.documentElement

        set_scroll win
        win.right = win.left + win.width
        win.bottom = win.top + win.height

        unless win.scrolling
          win.do_event_list win.on.scroll_start
        win.do.scroll_end()
        win.scrolling = true

        win.do_event_list win.on.scroll, e

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
      scroll_start: []
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

/*
Win v0.0.1
http://github.com/7korobi/---
(c) 7korobi
License: MIT
*/

set_scroll = (win)->
  win.left = window.scrollX
  win.top  = window.scrollY

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
      short = Math.min docElem.clientWidth, docElem.clientHeight
      win.width = docElem.clientWidth

      if short < 380
        head.browser.viewport = "width=device-width, maximum-scale=2.0, minimum-scale=0.5, initial-scale=0.5"
        document.querySelector("meta[name=viewport]")?.content = head.browser.viewport

      if window.innerHeight > window.innerWidth
        win.landscape = false
        win.portlate = true
      else
        win.landscape = true
        win.portlate = false

      #console.log ["resize", e]
      win.do_event_list win.on.resize, e

    scroll_end: scroll_end

    scroll: (e)->
      set_scroll win
      win.height = window.innerHeight
      win.right = win.left + window.innerWidth
      win.bottom = win.top + win.height
      win.horizon = win.height / 2

      unless win.scrolling
        win.do_event_list win.on.scroll_start, e
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

  height:  0
  width:   0

  scroll: null

  accel: {}
  rotate: {}
  gravity: {}
  orientation: {}
  compass: 0

  is_tap: false

  deploy: ->
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

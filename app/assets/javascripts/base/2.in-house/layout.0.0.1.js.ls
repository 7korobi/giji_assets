/*
layout v0.0.1
http://github.com/7korobi/---
(c) 7korobi
License: MIT
*/

export class Layout
  @list = {}
  @move = ->
    for key, o of Layout.list
      o.translate()

  move = (cb)->
    w = @width  || @box.offsetWidth
    h = @height || @box.offsetHeight

    if @dx
      x = @dx
    else
      @width = @box.parentElement.offsetWidth
      x = @box.parentElement.offsetLeft

    if @dy
      y = @dy

    cb x, y, w, h,
      top: win.top
      left: win.left
      width: win.width
      height: win.height

  (@box, @dx, @dy, dz, @absolute = false, @duration = DELAY.animato)->
    return unless @box

    @duration /= 4 if @absolute

    Layout.list[@box.id] = @
    @box.style.zIndex = dz
    @mode = "show"

    @from = @hide()
    @transform @from
    @transition()


  show: ->
    move.call @, (x, y, w, h, win)->
      x += win.width  - w if x < 0
      y += win.height - h if y < 0
      {x, y, w, h, win}

  hide: ->
    move.call @, (x, y, w, h, win)->
      x = - x +
        switch
          when 0 < x then - w
          when x < 0 then win.width
      y = - y +
        switch
          when 0 < y then - h
          when y < 0 then win.height
      {x, y, w, h, win}

  transform: ({x, y})->
    @box.style.width  = "#{@width}px"  if @width
    @box.style.height = "#{@height}px" if @height

    if @absolute
      @box.style.position = "absolute"
      @box.style.left = "#{x + win.left}px"
      @box.style.top = "#{y + win.top}px"
      @box.style.webkitTransform = ""
      @box.style.mozTransform = ""
      @box.style.msTransform = ""
      @box.style.oTransform = ""
      @box.style.transform = ""
    else
      @box.style.position = "fixed"
      @box.style.left = 0
      @box.style.top = 0

      transform  = "translate(#{x}px, #{y}px)"
      @box.style.webkitTransform = transform
      @box.style.mozTransform = transform if head.browser.ff
      @box.style.msTransform = transform if head.browser.ie
      @box.style.oTransform = transform if head.browser.opera
      @box.style.transform = transform

  transition: ->
    trans =
      if @duration && ! @absolute
        "all #{@duration}ms ease-in-out 0"
      else
        ""

    @box.style.mozTransition = trans if head.browser.ff
    @box.style.msTransition = trans if head.browser.ie
    @box.style.oTransition = trans if head.browser.opera
    @box.style.transition = trans

  translate: ->
    to = @[@mode]()
    return if _.isEqual(@from, to)

    @transform(to)

    setTimeout ~>
      @from = to
      @translate()
    , @duration

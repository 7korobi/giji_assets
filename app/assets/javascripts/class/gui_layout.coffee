class GUI.Layout
  @list: {}
  @resize: ->
    for key, o of GUI.Layout.list
      o.translate()
  win.on.resize.push @resize

  constructor: (@box, @dx, @dy, dz, @absolute = false, @duration = DELAY.andante)->
    return unless @box

    GUI.Layout.list[@box.id] = @
    @box.style.zIndex = dz
    @mode = "show"

    @from = @hide()
    @transform @from
    @transition()

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
      @box.style.top = 0
      @box.style.left = 0

      transform  = "translate(#{x}px, #{y}px)"
      @box.style.webkitTransform = transform
      @box.style.mozTransform = transform if head.browser.ff
      @box.style.msTransform = transform if head.browser.ie
      @box.style.oTransform = transform if head.browser.opera
      @box.style.transform = transform


  transition: ()->
    transition = 
      if @duration && ! @absolute
        "all #{@duration}ms ease-in-out 0"
      else
        ""
    @box.style.mozTransition = transition if head.browser.ff
    @box.style.msTransition = transition if head.browser.ie
    @box.style.oTransition = transition if head.browser.opera
    @box.style.transition = transition

  translate: ->
    return unless @box

    to = @[@mode]()
    return if _.isEqual(@from, to)

    @transform(to)

    duration = @duration
    duration /= 4 if @absolute
    setTimeout =>
      @from = to
      @translate()
    , duration





class GUI.Layout
  @list: {}
  @resize: ->
    for key, o of GUI.Layout.list
      o.translate()
  win.on.resize.push @resize

  constructor: (@dx, @dy, @box, @animation = ->)->
    return unless @box

    GUI.Layout.list[@box.id] = @
    @mode = "show"
    @box.style.zIndex = _.now()

  show: ->
    width  = win.width  - @box.offsetWidth
    height = win.height - @box.offsetHeight

    left = @box.parentElement.offsetLeft if 0 == @dx
    left = @dx + width if @dx < 0
    left = @dx         if   0 < @dx
    top = @dy + height if @dy < 0
    top = @dy          if   0 < @dy

    x: left
    y: top
    w: @box.offsetWidth
    h: @box.offsetHeight
    win:
      left: win.left
      top: win.top

  hide: ->
    left = @box.parentElement.offsetLeft if 0 == @dx
    left = - @dx + win.width        if @dx < 0
    left = - @dx - @box.offsetWidth if   0 < @dx
    top = - @dy + win.height        if @dy < 0
    top = - @dy - @box.offsetHeight if   0 < @dy

    x: left
    y: top
    w: @box.offsetWidth
    h: @box.offsetHeight
    win:
      left: win.left
      top: win.top

  transform: ({x, y})->
    if 0 == @dx
      @box.style.width = "#{@box.parentElement.offsetWidth}px"

    if head.browser.ios
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


  transition: (@duration)->
    if head.browser.ios
      @duration /= 4
      return

    transition = 
      if @duration
        "all #{@duration}ms ease-in-out 0"
      else
        ""
    @box.style.mozTransition = transition if head.browser.ff
    @box.style.msTransition = transition if head.browser.ie
    @box.style.oTransition = transition if head.browser.opera
    @box.style.transition = transition

  translate: ->
    return unless @box
    unless @from
      window.requestAnimationFrame =>
        @transition DELAY.andante
        @translate()
      @from = @hide()
      @transform @from
      return

    to = @[@mode]()
    return if @from.x == to.x && @from.y == to.y && @from.w == to.w && @from.h == to.h && @from.win.left == win.left && @from.win.top == win.top

    @transform(to)

    setTimeout =>
      @from = to
      @translate()
    , @duration





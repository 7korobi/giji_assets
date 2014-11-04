class GUI.Layout
  @list: {}
  @resize: ->
    for key, o of GUI.Layout.list
      o.translate()

  constructor: (@dx, @dy, @box, @animation = ->)->
    return unless @box

    GUI.Layout.list[@box.id] = @
    @mode = "show"
    @box.style.position = "fixed"
    @box.style.top = 0
    @box.style.left = 0
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

  transform: ({x, y})->
    if 0 == @dx
      @box.style.width = "#{@box.parentElement.offsetWidth}px"

    transform  = "translate(#{x}px, #{y}px)"
    @box.style.webkitTransform = transform
    @box.style.msTransform = transform if head.browser.ie
    @box.style.oTransform = transform if head.browser.opera
    @box.style.transform = transform

  transition: (@duration)->
    transition = 
      if @duration
        "all #{duration}ms ease-in-out 0"
      else
        ""
    @box.style.webkitTransition = transition
    @box.style.msTransition = transition if head.browser.ie
    @box.style.oTransition = transition if head.browser.opera
    @box.style.transition = transition

  translate: ->
    return unless @box
    unless @from
      window.requestAnimationFrame =>
        @transition DELAY.andante
        @translate()
      @transform @from = @hide()
      return

    to = @[@mode]()
    return if @from.x == to.x && @from.y == to.y && @from.w == to.w && @from.h == to.h

    @transform(to)

    setTimeout =>
      @from = to
      @translate()
    , @duration





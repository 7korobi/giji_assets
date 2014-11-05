class GUI.ScrollSpy
  @elems = {}
  @list = []

  @go: (id, offset = false)=>
    elem = @elems[id]
    if elem
      rect = elem.getBoundingClientRect()
      offset ||= -1 + Math.min win.horizon, rect.height

      top_by = rect.top - win.horizon + offset 
      left_by = 0
      
      window.scrollBy(left_by, top_by)

  @scroll_cb: =>
    id = @view()
    for spy in @list
      if spy.list?
        spy_id = spy.view()
      id ||= spy_id

    for spy in @list
      if id != spy.prop()
        spy.prop id, true
  @scroll = _.debounce @scroll_cb, DELAY.animato
  win.on.scroll.push @scroll

  @view: =>
    result = null
    for key, elem of @elems
      id = elem.vision.id
      rect = elem.getBoundingClientRect()
      vision = elem.vision
      vision.top = rect.top
      vision.btm = rect.bottom

      if elem.vision.id == key && rect.height && rect.width
        if !result && vision.top < win.horizon < vision.btm
          result = id
      else
        delete @elems[key]
    result

  constructor: (@prop)->
    GUI.ScrollSpy.list.push @
    @start()

  start: ->
    @avg_height = 150
    @show_upper = true

  view: ()->
    pager_rect = @pager_elem.getBoundingClientRect()
    @pager_top = pager_rect.top

    for o, idx in @list
      id = o._id
      if elem = GUI.ScrollSpy.elems[id]
        vision = elem.vision

        if !@adjust && @pager_top < win.horizon < vision.btm
          vision.offset = Math.max 1, win.horizon - vision.top
          @adjust = vision

    window.requestAnimationFrame ->
      m.redraw()

    @adjust?.id

  pager: (tag, @list, cb)->
    top = 0
    btm = list.length - 1

    idx = _.findIndex @list, _id: @prop?()
    if idx < 0
      idx = top
      idx = btm if @show_under
    else
      # TODO wait for network read.

    head = Math.max top, idx - Math.ceil(win.height * 2 / @avg_height)
    tail = Math.min btm, idx + Math.ceil(win.height * 3 / @avg_height)

    pager_cb = (@pager_elem, is_continue, context)=>
      window.requestAnimationFrame =>
        @avg_height = rect.height / (1 + tail - head)
        m.redraw() unless stay

      rect = @pager_elem.getBoundingClientRect()
      show_under = rect.bottom < win.height 
      show_upper =           0 < rect.top
      stay = show_under == @show_under && show_upper == @show_upper
      @show_under = show_under
      @show_upper = show_upper

    vdom_items =
      for o in @list[head..tail]
        vdom = cb(o)
        for key, attr of @mark o._id
          vdom.attrs[key] = attr
        vdom
    m tag,
      config: pager_cb
    , vdom_items

  mark: (id)->
    config: (elem, is_continue, context)=>
      GUI.ScrollSpy.elems[id] = elem
      elem.vision =
        id: id

      if @adjust && id == @adjust.id
        offset = @adjust.offset
        @adjust = null
        GUI.ScrollSpy.go id, offset
        window.requestAnimationFrame ->
          GUI.ScrollSpy.go id, offset

      if ! is_continue
        if id == @prop()
          GUI.ScrollSpy.go id
          window.requestAnimationFrame ->
            GUI.ScrollSpy.go id

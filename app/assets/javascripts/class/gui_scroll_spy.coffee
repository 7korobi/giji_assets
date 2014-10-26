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

  @scroll: =>
    id = @view()
    for spy in @list
      if id != spy.prop()
        spy.prop id, true
      if spy.list?
        spy.view()
    id

  @view: =>
    result = null
    for key, elem of @elems
      id = elem.vision.id
      rect = elem.getBoundingClientRect()
      elem.vision.top = rect.top
      elem.vision.btm = rect.bottom

      if elem.vision.id == key && rect.height && rect.width
        if !result && rect.top <= win.horizon <= rect.bottom 
          elem.vision.offset = win.horizon - rect.top
          result = id
      else
        delete @elems[key]
    result

  constructor: (@prop)->
    GUI.ScrollSpy.list.push @
    @start()

  start: ->
    @avg_height = 150
    @too_upper = true

  view: ()->
    cut_heads = null
    cut_tails = null
    add_heads = true
    add_tails = true
    in_box = false
    prop = @prop()

    for o, idx in @list
      id = o._id
      if elem = GUI.ScrollSpy.elems[id]
        vision = elem.vision

        @adjust = vision  if vision.offset?
        in_box  = true    if id == prop

        cut_heads = idx   if               vision.top < -1.5 * win.height   # last one
        add_heads = false if  add_heads && vision.top < -0.5 * win.height
        add_tails = false if  add_tails && win.height *  2.5 < vision.btm 
        cut_tails = idx   if !cut_tails && win.height *  3.5 < vision.btm  # first one

    if cut_heads || add_heads || add_tails || cut_tails
      window.requestAnimationFrame ->
        m.redraw()

    @tail = null      if add_tails && in_box?
    @tail = cut_tails if cut_tails
    @head = null      if add_heads && in_box?
    @head = cut_heads if cut_heads

  pager: (tag, list, cb)->
    unless @list?.length == list?.length
      @head = @tail = null

    @list = list
    top = 0
    btm = list.length - 1

    idx = _.findIndex @list, _id: @prop?()
    if idx < 0
      @head = @tail = null
      idx = top
      idx = btm if @too_under
    else
      # TODO wait for network read.
      @head = null unless @head <  idx
      @tail = null unless  idx  < @tail

    if @too_upper
      idx = top
      @head = @tail = null 

    @head ?= Math.max top, idx - Math.ceil(win.height * 2 / @avg_height)
    @tail ?= Math.min btm, idx + Math.ceil(win.height * 4 / @avg_height)

    pager_cb = (@pager_elem, is_continue, context)=>
      window.requestAnimationFrame =>
        @avg_height = rect.height / (1 + @tail - @head)
        m.redraw() unless stay

      rect = @pager_elem.getBoundingClientRect()
      too_under = rect.bottom < win.height 
      too_upper =           0 < rect.top
      stay = too_under == @too_under && too_upper == @too_upper
      @too_under = too_under
      @too_upper = too_upper

    vdom_items =
      for o in @list[@head..@tail]
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
        GUI.ScrollSpy.go id, @adjust.offset
        @adjust = null

      if ! is_continue
        if id == @prop()
          window.requestAnimationFrame ->
            GUI.ScrollSpy.go id



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
    return id

  @view: =>
    result = null

    for key, elem of @elems
      id = elem.vision.id
      rect = elem.getBoundingClientRect()
      if elem.vision.id == key && rect.height && rect.width
        elem.vision =
          id: id
          over_btm: win.height * 4 < rect.bottom
          good_btm: win.height * 3 < rect.bottom
          good_top: rect.top <   0 
          over_top: rect.top <  -1 * win.height 

        if rect.top < (win.horizon) < rect.bottom
          elem.vision.offset = win.horizon - rect.top
          result = id
      else
        delete @elems[key]
        for spy in @list
          delete spy.elems[key]
    result

  constructor: (@prop)->
    GUI.ScrollSpy.list.push @
    @elems = {}

    @start()

  start: ->
    @avg_height = 150
    @too_upper = true

  view: ()->
    cut_heads = null
    cut_tails = null
    add_heads = true
    add_tails = true

    for o, idx in @list
      if elem = @elems[o._id]
        if vision = elem.vision
          if vision.offset
            @adjust = vision
          if vision.over_btm
            unless cut_tails # first one
              cut_tails = idx
          if vision.good_btm
            add_tails = false
          if vision.good_top
            add_heads = false
          if vision.over_top
            cut_heads = idx
            # last one

    in_box = @elems[@prop()]
    
    if add_tails && in_box?
      @tail = null
      window.requestAnimationFrame ->
        m.redraw()

    if add_heads && in_box?
      @head = null
      window.requestAnimationFrame ->
        m.redraw()

    if cut_heads
      console.log "#{_.now()} cut_heads #{cut_heads}"
      @head = cut_heads
      window.requestAnimationFrame ->
        m.redraw()

    if cut_tails
      console.log "#{_.now()} cut_tails #{cut_tails}"
      @tail = cut_tails
      window.requestAnimationFrame ->
        m.redraw()

  pager: (tag, list, cb)->
    unless @list?.length == list?.length
      @head = @tail = null
    if @too_upper
      @head = tail = null

    @list = list
    top = 0
    btm = list.length - 1

    idx = _.findIndex @list, _id: @prop?()
    if idx < 0
      idx = top if @too_upper
      idx = btm if @too_under

    # TODO wait for network read.

    @head = null unless @head <  idx
    @tail = null unless  idx  < @tail

    @head ?= Math.max top, idx - Math.floor(win.height * 1.5 / @avg_height)
    @tail ?= Math.min btm, idx + Math.floor(win.height * 4.5 / @avg_height)

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
      GUI.ScrollSpy.elems[id] = @elems[id] = elem
      elem.vision =
        id: id

      if @adjust && id == @adjust.id
        offset = @adjust.offset
        @adjust = null
        GUI.ScrollSpy.go id, offset

      if ! is_continue
        if id == @prop()
          window.requestAnimationFrame ->
            GUI.ScrollSpy.go id



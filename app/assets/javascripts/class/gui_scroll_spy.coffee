class GUI.ScrollSpy
  @elems = {}
  @list = []

  @go: (id, offset)=>
    elem = @elems[id]
    if elem
      rect = elem.getBoundingClientRect()
      offset ?= -2 + Math.min win.horizon, rect.height

      top_by = rect.top - win.horizon + offset
      left_by = 0

      window.scrollBy(left_by, top_by)

  win.on.scroll_end.push =>
    id = @view()
    for spy in @list
      if spy.list?
        spy_id = spy.view()
      id ||= spy_id

    for spy in @list
      if id != spy.prop()
        spy.prop id, true

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

  rescroll: (@prop)->
    m.redraw()
    window.requestAnimationFrame ->
      GUI.ScrollSpy.go prop()

  start: ->
    @head = @tail = 0
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

    m.startComputation()
    window.requestAnimationFrame ->
      m.endComputation()

    @adjust?.id

  size = (page_size, avg)->
    5 + Math.ceil(win.height * page_size / avg)

  pager: (tag, @list, cb)->
    unless @list?.length
      return m tag, {config: (@pager_elem)=> }
    top = 0
    btm = @list.length - 1

    if @pager_elem?
      rect = @pager_elem.getBoundingClientRect()
      show_bottom = win.height - rect.bottom
      show_upper  = 0 < rect.top
      show_under  = 0 < show_bottom

    # TODO wait for network read.
    idx = _.findIndex @list, _id: @prop?()
    if idx < 0
      idx =
        if @past_list == @list
          switch
            when show_upper then @head
            when show_under then @tail
            else                 @head
        else
          switch
            when show_upper then top
            when show_under then btm
            else                 top
    @past_list = @list

    new_size = size(3, @avg_height)
    @size = new_size unless 3 > Math.abs @size - new_size

    @tail = Math.min btm, idx + @size
    @head = Math.max top, idx - @size

    pager_cb = (@pager_elem, is_continue, context)=>
      rect = @pager_elem.getBoundingClientRect()

      @show_under  = rect.bottom < win.horizon
      @show_upper  = win.horizon < rect.top
      @avg_height = rect.height / (1 + @tail - @head)

      elem_bottom = rect.bottom + win.top
      diff_bottom = elem_bottom - @elem_bottom
      if @show_under && ! @prop() && win.bottom < document.height
        window.scrollBy 0, diff_bottom
      @elem_bottom = elem_bottom

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

      if @adjust
        if id == @adjust.id
          offset = @adjust.offset
          @adjust = null
          GUI.ScrollSpy.go id, offset
      else
        if ! is_continue
          if id == @prop()
            GUI.ScrollSpy.go id

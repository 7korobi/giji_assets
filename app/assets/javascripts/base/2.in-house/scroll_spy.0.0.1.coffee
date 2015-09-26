///
ScrollSpy v0.0.1
http://github.com/7korobi/---
(c) 7korobi
License: MIT
///

class ScrollSpy
  @elems = {}

  @go: (id, offset)=>
    elem = @elems[id]
    if elem
      rect = elem.getBoundingClientRect()
      offset ?= Math.min(win.horizon, rect.height) * 0.5

      top_by = rect.top - win.horizon + offset
      left_by = 0
      window.scrollBy(left_by, top_by) if left_by || top_by

  interval = 5000
  window.setInterval ->
    if win.scroll?.center
        win.scroll.tick( win.scroll.center , interval / 1000)
  , interval

  @capture: =>
    full_id = @view()

    spy = win.scroll
    if spy?
      if spy.list?
        id = spy.view()
        if id != spy.prop()
          spy.prop(id)

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
#          console.log "@view #{id} #{vision.top} < #{win.horizon} < #{vision.btm}"
          result = id
      else
        delete @elems[key]
    result

  constructor: (@prop)->
    @show_upper = true
    @size = 30
    @head = @tail = 0

  rescroll: (@prop)->
    window.requestAnimationFrame ->
      ScrollSpy.go prop()

  tick: (center)->
    console.log center

  view: ()->
    pager_rect = @pager_elem.getBoundingClientRect()
    @pager_top = pager_rect.top

    for o, idx in @list
      id = o._id
      if elem = ScrollSpy.elems[id]
        vision = elem.vision

        if !@adjust && @pager_top < win.horizon < vision.btm
          vision.offset = Math.max 1, win.horizon - vision.top
#          console.log "view #{id} #{@pager_top} < #{win.horizon} < #{vision.btm}"
          @adjust = vision

    m.startComputation()
    window.requestAnimationFrame ->
      m.endComputation()

    @adjust?.id


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

    @center = @list[idx]
    @tail = Math.min btm, _.ceil( idx + @size, -1)
    @head = Math.max top,         idx - @size

    pager_cb = (@pager_elem, is_continue, context)=>
      rect = @pager_elem.getBoundingClientRect()

      @show_under  = rect.bottom < win.horizon
      @show_upper  = win.horizon < rect.top

      avg = rect.height / (1 + @tail - @head)
      size = 3 * win.height / avg
      if @size < size
        console.log "!alert! scroll spy size #{@size} < #{size}"

      elem_bottom = rect.bottom + win.top
      diff_bottom = elem_bottom - @elem_bottom
      if @show_under && diff_bottom && ! @prop() && win.bottom < document.height
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
      ScrollSpy.elems[id] = elem
      elem.vision =
        id: id

      if @adjust
        if id == @adjust.id
          offset = @adjust.offset
          @adjust = null
          ScrollSpy.go id, offset
      else
        if ! is_continue
          if id == @prop()
            window.requestAnimationFrame ->
              ScrollSpy.go id

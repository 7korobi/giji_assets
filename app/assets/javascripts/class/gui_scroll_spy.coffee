class GUI.ScrollSpy
  @elems = {}
  @go = (id)->
    elem = GUI.ScrollSpy.elems[id]
    if elem
      rect = elem.getBoundingClientRect()
      offset = Math.min win.height / 2, rect.height

      top_by = rect.top + offset - win.height / 2 - 1
      left_by = 0
      
      window.scrollBy(left_by, top_by)

  @view = ->
    for key, elem of GUI.ScrollSpy.elems
      id = elem.scroll_id
      rect = elem.getBoundingClientRect()
      if id == key && rect.height && rect.width
        if rect.top < (win.height / 2) < rect.bottom && rect.left < (win.width / 2) < rect.right
          return id
      else
        delete GUI.ScrollSpy.elems[key]
    return null

  constructor: (@prop)->
    @start()
    scroll = =>
      id = GUI.ScrollSpy.view()
      if id != @prop()
        @prop id, true
    win.on.scroll.push _.debounce( scroll, DELAY.andante)

  start: ->

  pager: (list, cb)->
    for o in list
      vdom = cb(o)
      vdom.attrs.config = @mark(o._id).config
      vdom

  mark: (id)->
    go = ->
      GUI.ScrollSpy.go id

    config: (elem, is_continue, context)=>
      GUI.ScrollSpy.elems[id] = elem
      elem.scroll_id = id
      if ! is_continue
        if id == @prop()
          _.debounce(go, DELAY.animato)()


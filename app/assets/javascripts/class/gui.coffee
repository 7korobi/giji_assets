GUI = 
  img_head: "//7korobi.gehirn.ne.jp/images"
  portrate: (face_id)->
    dom = null
    attr = GUI.attrs ->
      @over -> GUI.Animate.jelly.up dom
      @out ->  GUI.Animate.jelly.down dom
    attr.config = (elem, isInit, context)-> dom = elem
    attr.src = GUI.img_head + "/portrate/#{face_id}.jpg"
    m "img", attr

  title: (width, theme, day_or_night)->
    m "img",
      src: GUI.img_head + "/banner/title#{width}" + RAILS.head_img[width]?[theme]?[day_or_night]

  header_style_p: ""
  header: (keys)->
    style = keys.join(" ")
    html = document.documentElement
    html.className = html.className.replace GUI.header_style_p, style
    GUI.header_style_p = style

  attrs: (dsl)->
    o = {}
    act = (cb)->
      (e)->
        cb(e)
        e.preventDefault()

    list_cmds =
      class: (str)->
        o.className = str
      start: (cb)->
        cb = act(cb)
        o.onmousedown = cb
        o.ongesturestart = cb
        o.ontouchstart = cb
      end: (cb)->
        cb = act(cb)
        o.onmouseup = cb
        o.ongestureend = cb
        o.ontouchend = cb
      over: (cb)->
        cb = act(cb)
        o.onmouseover = cb
        o.ongesturestart = cb
        o.ontouchstart = cb
      out: (cb)->
        cb = act(cb)
        o.onmousedown = cb
        o.onmouseout = cb
        o.ongestureend = cb
        o.ontouchend = cb

    dsl.call list_cmds
    o

  inline_item: (cb)->
    inline_item_span = (align, em, vdom)->
      m "li",
        style: "width:#{em}em; text-align:#{align};"
      , vdom
    list_cmds =
      center: (em, vdom...)-> inline_item_span "center", em, vdom
      right:  (em, vdom...)-> inline_item_span "right", em, vdom

    m "ul.mark.inline", cb.call(list_cmds)

  do_tick: (cb)->
    action = ->
      m.redraw()
      tick = cb(_.now())
      if tick
        setTimeout ->
          action()
        , tick
    action()

  if_exist: (query, cb)->
    win.on.load.push ->
      dom = document.querySelector(query)
      cb(dom) if !!dom && cb

  comma: (num)->
    (String Math.round num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

  name:
    config: (o)->
      RAILS.roles[o]?.name || RAILS.gifts[o]?.name || RAILS.events[o]?.name || o || ""

  names:
    config: (list, cb)->
      hash = {}
      for key in list
        hash[key] ||= 0
        hash[key] += 1
      for key, size of hash
        cb GUI.name.config(key), size

  letter: (style, head, vdom...)->
    [ m "h3.mesname",
        m "b", head
      m "p.text.#{style}", vdom
    ]

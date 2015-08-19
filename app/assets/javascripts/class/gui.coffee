GUI = (->
  names_base = (name)->
    (list, cb)->
      hash = {}
      for key in list
        hash[key] ||= 0
        hash[key] += 1

      order = Object.keys(hash).sort (a,b)-> hash[b] - hash[a]
      for key in order
        cb name(key), hash[key]

  name_config = (o)->
      RAILS.roles[o]?.name || RAILS.gifts[o]?.name || RAILS.events[o]?.name || o || ""

  img_head: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images"
  portrate: (face_id, attr = {})->
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

  attrs_to: (parent, query, base_attrs, cb)->
    vdom = m query
    tag = vdom.tag
    attr = Object.keys(vdom.attrs)[0]
    attr_cb = (elem, data, cb)->
      ->
        cb.apply @, data
    for elem in parent.querySelectorAll query
      data = attr && Serial.parser.Array elem.attributes[attr]?.value
      for key, func of GUI.attrs base_attrs, attr_cb(elem, data, cb)
        elem[key] = func


  attrs: (o, dsl)->
    actioned_cb = null
    act = (cb)->
      (e)->
        cb(e, e.srcElement, e.toElement)
        if actioned_cb
          window.requestAnimationFrame actioned_cb

        e.preventDefault()

    func =
      className: (str)->
        o.className = str

      swipe: (thru)->
        if thru
          act = (cb)-> cb

        start = act (e)->
          console.log e.changedTouches
          e1 = e.changedTouches?[0]
          gesture.start(e1 || e)
        move = act (e)->
          console.log e.changedTouches
          e1 = e.changedTouches?[0]
          gesture.move(e1 || e)
        end = act (e)->
          gesture.end(e)
        cancel = act (e)->
          gesture.cancel(e)

        o.ontouchstart = start
        o.ontouchmove = move
        o.ontouchend = end
        o.ontouchcancel = cancel
        # o.onmousedown = start
        # o.onmousemove = move
        # o.onmouseup = end

        draw = (cb)->
          (diff, is_fast)->
            m.startComputation()
            cb(diff, is_fast)
            m.endComputation()
        gesture = new Gesture()

        func.up = (cb)->
          gesture.onup = draw cb
        func.down = (cb)->
          gesture.ondown = draw cb
        func.left = (cb)->
          gesture.onleft = draw cb
        func.right = (cb)->
          gesture.onright = draw cb
        func.move = (cb)->
          gesture.onmove = draw cb

      click: (cb)->
        cb = act(cb)
        o.onclick = cb
      start: (cb)->
        cb = act(cb)
        o.onmousedown = cb
        o.ontouchstart = cb
      end: (cb)->
        cb = act(cb)
        o.onmouseup = cb
        o.ontouchend = cb
      cancel: (cb)->
        cb = act(cb)
        o.onmouseout = cb
        o.onmouseover = cb
        o.ontouchcancel = cb
      move: (cb)->
        cb = act(cb)
        o.onmousemove = cb
        o.ontouchmove = cb
      over: (cb)->
        cb = act(cb)
        o.onmouseover = cb
        o.ontouchmove = cb
      out: (cb)->
        cb = act(cb)
        o.onmouseup  = cb
        o.onmouseout = cb
        o.ontouchend = cb

      canvas: (width, height, {cache, background, draw})->
        size = "#{width}x#{height}"
        o.width = width * 2
        o.height = height * 2
        o.style = "width: #{width}px; height: #{height}px;"
        o.config = (canvas, is_continue, context)->
          ctx = canvas.getContext "2d"

          caches = cache?()
          if caches
            caches.canvas ?= {}
            if image = caches.canvas[size]
              ctx.putImageData image, 0, 0
              draw?(ctx)
              return
          background?(ctx)
          if caches
            caches.canvas[size] = ctx.getImageData 0, 0, o.width, o.height
            draw?(ctx)

      config: (cb)->
        o.config = cb
      actioned: (cb)->
        actioned_cb = cb

    dsl.call func
    o

  timer: (query, o)->
    child = ""
    attr =
      config: (elem, is_continue, context)->
        at = Timer.fetch o.updated_at
        context.onunload = ->
          delete context.update
        context.update = (text)->
          child = text
          elem.innerText = text
          elem.textContent = text
        unless is_continue
          at.start context

    m query, attr, child

  inline_item: (cb)->
    inline_item_span = (align, em, vdom)->
      m "li",
        style: "width:#{em}em; text-align:#{align};"
      , vdom
    list_cmds =
      center: (em, vdom...)-> inline_item_span "center", em, vdom
      right:  (em, vdom...)-> inline_item_span "right", em, vdom
      left:   (em, vdom...)-> inline_item_span "left", em, vdom

    m "ul.inline.mark", cb.call(list_cmds)

  do_tick: (cb)->
    action = ->
#      m.startComputation()
      tick = cb(_.now())
      if tick
        setTimeout ->
          action()
        , tick
#      m.endComputation()
    action()

  if_exist: (query, cb)->
    win.on.load.push ->
      dom = document.querySelector(query)
      cb(dom) if !!dom && cb

  comma: (num)->
    (String Math.round num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

  field: (num, length)->
    "0000000000#{num}"[-length ..]

  name:
    config: name_config

  names:
    config: names_base(name_config)

  items_module: (dir, type)->
    GUI.if_exist "##{dir}-#{type}", (dom)->
      query = Cache.items.where({type})
      m.mount dom,
        controller: ->
        view: ->
          m "div",
            query.list().map (v)->
              vdom = GUI.message[v.template](v)
              vdom.attrs.config = win.scroll.mark(v._id).config
              vdom


  accordion: (mark, list)->
    cancel = GUI.attrs {}, ->
      @end (e)->
        list.tap = null

    items = []
    items.push m "dt", cancel, m "span.mark", m.trust "&#x2718"

    cb = ({head, text}, idx)->
      tap = GUI.attrs {}, ->
        @end (e)->
          list.tap = idx
      items.push m "dt", tap,
        m "strong", m.trust head
        m ".guide", "↨"
      if list.tap == idx
        items.push m "dd", m.trust text

    for o, i in list
      cb o, i

    m "dl.accordion", win.scroll.mark(mark), items

  letter: (style, head, vdom...)->
    [ m "p.name",
        m "b", head
      m "p.text.#{style}", vdom
    ]
)()

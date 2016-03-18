ids_list = (list, cb)->
  for key in list
    obj_config cb, key, 1

ids_sort = (list, cb)->
  hash = {}
  for key in list
    hash[key] ||= 0
    hash[key] += 1

  order = Object.keys(hash).sort (a,b)-> hash[b] - hash[a]
  for key in order
    obj_config cb, key, hash[key]

obj_config = (cb, key, count)->
  obj = Mem.Query.roles.find(key) || Mem.Query.traps.find(key)
  if obj
    cb count, obj
  else
    cb count,
      _id: key
      win: ""

name_config = (key)->
  obj = Mem.Query.roles.find(key) || Mem.Query.traps.find(key)
  obj?.name || key || ""


GUI =
  img_head: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images"
  portrate: (face_id, attr = {})->
    attr.src = GUI.img_head + "/portrate/#{face_id}.jpg"
    m "img", attr

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
      data = attr && Mem.unpack.Array elem.attributes[attr]?.value
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

  comma: (num)->
    (String Math.round num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

  field: (num, length)->
    "0000000000#{num}"[-length ..]

  name:
    config: name_config

  names:
    order:  ids_list
    config: ids_sort


module.exports = GUI

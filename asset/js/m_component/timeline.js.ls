
mestype_orders = <[
  SAY
  MSAY
  VSAY
  VGSAY
  GSAY
  SPSAY
  WSAY
  XSAY
  BSAY
  AIM
  TSAY
  MAKER
  ADMIN
]>

doc.component.timeline = Canvas ({size: [width, height]})->
  {talk, open, potofs_hide, talk_at, search} = Url.prop
  return unless Mem.events.list.length

  graph_height = height - 50

  base = {}
  masks = {}
  time_ids = []
  x = y = max_height = time_width = 0

  view_port_x = ->
    base := Mem.messages.talk(talk(), open(), potofs_hide())
    return false unless base.reduce

    masks := base.reduce.mask || {}
    time_ids := _.sortBy Object.keys(masks), unpack.Date
    time_width := time_ids.length
    x := width / time_width
    true

  view_port_y = ->
    for time_id in time_ids
      mask = masks[time_id]
      max_height := mask.all.count if max_height < mask.all.count
    y := graph_height / max_height
    true

  index_at = (updated_at)->
    for time_id, i in time_ids by 1
      mask = masks[time_id]
      if updated_at <= mask.all.max
        return i
    for time_id, i in time_ids by -1
      mask = masks[time_id]
      if mask.all.min <= updated_at
        return i
    return 0

  choice_last = (query, time)->
    for o in query.list by -1
      if time > o.updated_at
        talk_at o._id
        menu.icon.change "search"
        menu.scope.change "talk"
        Url.prop.scroll ""
        win.scroll.rescroll talk_at
        return


  data: ->
    view_port_x()
    base.reduce

  onmove: ({state, is_touch, offset})->
    return unless is_touch && offset? && view_port_x()
    search ""

    index = Math.floor(offset.x / x)
    time = masks[time_ids[index]].all.min
    query =
      if graph_height < offset.y
        Mem.messages.talk("open", false, {})
      else
        base

    choice_last query, time

  draw: ({ctx})->
    focus = Mem.messages.find talk_at()
    return unless focus && view_port_x()

    offset = index_at(focus.updated_at)
    ctx.beginPath()
    ctx.strokeStyle = RAILS.log.colors.focus
    ctx.globalAlpha = 1
    ctx.moveTo x * offset, height
    ctx.lineTo x * offset,  0
    ctx.stroke()

  background: ({ctx})->
    return unless view_port_x() && view_port_y()

    ctx.clearRect 0, 0, width, height
    ctx.fillStyle = RAILS.log.colors.back
    ctx.globalAlpha = 0.5
    ctx.fillRect 0, 0, x * time_width, y * max_height

    count_width = 1
    for time_id, left in time_ids
      mask = masks[time_id]
      top = max_height
      for mestype in mestype_orders
        color = RAILS.log.colors[mestype]
        if mask[mestype]
          count_height = mask[mestype].count
          top -= count_height
          ctx.fillStyle = color
          ctx.globalAlpha = 1
          ctx.fillRect x * left, y * top, 1 + x * count_width, y * count_height

    ctx.beginPath()
    for event in Mem.events.list when event.created_at
      right = index_at event.updated_at
      left = index_at event.created_at
      ctx.strokeStyle = RAILS.log.colors.line
      ctx.globalAlpha = 1
      ctx.moveTo x * left, height
      ctx.lineTo x * left,  0

      ctx.fillStyle = RAILS.log.colors.event
      ctx.fillRect x * left, graph_height, x * time_width, height

      ctx.textAlign = "left"
      ctx.fillStyle = RAILS.log.colors.text
      ctx.font = "30px serif"

      max_width = x * (right - left) - 4
      if 0 < max_width
        ctx.fillText event.name, x * left, height - 12, max_width

    ctx.stroke()

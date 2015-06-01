GUI.timeline = ({width, base, choice})->
  colors =
    VSAY:  "#ca6"
    VGSAY: "#a8a8e8"
    GSAY:  "#bbd"
    SAY:   "#cb8"
    MSAY:  "#cb8"
    SPSAY: "#dcb"
    WSAY:  "#a55"
    XSAY:  "#9a7"
    BSAY:  "#9a7"
    AIM:   "#dcb"
    TSAY:  "#a98"
    MAKER: "#000"
    ADMIN: "#000"
    text:  "yellow"
    back:  "#222"
    event: "#224"
    line:  "#44a"
    focus: "yellow"

  mestype_orders = [
    "SAY"
    "MSAY"
    "VSAY"
    "VGSAY"
    "GSAY"
    "SPSAY"
    "WSAY"
    "XSAY"
    "BSAY"
    "AIM"
    "TSAY"
    "MAKER"
    "ADMIN"
  ]

  last_at = Cache.events.list().last.updated_at / (1000 * 3600)
  first_at = Cache.events.list().first.created_at / (1000 * 3600)
  time_width = last_at - first_at

  height = 130
  graph_height = height - 50
  max_height = y = 0

  attr = GUI.attrs {}, ->
    find_last = (list, time)->
      for o in list by -1
        return o._id if time > o.updated_at
      return null

    point = (e)->
      return unless win.is_touch
      Url.prop.search ""

      canvas = document.querySelector("canvas")
      switch
        when e.offsetX
          offsetX = e.offsetX * 2
          offsetY = e.offsetY * 2
        when e.layerX
          offsetX = e.layerX * 2
          offsetY = e.layerY * 2
        when e.pageX
          rect = canvas.getBoundingClientRect()
          offsetX = (e.pageX - rect.left) * 2
          offsetY = (e.pageY - rect.top)  * 2
        when e.touches?[0]?.pageX
          rect = canvas.getBoundingClientRect()
          offsetX = (e.touches[0].pageX - rect.left) * 2
          offsetY = (e.touches[0].pageY - rect.top)  * 2

      list =
        if graph_height < offsetY
          Cache.messages.talk("open", false, {}).list()
        else
          base.list()

      id = find_last list, Math.ceil(1000 * 3600 * (first_at + offsetX / x))
      return unless id
      choice(id)

    @start (e)->
      win.is_touch = true
      point(e)
    @end (e)->
      win.is_touch = false
      point(e)
    @cancel (e)->
      win.is_touch = false
      point(e)

    @move point

    @canvas width, height / 2,
      cache: -> base.reduce()
      draw: (ctx)->
        focus = Cache.messages.find(Url.prop.talk_at())
        return unless focus

        ctx.beginPath()
        offset = focus.updated_at / (1000 * 3600) - first_at
        ctx.strokeStyle = colors.focus
        ctx.globalAlpha = 1
        ctx.moveTo x * offset, height
        ctx.lineTo x * offset,  0
        ctx.stroke()

      background: (ctx)->
        return unless base.reduce()

        for time_id, mask of base.reduce().mask
          max_height = mask.all.count if max_height < mask.all.count
        y = graph_height / max_height

        ctx.clearRect 0, 0, width, height
        ctx.fillStyle = colors.back
        ctx.globalAlpha = 0.5
        ctx.fillRect 0, 0, x * time_width, y * max_height

        count_width = 1
        for time_id, mask of base.reduce().mask
          left = Serial.parser.Date(time_id) - first_at
          top = max_height
          for mestype in mestype_orders
            color = colors[mestype]
            if mask[mestype]
              count_height = mask[mestype].count
              top -= count_height
              ctx.fillStyle = color
              ctx.globalAlpha = 1
              ctx.fillRect x * left, y * top, 1 + x * count_width, y * count_height

        ctx.beginPath()
        for event in Cache.events.list()
          continue unless event.created_at
          right = event.updated_at / (1000 * 3600) - first_at
          left = event.created_at / (1000 * 3600) - first_at
          ctx.strokeStyle = colors.line
          ctx.globalAlpha = 1
          ctx.moveTo x * left, height
          ctx.lineTo x * left,  0

          ctx.fillStyle = colors.event
          ctx.fillRect x * left, graph_height, x * last_at, height

          ctx.textAlign = "left"
          ctx.fillStyle = colors.text
          ctx.font = "30px serif"

          max_width = x * (right - left) - 4
          if 0 < max_width
            ctx.fillText event.name, x * left, height - 12, max_width

        ctx.stroke()

  x = attr.width / time_width

  m "canvas", attr

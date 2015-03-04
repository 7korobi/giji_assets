GUI.timeline = ({width, base, choice})->
  colors =
    SAY:   "#cb8"
    MSAY:  "#cb8"
    VSAY:  "#ca6"
    SPSAY: "#dcb"
    GSAY:  "#bbd"
    WSAY:  "#a55"
    XSAY:  "#9a7"
    BSAY:  "#9a7"
    AIM:   "#dcb"
    TSAY:  "#a98"
    MAKER: "#000"
    ADMIN: "#000"
    text:  "yellow"
    back:  "#000"
    event: "#224"
    line:  "#44a"
    focus: "yellow"

  mestype_orders = [
    "SAY"
    "MSAY"
    "VSAY"
    "SPSAY"
    "GSAY"
    "WSAY"
    "XSAY"
    "BSAY"
    "AIM"
    "TSAY"
    "MAKER"
    "ADMIN"
  ]

  last_at = base.list().last?.updated_at / (1000 * 3600)
  first_at = base.list().first?.updated_at / (1000 * 3600)
  time_width = last_at - first_at
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
      if e.touches?[0]?.pageX
        offsetX = (e.touches[0].pageX - canvas.offsetLeft) * 2
        offsetY = (e.touches[0].pageY - canvas.offsetTop)  * 2
      else
        offsetX = (e.offsetX || e.layerX || e.x) * 2
        offsetY = (e.offsetY || e.layerY || e.y) * 2

      list =
        if 100 < offsetY
          Cache.messages.talk("open", false, {}).list()
        else
          {talk, open, potofs_hide} = Url.prop
          Cache.messages.talk(talk(), open(), potofs_hide()).list()

      id = find_last list, Math.ceil(1000 * 3600 * (first_at + offsetX / x))
      return unless id

      m.startComputation()
      choice(id)
      m.endComputation()

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

    @canvas width, 75,
      cache: -> base.reduce()
      draw: (ctx)->
        focus = Cache.messages.find(Url.prop.talk_at())
        return unless focus

        ctx.beginPath()
        offset = focus.updated_at / (1000 * 3600) - first_at
        ctx.strokeStyle = colors.focus
        ctx.globalAlpha = 1
        ctx.moveTo x * offset, 150
        ctx.lineTo x * offset,   0
        ctx.stroke()

      background: (ctx)->
        return unless base.reduce()

        for time_id, mask of base.reduce().mask
          max_height = mask.all.count if max_height < mask.all.count
        y = 100 / max_height

        ctx.clearRect 0, 0, width, height
        ctx.fillStyle = colors.back
        ctx.globalAlpha = 0.5
        ctx.fillRect 0, 0, x * time_width, y * max_height

        width = 1
        for time_id, mask of base.reduce().mask
          left = Serial.parser.Date(time_id) - first_at
          top = max_height
          for mestype in mestype_orders
            color = colors[mestype]
            if mask[mestype]
              height = mask[mestype].count
              top -= height
              ctx.fillStyle = color
              ctx.globalAlpha = 1
              ctx.fillRect x * left, y * top, 1 + x * width, y * height

        left = 0
        ctx.beginPath()
        for event_id, reduce of base.reduce().event
          right = reduce.max / (1000 * 3600) - first_at
          ctx.strokeStyle = colors.line
          ctx.globalAlpha = 1
          ctx.moveTo x * right, 150
          ctx.lineTo x * right,   0

          ctx.fillStyle = colors.event
          ctx.fillRect x * left, 100, x * right, 150

          ctx.textAlign = "left"
          ctx.fillStyle = colors.text
          ctx.font = "30px serif"
          ctx.fillText Cache.events.find(event_id).name, x * left, 150 - 12, x * (right - left) - 4

          left = right
        ctx.stroke()

  x = attr.width / time_width

  m "canvas", attr

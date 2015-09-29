
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


timeline_present = ({size: [width, height]})->
  {talk, open, potofs_hide, talk_at, search} = Url.prop
  return unless Mem.events.list().length

  last_at = Mem.events.list().last.updated_at / (1000 * 3600)
  first_at = Mem.events.list().first.created_at / (1000 * 3600)
  time_width = last_at - first_at
  graph_height = height - 50

  x = width / time_width
  y = max_height = 0

  base = Mem.messages.talk(talk(), open(), potofs_hide())

  find_last = (list, time)->
    for o in list by -1
      return o._id if time > o.updated_at
    return null

  choice = (id)->
    talk_at id
    menu.icon.change "search"
    menu.scope.change "talk"
    Url.prop.scroll ""
    win.scroll.rescroll talk_at


  data: ->
    base.reduce()

  draw: ({ctx})->
    focus = Mem.messages.find talk_at()
    return unless focus

    ctx.beginPath()
    offset = focus.updated_at / (1000 * 3600) - first_at
    ctx.strokeStyle = RAILS.log.colors.focus
    ctx.globalAlpha = 1
    ctx.moveTo x * offset, height
    ctx.lineTo x * offset,  0
    ctx.stroke()

  onmove: ({state, is_touch, offset})->
    return unless is_touch && offset?
    search ""
    list =
      if graph_height < offset.y
        Mem.messages.talk("open", false, {}).list()
      else
        base.list()

    id = find_last list, Math.ceil(1000 * 3600 * (first_at + offset.x / x))
    return unless id
    choice(id)

  background: ({ctx})->
    return unless base.reduce()

    for time_id, mask of base.reduce().mask
      max_height := mask.all.count if max_height < mask.all.count
    y := graph_height / max_height

    ctx.clearRect 0, 0, width, height
    ctx.fillStyle = RAILS.log.colors.back
    ctx.globalAlpha = 0.5
    ctx.fillRect 0, 0, x * time_width, y * max_height

    count_width = 1
    for time_id, mask of base.reduce().mask
      left = unpack.Date(time_id) - first_at
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
    for event in Mem.events.list()
      continue unless event.created_at
      right = event.updated_at / (1000 * 3600) - first_at
      left = event.created_at / (1000 * 3600) - first_at
      ctx.strokeStyle = RAILS.log.colors.line
      ctx.globalAlpha = 1
      ctx.moveTo x * left, height
      ctx.lineTo x * left,  0

      ctx.fillStyle = RAILS.log.colors.event
      ctx.fillRect x * left, graph_height, x * last_at, height

      ctx.textAlign = "left"
      ctx.fillStyle = RAILS.log.colors.text
      ctx.font = "30px serif"

      max_width = x * (right - left) - 4
      if 0 < max_width
        ctx.fillText event.name, x * left, height - 12, max_width

    ctx.stroke()


export doc =
  seeing: {}
  seeing_add: (id, sec)->
    doc.seeing[id] = (doc.seeing[id] || 0) + sec

  load:
    event: (shortcut, event, cb)->
      if shortcut
        cb()
      else
        event.is_loading = true
        Submit.get(event.link).then (gon)->
          catch_gon.villages()
          catch_gon.messages()
          event.is_loading = false
          cb()

  messages:
    seeing: (filter_size, center)->
      ids = Object.keys doc.seeing
      ids = _.sortBy(ids, (id)-> - doc.seeing[id] )[0 to filter_size]
      if center?.subid == "S"
        ids = _.select(ids, (id)-> 25 < doc.seeing[id] && id != center._id)
        list = Mem.messages.finds(ids)
        list.unshift center
      else
        ids = _.select(ids, (id)-> 25 < doc.seeing[id])
        list = Mem.messages.finds(ids)
      list

    pins: ({story_id,pins})->
      Mem.messages.pins(story_id(), pins())
    anchor: ({talk})->
      Mem.messages.anchor(talk(), win.scroll.prop())
    home: ({home})->
      Mem.messages.home(home())
    talk: ({talk, open, potofs_hide, search})->
      Mem.messages.talk(talk(), open(), potofs_hide(), search())
    memo: ({memo, potofs_hide, search})->
      Mem.messages.memo(memo(), true, potofs_hide(), search())
    history: ({memo, potofs_hide, search})->
      Mem.messages.memo(memo(), false, potofs_hide(), search())

  timeline: ->
    {content_width} = Url.prop
    m.component Canvas, \#timeline, timeline_present, size: [2 * content_width(), 150]

  security_modes: (prop)->
    story = Mem.storys.list().first
    mob = Mem.roles.find(story?.type.mob)

    grave_caption = []
    grave_caption.push "墓下" if Mem.messages.has.grave
    grave_caption.push mob.CAPTION if Mem.messages.has.vsay && mob.CAPTION

    think_caption = []
    think_caption.push "独り言" if Mem.messages.has.think
    think_caption.push "内緒話" if Mem.messages.has.to

    list = []
    list.push m "a", Btn.set({}, prop, "all"),   "すべて"
    list.push m "a", Btn.set({}, prop, "think"), think_caption.join("/") + "つき" if think_caption.length > 0
    list.push m "a", Btn.set({}, prop, "clan"),  "仲間つき" if Mem.messages.has.clan
    list.push m "a", Btn.set({}, prop, "open"),  "公開情報のみ"
    list.push m "a", Btn.set({}, prop, "main"),  "出席者のみ"
    list.push m "a", Btn.set({}, prop, "grave"), grave_caption.join("/") + "のみ" if grave_caption.length > 0
    list.push m.trust "&nbsp;"
    list.push m "a", Btn.bool({}, Url.prop.open),  "公開情報"
    list.push m "a", Btn.bool({}, Url.prop.human), "/*中の人*/"
    m "p", list

  potofs: ->
    potofs = Mem.potofs.view(Url.prop.potofs_desc(), Url.prop.potofs_order()).list()
    hides = Url.prop.potofs_hide()
    turn = win.scroll.center?.event()?.turn || 0

    m ".minilist",
      m "h6", "キャラクターフィルタ"
      m "p",
        m "a", Btn.keys_reset({}, Url.prop.potofs_hide, []                    ), "全員表示"
        m "a", Btn.keys_reset({}, Url.prop.potofs_hide, Mem.potofs.others() ), "参加者表示"
        m "a", Btn.keys_reset({}, Url.prop.potofs_hide, Mem.potofs.potofs() ), "その他を表示"
        m "a", Btn.keys_reset({}, Url.prop.potofs_hide, Mem.potofs.full()   ), "全員隠す"
      m "hr.black"
      for o in potofs
        attr = (o)->
          GUI.attrs {}, ->
            @className(if hides[o.face_id] then "filter-hide" else "")

            elem = null
            @config (_elem)-> elem = _elem
            @click ->
              hides[o.face_id] = ! hides[o.face_id]
              Url.prop.potofs_hide hides

        m ".chrbox", {key: o._id},
          GUI.portrate o.face_id, attr(o)
          m ".bar.#{o.live}",
      m "hr.black"

  writer: ->
    for o in Mem.writers.list()
      props = {form: o, log: ""}
      Mem.rule.history.merge props
      o.vdom(o, props)

win.scroll = new ScrollSpy(Url.prop.scroll)
win.scroll.tick = (center, sec)->
  if center.subid == "S"
    doc.seeing_add center._id, sec
    if 25 == doc.seeing[center._id]
      m.redraw()
win.on.scroll_end.push ->
  ScrollSpy.capture()

win.on.resize.push ->
  width = document.querySelector(\#contentframe).offsetWidth

  Url.prop.content_width width
  if width <= 770
    Url.prop.h1_width 770
  if width <= 580
    Url.prop.h1_width 580
  if width <= 458
    Url.prop.h1_width 458

  switch Url.prop.layout()
    when "right"
      Url.prop.right_width 0
    when "center"
      Url.prop.right_width (win.width - width - 4) / 2
    when "left"
      Url.prop.right_width (win.width - width - 4)

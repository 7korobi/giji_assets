

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

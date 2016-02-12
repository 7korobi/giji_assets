

export doc =
  delegate:
    tap_identity: -> console.log arguments
    tap_anchor:   -> console.log arguments
    tap_random:   -> console.log arguments
    tap_external: -> console.log arguments

  view: {}
  component: {}

  user: {}

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

  width:
    content: ->
      document.querySelector("\#contentframe").offsetWidth


  messages:
    seeing: (filter_size, center)->
      ids = Object.keys doc.seeing
      ids = _.sortBy(ids, (id)-> - doc.seeing[id] )[0 to filter_size]
      if center?.subid == "S"
        ids = _.filter(ids, (id)-> 25 < doc.seeing[id] && id != center._id)
        list = Mem.messages.finds(ids)
        list.unshift center
      else
        ids = _.filter(ids, (id)-> 25 < doc.seeing[id])
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
    story = Mem.storys.list.first
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
    {potofs_desc, potofs_order, potofs_hide} = Url.prop
    potofs = Mem.potofs.view(potofs_desc(), potofs_order()).list
    hides = potofs_hide()
    turn = win.scroll.center?.event?.turn || 0

    m ".minilist",
      m "h6", "キャラクターフィルタ"
      m "p",
        m "a", Btn.keys_reset({}, potofs_hide, []                  ), "全員表示"
        m "a", Btn.keys_reset({}, potofs_hide, Mem.potofs.others() ), "参加者表示"
        m "a", Btn.keys_reset({}, potofs_hide, Mem.potofs.potofs() ), "その他を表示"
        m "a", Btn.keys_reset({}, potofs_hide, Mem.potofs.full()   ), "全員隠す"
      m "hr.black"
      for o in potofs
        attr = (o)->
          GUI.attrs {}, ->
            @className(if hides[o.face_id] then "filter-hide" else "")

            elem = null
            @config (_elem)-> elem = _elem
            @click ->
              hides[o.face_id] = ! hides[o.face_id]
              potofs_hide hides

        m ".chrbox", {key: o._id},
          GUI.portrate o.face_id, attr(o)
          m ".bar.#{o.live}",
      m "hr.black"

  writer: ->
    for o in Mem.writers.list
      props = {form: o, log: ""}
      Mem.rule.history.merge props
      o.vdom(o, props)

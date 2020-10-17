
export change_pin = (id)->
  target = menu.scope.state()
  switch target
    when "history"
      target_at = Url.prop.memo_at
    when "memo", "talk", "home"
      target_at = Url.prop["#{target}_at"]

  if target_at
    target_at id
    Url.prop.back target

  Url.prop.scroll id
  menu.icon.change "pin"

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

  timeline: ->
    m.component doc.component.timeline, \#timeline, size: [2 * doc.width.content(), 150]

  width:
    content: ->
      document.querySelector("\#contentframe").offsetWidth

  template: (v)->
    switch
      case (t = doc.component[v.template])?
        m "div", m.component t, v
      case (t = doc.view[v.template])?
        t(v)
      else
        m ".paragraph", JSON.stringify v

  messages:
    seeing: (filter_size, center)->
      ids = Object.keys doc.seeing
      ids = _.sortBy(ids, (id)-> - doc.seeing[id] )[0 to filter_size]
      if center?.subid == "S"
        ids = _.filter(ids, (id)-> 25 < doc.seeing[id] && id != center._id)
        list = Mem.Query.messages.finds(ids)
        list.unshift center
      else
        ids = _.filter(ids, (id)-> 25 < doc.seeing[id])
        list = Mem.Query.messages.finds(ids)
      list

    pins: ({story_id,pins})->
      Mem.Query.messages.pins(story_id(), pins())
    anchor: ({talk})->
      Mem.Query.messages.anchor(talk(), win.scroll.prop())
    home: ({home})->
      Mem.Query.messages.home(home())
    talk: ({talk, open, potofs_hide, search})->
      Mem.Query.messages.talk(talk(), open(), potofs_hide(), search())
    memo: ({memo, potofs_hide, search})->
      Mem.Query.messages.memo(memo(), true, potofs_hide(), search())
    history: ({memo, potofs_hide, search})->
      Mem.Query.messages.memo(memo(), false, potofs_hide(), search())

  security_modes: (prop)->
    story = Mem.Query.storys.list.first
    mob = Mem.Query.roles.find(story?.type.mob)

    grave_caption = []
    grave_caption.push "墓下" if Mem.Query.messages.has.grave
    grave_caption.push mob.CAPTION if Mem.Query.messages.has.vsay && mob.CAPTION

    think_caption = []
    think_caption.push "独り言" if Mem.Query.messages.has.think
    think_caption.push "内緒話" if Mem.Query.messages.has.to

    list = []
    list.push m "a", Btn.set({}, prop, "all"),   "すべて"
    list.push m "a", Btn.set({}, prop, "think"), think_caption.join("/") + "つき" if think_caption.length > 0
    list.push m "a", Btn.set({}, prop, "clan"),  "仲間つき" if Mem.Query.messages.has.clan
    list.push m "a", Btn.set({}, prop, "open"),  "公開情報のみ"
    list.push m "a", Btn.set({}, prop, "main"),  "出席者のみ"
    list.push m "a", Btn.set({}, prop, "grave"), grave_caption.join("/") + "のみ" if grave_caption.length > 0
    list.push m.trust "&nbsp;"
    list.push m "a", Btn.bool({}, Url.prop.open),  "公開情報"
    list.push m "a", Btn.bool({}, Url.prop.human), "/*中の人*/"
    m "p", list

  potofs: ->
    {potofs_desc, potofs_order, potofs_hide} = Url.prop
    potofs = Mem.Query.potofs.view(potofs_desc(), potofs_order()).list
    hides = potofs_hide()
    turn = win.scroll.center?.event?.turn || 0

    m ".minilist",
      m "h6", "キャラクターフィルタ"
      m "p",
        m "a", Btn.keys_reset({}, potofs_hide, []                  ), "全員表示"
        m "a", Btn.keys_reset({}, potofs_hide, Mem.Query.potofs.others() ), "参加者表示"
        m "a", Btn.keys_reset({}, potofs_hide, Mem.Query.potofs.potofs() ), "その他を表示"
        m "a", Btn.keys_reset({}, potofs_hide, Mem.Query.potofs.full()   ), "全員隠す"
      m "hr.black"


      attr = (o)->
        cb = ->
          hides[o.face_id] = ! hides[o.face_id]
          potofs_hide hides
        elem = null

        className: (if hides[o.face_id] then "filter-hide" else "")
        config: (_elem)-> elem = _elem
        onclick: cb
        onmouseup: cb
        ontouchend: cb

      for o in potofs
        m ".chrbox", {key: o._id},
          GUI.portrate o.face_id, attr(o)
          m ".bar.#{o.live}",
      m "hr.black"

  writer: ->
    for o in Mem.Query.writers.list
      props = {form: o, log: ""}
      Mem.Collection.history.merge props
      o.vdom(o, props)

  items_module: (type)->
    console.log "deploy \#item-#{type}"
    win.mount "\#item-#{type}", -> component
    component = doc.component["item_#{type}"] =
      controller: ->
        @query = Mem.Query.items.where({type})
        switch type
          case 'rolelist'
            win.scroll.size = 10
      view: ({query})->
        win.scroll.pager "div", query.list, doc.template

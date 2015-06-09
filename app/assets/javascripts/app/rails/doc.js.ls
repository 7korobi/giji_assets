export doc =
  messages:
    seeing: ->
      Cache.messages.seeing()
    pins: ({story_id,pins})->
      Cache.messages.pins(story_id(), pins())
    anchor: ({talk})->
      Cache.messages.anchor(talk(), win.scroll.prop())
    home: ({home})->
      Cache.messages.home(home())
    talk: ({talk, open, potofs_hide, search})->
      Cache.messages.talk(talk(), open(), potofs_hide(), search())
    memo: ({memo, potofs_hide, search})->
      Cache.messages.memo(memo(), true, potofs_hide(), search())
    history: ({memo, potofs_hide, search})->
      Cache.messages.memo(memo(), false, potofs_hide(), search())

  timeline: ->
    {talk, open, potofs_hide, content_width, talk_at} = Url.prop
    GUI.timeline do
      base: Cache.messages.talk(talk(), open(), potofs_hide())
      width: content_width()
      choice: (id)->
        talk_at id
        menu.icon.change "search"
        menu.scope.change "talk"
        win.scroll.rescroll talk_at

  security_modes: (prop)->
    story = Cache.storys.list().first
    mob = RAILS.mob[story?.type.mob]

    grave_caption = []
    grave_caption.push "墓下" if Cache.messages.has.grave
    grave_caption.push mob.CAPTION if Cache.messages.has.vsay && mob.CAPTION

    think_caption = []
    think_caption.push "独り言" if Cache.messages.has.think
    think_caption.push "内緒話" if Cache.messages.has.to

    list = []
    list.push m "a", Btn.set({}, prop, "all"),   "すべて"
    list.push m "a", Btn.set({}, prop, "think"), think_caption.join("/") + "つき" if think_caption.length > 0
    list.push m "a", Btn.set({}, prop, "clan"),  "仲間つき" if Cache.messages.has.clan
    list.push m "a", Btn.set({}, prop, "open"),  "公開情報のみ"
    list.push m "a", Btn.set({}, prop, "main"),  "出席者のみ"
    list.push m "a", Btn.set({}, prop, "grave"), grave_caption.join("/") + "のみ" if grave_caption.length > 0
    list.push m.trust "&nbsp;"
    list.push m "a", Btn.bool({}, Url.prop.open),  "公開情報"
    list.push m "a", Btn.bool({}, Url.prop.human), "/*中の人*/"
    m "p", list

  potofs: ->
    potofs = Cache.potofs.view(Url.prop.potofs_desc(), Url.prop.potofs_order()).list()
    hides = Url.prop.potofs_hide()
    turn = win.scroll.center?.event?.turn || 0

    m ".minilist",
      m "h6", "キャラクターフィルタ"
      m "p",
        m "a", Btn.keys_reset({}, Url.prop.potofs_hide, []                    ), "全員表示"
        m "a", Btn.keys_reset({}, Url.prop.potofs_hide, Cache.potofs.others() ), "参加者表示"
        m "a", Btn.keys_reset({}, Url.prop.potofs_hide, Cache.potofs.potofs() ), "その他を表示"
        m "a", Btn.keys_reset({}, Url.prop.potofs_hide, Cache.potofs.full()   ), "全員隠す"
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
    for o in Cache.writers.list()
      props = {form: o, log: ""}
      Cache.rule.history.merge props
      o.vdom(o, props)


set_event_messages = (event)->
  Cache.rule.message.merge event.messages, 
    event_id: event._id
  console.log "#{event.messages.length} messages cache. (#{event._id})"

set_event_without_messages = ({_id, name, created_at, updated_at})->
  return unless created_at
  return unless updated_at
  messages = []

  if "プロローグ" == name
    messages.push do
      event_id: _id
      logid: "STORY-TEXT"
      mestype: "STORY"
      anchor: "info"
      show: RAILS.message.bit.STORY
      name: name
      log: name
      updated_at: created_at - 4

    messages.push do
      event_id: _id
      logid: "STORY-RULE"
      mestype: "STORY"
      anchor: "info"
      show: RAILS.message.bit.STORY
      name: name
      log: name
      updated_at: created_at - 3

    messages.push do
      event_id: _id
      logid: "STORY-GAME"
      mestype: "STORY"
      anchor: "info"
      show: RAILS.message.bit.STORY
      name: name
      log: name
      updated_at: created_at - 2

  messages.push do
    event_id: _id
    logid: "EVENT-ASC"
    mestype: "EVENT"
    anchor: "info"
    show: RAILS.message.bit.EVENT_ASC
    name: name
    log: name
    updated_at: created_at - 5

  messages.push do
    event_id: _id
    logid: "EVENT-DESC"
    mestype: "EVENT"
    anchor: "info"
    show: RAILS.message.bit.EVENT_DESC
    name: name
    log: name
    updated_at: updated_at - -1

  Cache.rule.message.merge messages

export catch_gon =
  face: ->
    face = Cache.map_face_detail = gon.face
    Cache.rule.map_face_story_log.set face.story_logs
    face.name = Cache.faces.find(face.face_id).name
    face.story_id_of_folders = _.groupBy face.story_ids, ([k,count])->
      k.split("-")?[0]

    face.role_of_wins = _.groupBy face.roles, ([k,count])->
      role = RAILS.gifts[k] || RAILS.roles[k] || {group: "OTHER"}
      RAILS.wins[role.group].name

  form: ->
    for o in gon.form.texts
      if o.csid_cid
        o.chr_job_id = o.csid_cid.replace("/","_").toLowerCase()

    Cache.rule.writer.set gon.form.texts

  map_reduce_faces: ->
    Cache.rule.chr_set.schema ->
      @order (o)->
        Cache.map_faces.reduce().chr_set[o._id].count

    Cache.rule.map_face.set gon.map_reduce.faces

  potofs: ->
    Cache.rule.potof.set gon.potofs,
      story_folder: gon.story?.folder
      story_type: gon.story?.type
      story_epilogue: gon.story?.is_epilogue
      event_winner: (gon.event?.winner || gon.events?.last?.winner)

  story: ->
    if gon?.story?
      Cache.rule.story.set [gon.story]
      console.log "1 story cache."

  events: ->
    for event in gon.events
      event.is_full ||= Cache.events.find(event._id)?.is_full

    Cache.rule.event.merge gon.events
    console.log "#{gon.events.length} events cache. (#{gon.story?._id})"
    #  Cache.rule.event.merge [gon.event],
    #    story_id: gon.story?._id

  messages: ->
    interval = gon.story.upd.interval * 1000 * 3600 * 24
    if gon.event.messages
      turn = gon.event.turn
      set_event_messages gon.event
      set_event_without_messages gon.event

    for event in gon.events
      console.log "#{event._id}, #{event.name}"
      if event.messages
        set_event_messages event
      if turn != event.turn
        set_event_without_messages event

    Url.prop.talk_at doc.messages.talk(Url.prop).list().first._id unless Url.prop.talk_at()
    Url.prop.memo_at doc.messages.memo(Url.prop).list().first._id unless Url.prop.memo_at()
    Url.prop.home_at doc.messages.home(Url.prop).list().first._id unless Url.prop.home_at()

export menu =
  icon:  new GUI.MenuTree.Icon
  scope: new GUI.MenuTree

menu.icon.state  = Url.prop.icon
menu.scope.state = Url.prop.scope

win.scroll = new GUI.ScrollSpy(Url.prop.scroll)
win.scroll.tick = (center)->
  if center.subid == "S"
    center.seeing = (center.seeing || 0) + 1
    Cache.messages.seeing().clear()
    if 16 == center.seeing
      m.redraw()


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
win.do.resize()


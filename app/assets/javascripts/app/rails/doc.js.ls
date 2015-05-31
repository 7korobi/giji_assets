export doc =
  timeline: ->
    GUI.timeline do
      base: Cache.messages.timeline(Url.prop.talk())
      width: Url.prop.content_width()
      choice: (id)->
        Url.prop.talk_at id
        menu.icon.change "search"
        menu.scope.change "talk"
        win.scroll.rescroll Url.prop.talk_at

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


set_event_messages = (event)->
  Cache.rule.message.merge event.messages, 
    event_id: event._id
  console.log "#{event.messages.length} messages cache. (#{event._id})"

set_event_without_messages = ({_id, name, created_at, updated_at})->
  return unless created_at
  return unless updated_at
  messages = []
  messages.push do
    event_id: _id
    name: name
    log: name
    logid: "EVENT-ASC"
    mestype: "EVENT"
    updated_at: created_at - 1

  messages.push do
    event_id: _id
    name: name
    log: name
    logid: "EVENT-DESC"
    mestype: "EVENT"
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


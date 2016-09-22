set_event_without_messages = ({_id, story_id, name, created_at, updated_at})->
  return unless created_at
  return unless updated_at
  messages = []

  if "プロローグ" == name
    messages.push do
      story_id: story_id
      logid: "STORY-TEXT"
      template: "story_text"
      mestype: "STORY"
      anchor: "info"
      show: RAILS.message.bit.STORY
      name: name
      updated_at: created_at - 4

    messages.push do
      story_id: story_id
      logid: "STORY-RULE"
      template: "story_rule"
      mestype: "STORY"
      anchor: "info"
      show: RAILS.message.bit.STORY
      name: name
      updated_at: created_at - 3

    messages.push do
      story_id: story_id
      logid: "STORY-GAME"
      template: "story_game"
      mestype: "STORY"
      anchor: "info"
      show: RAILS.message.bit.STORY
      name: name
      updated_at: created_at - 2

  messages.push do
    story_id: story_id
    logid: "EVENT-ASC"
    template: "event"
    mestype: "EVENT"
    anchor: "info"
    show: RAILS.message.bit.EVENT_ASC
    name: name
    updated_at: created_at - 100

  messages.push do
    story_id: story_id
    logid: "EVENT-DESC"
    template: "event"
    mestype: "EVENT"
    anchor: "info"
    show: RAILS.message.bit.EVENT_DESC
    name: name
    updated_at: updated_at - -100

  Mem.Collection.message.merge messages,
    event_id: _id

set_event_messages = ({_id, story_id, messages})->
  Mem.Collection.message.merge messages,
    event_id: _id
    story_id: story_id
  console.log "#{messages.length} messages cache. (#{_id})"


export catch_gon =
  face: ->
    face = Mem.map_face_detail = gon.face
    Mem.Collection.map_face_story_log.set face.story_logs
    face.name = Mem.Query.faces.find(face.face_id).name
    face.story_id_of_folders = _.groupBy face.story_ids, ([k,count])->
      k.split("-")?[0]

    face.role_of_wins = _.groupBy face.roles, ([k,count])->
      role = Mem.Query.roles.find(k) || {group: "OTHER"}
      group = role.group || "MOB"
      Mem.conf.winner["WIN_" + group].name_group

  form: ->
    for o in gon.form.texts
      if o.csid_cid
        o.chr_job_id = o.csid_cid.replace("/","_").toLowerCase()

    Mem.Collection.writer.set gon.form.texts

  items: ->
    if gon?.items?
      Mem.Collection.item.merge gon.items

  new_chrs: ->
    Mem.Collection.face.merge    gon.new_chr_faces
    Mem.Collection.chr_job.merge gon.new_chr_jobs

  map_reduce_faces: ->
    Mem.Collection.map_face.set gon.map_reduce.faces

  villages: ->
    if gon?.story?
      Mem.Collection.story.set [gon.story]
      console.log "1 story cache."

    for event in gon.events
      id = "#{event.story_id}-#{event.turn}"
      event.is_full ||= Mem.Query.events.find(id)?.is_full

    Mem.Collection.event.merge gon.events
    console.log "#{gon.events.length} events cache. (#{gon.story?._id})"

    Mem.Collection.potof.set gon.potofs,
      event_id: gon.events.last._id

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

    Url.params.talk_at = doc.messages.talk(Url.params).list.first._id unless Url.params.talk_at
    Url.params.memo_at = doc.messages.memo(Url.params).list.first._id unless Url.params.memo_at
    Url.params.home_at = doc.messages.home(Url.params).list.first._id unless Url.params.home_at

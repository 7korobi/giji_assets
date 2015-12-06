new Mem.Rule("map_face").schema ->
  @belongs_to "face", dependent: true
  @scope (all)->
    active: (order, chr_set, search)->
      order = Mem.conf.map_faces_order[order].order
      all.in(chr_set_ids: chr_set).search(search).sort "desc", (o)->
        o.win.value[order] ?= 0

  @deploy (o)->
    o._id = o.face_id
    o.win.value.合計 = o.win.all

    list = Mem.chr_jobs.face(o.face_id).list()
    if list
      search_words = list.map (o)-> o.job
      o.chr_set_ids = list.map (o)-> o.chr_set_id
    else
      search_words = o.chr_set_ids = []

    face = o.face()
    if face
      search_words.push face.name
      for sow_auth_id of o.sow_auth_id.value
        search_words.push sow_auth_id
      o.search_words = search_words.join("\t")

  item =
    count: 1
  @map_reduce (o, emit)->
    for id in o.chr_set_ids
      emit "chr_set", id, item


new Mem.Rule("map_face_story_log").schema ->
  @order (o)-> o.date.max

  @deploy (o)->
    o._id = o.logid_head
    o.folder = o.logid_head.split("-")[0].toUpperCase()

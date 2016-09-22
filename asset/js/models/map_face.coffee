new Mem.Rule("map_face").schema ->
  @belongs_to "face", dependent: true
  @scope (all)->
    active: (order, chr_set, search)->
      Mem.Query.map_faces.reduce.chr_set[o._id].count

      order = Mem.conf.map_faces_order[order].order
      all.in(chr_set_ids: chr_set).search(search).sort (o)->
        - o.win.value[order] ?= 0

  class @model extends @model
    constructor: ->
      @_id = @face_id
      @win.value.合計 = @win.all

      list = @face?.chr_jobs?.list
      if list
        search_words = list.map (o)-> o.job
        @chr_set_ids = list.map (o)-> o.chr_set_id
      else
        search_words = @chr_set_ids = []

      face = @face
      if face
        search_words.push face.name
        for sow_auth_id of @sow_auth_id.value
          search_words.push sow_auth_id
        @search_words = search_words.join("\t")

    map =
      count: 1
    @map_reduce: (o, emit)->
      console.warn o
      for id in o.chr_set_ids
        emit "chr_set", id, map


new Mem.Rule("map_face_story_log").schema ->
  @order "date.max"
  class @model extends @model
    constructor: ->
      @_id = @logid_head
      @folder = @logid_head.split("-")[0].toUpperCase()

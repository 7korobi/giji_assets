new Cache.Rule("map_face").schema ->
  @belongs_to "face", dependent: true
  @fields
    _id: (o)-> 
      o._id = o.face_id
      list = Cache.chr_jobs.face[o.face_id]
      o.chr_set_ids = 
        if list
          chr_job.chr_set_id for chr_job in list
        else
          []
      o.win.value.合計 = o.win.all

  @scope "chr_set", (o)-> o.chr_set_ids


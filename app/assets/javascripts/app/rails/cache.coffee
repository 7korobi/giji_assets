new Cache.Rule("map_face").schema ->
  @belongs_to "face"

  @order (o)-> - o.sow_auth_id.all
  @fields
    _id: (o)-> 
      o._id = o.face_id

  @scope "chr_set", (o)->
    list = Cache.chr_jobs.face[o.face_id]
    if list
      chr_job.chr_set_id for chr_job in list

Cache.rule.map_face.set gon?.map_reduce?.faces

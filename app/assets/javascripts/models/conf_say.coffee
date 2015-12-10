new Mem.Rule("say").schema ->
  enables = null

  @scope (all)->
    enable: ->
      unless enables
        enables = {}
        for say_id in Mem.conf.folder.MORPHE.config.saycnt
          enables[say_id] = true
      all.where (o)-> enables[o._id]

  @deploy (o)->
    o.say_id = o._id

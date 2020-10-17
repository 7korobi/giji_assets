new Mem.Rule("say").schema ->
  @scope (all)->
    enable: ->
      all.where _id: Mem.conf.folder.PERJURY.config.saycnt

  @deploy (o)->
    o.say_id = o._id

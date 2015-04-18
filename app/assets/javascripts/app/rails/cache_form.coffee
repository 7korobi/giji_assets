new Cache.Rule("target").schema ->
  @scope (all)->
    command: (type)->
      all
    vote: (type)->
      all
  @deploy (o)->

new Cache.Rule("command").schema ->
  @scope (all)->
    target: ->
      all.where(jst: "target")
  @deploy (o)->

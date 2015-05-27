new Cache.Rule("event").schema ->
  @order "_id"

  {visible, bit, mask} = RAILS.message

  @scope (all)->
    {}

  @deploy (o)->
    o._id ||= "#{o.story_id}-#{o.turn}"
    o.event_id = o._id

  @map_reduce (o, emit)->

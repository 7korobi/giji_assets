new Cache.Rule("event").schema ->
  @belongs_to "story", dependent: true
  @order "updated_at"

  {visible, bit, mask} = RAILS.message

  @scope (all)->
    {}

  @deploy (o)->
    o._id ||= "#{o.story_id}-#{o.turn}"
    o.event_id = o._id
    o.view =
      btn: ->
        switch
          when o.is_full
            null
          when o.is_loading
            m ".SSAY", "読み込み…"
          else
            submit = ->
              doc.load.event false, o, ->
            m ".SSAY", Btn.call({}, submit), "読み込み"



  @map_reduce (o, emit)->

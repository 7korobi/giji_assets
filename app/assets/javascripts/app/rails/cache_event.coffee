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
              o.is_loading = true
              window.requestAnimationFrame ->
                Submit.get(o.link).then (gon)->
                  catch_gon.messages()
                  o.is_loading = false
                  o.is_full = true
            m ".SSAY", Btn.call({}, submit), "読み込み"



  @map_reduce (o, emit)->

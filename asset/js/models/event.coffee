new Mem.Rule("event").schema ->
  @belongs_to "story", dependent: true
  @order "updated_at"

  {visible, bit, mask} = RAILS.message

  @scope (all)->
    {}

  class @model extends @model
    constructor: ->
      if @sow
        @winner = Mem.Query.winners.sow(@sow.winner)._id
        @event  = Mem.Query.traps.sow(@sow.event)._id

      @_id ?= "#{@story_id}-#{@turn}"
      @event_id = @_id

    btn: ->
      switch
        when @is_full
          null
        when @is_loading
          m ".SSAY", "読み込み…"
        else
          submit = =>
            doc.load.event false, @, ->
          m ".SSAY", Btn.call({}, submit), "読み込み"


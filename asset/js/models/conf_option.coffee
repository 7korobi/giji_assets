new Mem.Rule("option").schema ->
  @scope (all)->
    timeout = 1000
    all.btns = (params, list)->
      inputs = all.where(_id: list).hash
      InputTie.btns { timeout, inputs, params }

    all.form = (params, list)->
      inputs = all.where(_id: list).hash
      InputTie.form { timeout, inputs, params }

    check_vil: -> all.where (o)-> o.attr.type == 'checkbox' && o.sean == "vil"
    checkbox: -> all.where (o)-> o.attr.type == 'checkbox'
    text:    -> all.where (o)-> o.attr.type == 'text'


  @deploy (o)->
    o.option_id = o._id
    o.attr.key = o._id
    o.query ?= {}
    Input.format o

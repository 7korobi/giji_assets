new Mem.Rule("item").schema !->
  data = (rule, ary)->
    q = Mem[rule]
    if ary.length > 0
      scope = ary.shift()
      q = q[scope](...ary)
    q

  @order (o)-> o.index

  @scope (all)->

  @default ->
    list: ->
      if @query
        [rule, ...ary] = @query.split(/ +/)
        data(rule, ary).list

  @deploy (o)->
    [type, template, mestype, index] = o._id.split('-')
    o.csid ||= "all" if o.face_id
    o.type ||= type
    o.index ||= Number(index) || o.updated_at
    o.mestype ||= mestype
    o.template ||= template

    if o.object
      [rule, ...ary, key] = o.object.split(/ +/)
      o.log = data(rule, ary)[key]

  @map_reduce (o)->

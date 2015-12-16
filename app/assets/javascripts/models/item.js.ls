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
    o.mestype ||= mestype
    o.template ||= template
    o.index ||= Number(index) || o.updated_at

    if o.object
      [rule, ...ary, key] = o.object.split(/ +/)
      o.log = data(rule, ary)[key]

  @map_reduce (o)->


GUI.items_module = (type)->
  console.log "deploy \#item-#{type}"
  GUI.if_exist "\#item-#{type}", (dom)->
    query = Mem.items.where({type})
    m.mount dom,
      controller: ->
        switch type
          case 'rolelist'
            win.scroll.size = 10
      view: ->
        win.scroll.pager "div", query.list, (v)->
          doc.message[v.template](v)

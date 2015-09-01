new Cache.Rule("item").schema !->
  @order (o)-> o.index

  @deploy (o)->
    [type, template, mestype, index] = o._id.split('-')
    o.csid ||= "all" if o.face_id
    o.type ||= type
    o.mestype ||= mestype
    o.template ||= template
    o.index ||= Number(index) || o.updated_at

GUI.items_module = (type)->
  GUI.if_exist "\#item-#{type}", (dom)->
    query = Cache.items.where({type})
    m.mount dom,
      controller: ->
      view: ->
        win.scroll.pager "div", query.list(), (v)->
          GUI.message[v.template](v)

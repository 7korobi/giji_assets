
export doc =
  delegate:
    tap_identity: -> console.log arguments
    tap_anchor:   -> console.log arguments
    tap_random:   -> console.log arguments
    tap_external: -> console.log arguments

  view: {}
  component: {}

  user: {}

  seeing: {}
  seeing_add: (id, sec)->
    doc.seeing[id] = (doc.seeing[id] || 0) + sec

  load:
    event: (shortcut, event, cb)->
      if shortcut
        cb()
      else
        event.is_loading = true
        Submit.get(event.link).then (gon)->
          catch_gon.villages()
          catch_gon.messages()
          event.is_loading = false
          cb()

  timeline: ->
    m.component doc.component.timeline, \#timeline, size: [2 * doc.width.content(), 150]

  width:
    content: ->
      document.querySelector("\#contentframe").offsetWidth

  template: (v)->
    switch
      case (t = doc.component[v.template])?
        m "div", m.component t, v
      case (t = doc.view[v.template])?
        t(v)
      else
        m ".paragraph", JSON.stringify v

  messages:
    seeing: (filter_size, center)->
      ids = Object.keys doc.seeing
      ids = _.sortBy(ids, (id)-> - doc.seeing[id] )[0 to filter_size]
      if center?.subid == "S"
        ids = _.filter(ids, (id)-> 25 < doc.seeing[id] && id != center._id)
        list = Mem.Query.messages.finds(ids)
        list.unshift center
      else
        ids = _.filter(ids, (id)-> 25 < doc.seeing[id])
        list = Mem.Query.messages.finds(ids)
      list

    pins: ({story_id,pins})->
      Mem.Query.messages.pins story_id, pins
    anchor: ({talk})->
      Mem.Query.messages.anchor talk, win.scroll.prop()
    home: ({home})->
      Mem.Query.messages.home home
    talk: ({talk, open, potofs_hide, search})->
      Mem.Query.messages.talk talk, open, potofs_hide, search
    memo: ({memo, potofs_hide, search})->
      Mem.Query.messages.memo memo, true, potofs_hide, search
    history: ({memo, potofs_hide, search})->
      Mem.Query.messages.memo memo, false, potofs_hide, search

  writer: ->
    for o in Mem.Query.writers.list
      props = {form: o, log: ""}
      Mem.Collection.history.merge props
      o.vdom(o, props)

  items_module: (type)->
    console.log "deploy \#item-#{type}"
    win.mount "\#item-#{type}", -> component
    component = doc.component["item_#{type}"] =
      controller: ->
        @query = Mem.Query.items.where({type})
        switch type
          case 'rolelist'
            win.scroll.size = 10
      view: ({query})->
        win.scroll.pager "div", query.list, doc.template

doc.component.item =
  controller: (type)->
    @query = Mem.Query.items.where({type})
    switch type
      when 'rolelist'
        win.scroll.size = 10
    return
  view: ({query}, type)->
    win.scroll.pager "div", query.list, doc.template

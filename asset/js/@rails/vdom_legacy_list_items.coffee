
if gon?.villages?
  win.mount "#villages", (dom)->
      Mem.Collection.item.set gon.villages
      controller: ->
      view: ->
        win.scroll.pager "div", Mem.Query.items.list, (v)->
          doc.view.action(v)

if gon?.byebyes?
  win.mount "#byebyes", (dom)->
      Mem.Collection.item.set gon.byebyes
      controller: ->
      view: ->
        win.scroll.pager "div", Mem.Query.items.list, (v)->
          doc.view.action(v)

if gon?.history?
  win.mount "#history", (dom)->
      Mem.Collection.item.set gon.history
      controller: ->
      view: ->
        win.scroll.pager "div", Mem.Query.items.list, (v)->
          doc.view.history(v)

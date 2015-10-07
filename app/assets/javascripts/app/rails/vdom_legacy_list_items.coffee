
if gon?.villages?
  GUI.if_exist "#villages", (dom)->
    Mem.rule.item.set gon.villages
    m.mount dom,
      controller: ->
      view: ->
        win.scroll.pager "div", Mem.items.list(), (v)->
          GUI.message.action(v)

if gon?.byebyes?
  GUI.if_exist "#byebyes", (dom)->
    Mem.rule.item.set gon.byebyes
    m.mount dom,
      controller: ->
      view: ->
        win.scroll.pager "div", Mem.items.list(), (v)->
          GUI.message.action(v)

if gon?.history?
  GUI.if_exist "#history", (dom)->
    Mem.rule.item.set gon.history
    m.mount dom,
      controller: ->
      view: ->
        win.scroll.pager "div", Mem.items.list(), (v)->
          GUI.message.history(v)

/*
MenuTree v0.0.1
http://github.com/7korobi/---
(c) 7korobi
License: MIT
*/

export class MenuTree
  ->
    @g = new win.gesture do
      timeout: 200
    @g.action = ->
      do: (p)~>
        p
        .then ({message, value})~>
          val = value
          old = @state()
          if old == val
            @state ""
          else
            @state val
            @nodes[val].open( @nodes[val].menu ) if @nodes[val]
          @nodes[old].close( @nodes[old].menu ) if @nodes[old]

    @state = m.prop()
    @nodes = {}
    @change = (val)->
      @g.action(val)
      @state()

  # open / close event.
  open: (node = @nodes[@state()])->
    node.open( node.menu ) if node

  start: (mark, style)->
    style.class ?= ""
    style.class += " icon-#{mark}"
    @g.menu mark, @state(), style

  view: (node = @nodes[@state()])->
    if node
      [ m.component node
        node.menu.view()
      ]
    else
      []

  each: (order, cb)->
    for item in order
      node = @nodes[item]
      continue unless node
      cb(node)

  radio: (style, prop, reduce_base, field_name, name_cb)->
    caption_vdom = (name, val)->
      [ m "span", name
        m "span.emboss.pull-right", val
      ]

    reduce = reduce_base[field_name]
    data = {}
    order_by = {}
    list = Object.keys reduce
    for key in list
      size = reduce[key].count
      name = name_cb key, reduce[key]
      order_by[key] = size
      data[key] = caption_vdom name, size

    unless data.all
      list.push "all"
      size = reduce_base.all.all.count
      order_by.all = size
      data.all = caption_vdom "- 全体 -", size

    order = list.sort (a,b)->
      order_by[b] - order_by[a]

    for key in order
      attr = @g.menu key, prop(), style
      caption = data[key]
      m "span", attr, caption

  node: (id, options)->
    @nodes[id] ?= new MenuNode(id, options)

class MenuTree.Drill extends MenuTree
  drill: (id, options)->
    node = @node(id, options)

  drills: (style, order)->
    @each order, (drill)~>
      m "span.btn", @start(style, drill.id),
        drill.caption
        m "span.note", "▼"

class MenuTree.Icon extends MenuTree
  icon: (id, options)->
    node = @node(id, options)

    if @state() == id
      []
    else
      @view node

class MenuNode
  (@id, options)->
    @menu = new MenuTree.Drill()
    for key, val of options
      @[key] = val
    @controller ?= ~>
      @menu

    @deploy(@menu)

  caption: ""
  deploy: ->
  open:   ->
  close:  ->
  view:   -> []

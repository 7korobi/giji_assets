
class GUI.MenuTree
  constructor: ->
    @state = m.prop()
    @nodes = {}
    @change = (val)=>
      old = @state()
      return old unless arguments.length

      @state val
      if old != val
        @nodes[val].open( @nodes[val].menu )  if @nodes[val]
        @nodes[old].close( @nodes[old].menu ) if @nodes[old]

  # open / close event.
  start: (style, mark)->
    style.key = "start-#{mark}"
    Btn.menu style, @change, mark

  cancel: (style)->
    style.key = "cancel-#{mark}"
    Btn.set style, @change, ""

  node: (state)->
    node = @nodes[state]
    if state != @state()
      node.view(node.menu)

  view: (node = @nodes[@state()])->
    if node
      [ node.view(node.menu)
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

    Btns.radio style, prop, data, order

  node: (id, options)->
    @nodes[id] ?= new GUI.MenuNode(id, options)

class GUI.MenuTree.Drill extends GUI.MenuTree
  drill: (id, options)->
    node = @node(id, options)

  drills: (style, order)->
    @each order, (drill)=>
      m "span.btn", @start(style, drill.id),
        drill.caption
        m "span.note", "▼"

class GUI.MenuTree.Icon extends GUI.MenuTree
  icon: (id, options)->
    node = @node(id, options)

    if @state() == id
      []
    else
      @view node

class GUI.MenuNode
  constructor: (@id, options)->
    @menu = new GUI.MenuTree.Drill()
    for key, val of options
      @[key] = val

    @deploy(@menu)

  caption: ""
  deploy: ->
  open:   ->
  close:  ->
  view:   -> []

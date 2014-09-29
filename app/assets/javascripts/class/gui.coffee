GUI = 
  img_head: "http://7korobi.gehirn.ne.jp/images/"
  portrate: (face_id)->
    m "img", 
      src: GUI.img_head + "/portrate/#{face_id}.jpg"

  title: (width, theme, day_or_night)->
    m "img",
      src: GUI.img_head + "/banner/title#{width}" + RAILS.head_img[width][theme][day_or_night]

  header_style_p: ""
  header: (keys)->
    style = keys.join(" ")
    html = document.documentElement
    html.className = html.className.replace GUI.header_style_p, style
    GUI.header_style_p = style

  attrs: (dsl)->
    o = {}
    act = (cb)->
      (e)->
        cb(e)
        e.preventDefault()

    list_cmds =
      class: (str)->
        o.class = str
      start: (cb)->
        o.onmousedown = act(cb)
        o.ongesturestart = act(cb)
        o.ontouchstart = act(cb)
      move: (cb)->
        o.onmousemove = act(cb)
        o.ongesturechange = act(cb)
        o.ontouchmove = act(cb)
      end: (cb)->
        o.onmouseup = act(cb)
        o.ongestureend = act(cb)
        o.ontouchend = act(cb)
    dsl.call list_cmds
    o

  inline_item: (cb)->
    inline_item_span = (align, em, vdom)->
      m "li",
        style: "width:#{em}em; text-align:#{align};"
      , vdom
    list_cmds =
      center: (em, vdom)-> inline_item_span "center", em, vdom
      right:  (em, vdom)-> inline_item_span "right", em, vdom

    m "ul.mark.inline", cb.call(list_cmds)


  letter: (head, vdom)->
    [ m "h3.mesname",
        m "b", head
      m "p.text", vdom
    ]

  chrs: (chrs, headline, cb)->
    [ m "hr.black"
      m ".mark", headline
      for o in chrs
        m ".chrbox", [
          GUI.portrate o.face._id
          m ".chrblank", cb(o, o.face)
        ]
      m "hr.black"
    ]


  do_tick: (cb)->
    action = ->
      m.startComputation()
      tick = cb(_.now())
      if tick
        setTimeout ->
          action()
        , tick
      m.endComputation()
    action()

  if_exist: (id, cb)->
    win.on.load.push ->
      dom = document.getElementById(id)
      cb(dom) if !!dom && cb

  comma: (num)->
    (String Math.round num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

  name:
    config: (o)->
      RAILS.roles[o]?.name || RAILS.gifts[o]?.name || RAILS.events[o]?.name || o || ""


class GUI.TouchMenu
  constructor: ->
    @state = m.prop(false)

  start: ->
    state = @state
    GUI.attrs ->
      @start ->
        state ! state()

  cancel: ->
    state = @state
    GUI.attrs ->
      @end ->
        state false

  btn: (prop, val)->
    state = @state
    GUI.attrs ->
      if prop
        @end ->
          state false
          prop val
        if val == prop()
          @class "btn btn-success"
        else
          @class "btn btn-default"

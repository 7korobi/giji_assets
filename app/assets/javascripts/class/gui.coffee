GUI = 
  img_head: "//7korobi.gehirn.ne.jp/images/"
  portrate: (face_id)->
    m "img", 
      src: GUI.img_head + "/portrate/#{face_id}.jpg"

  title: (width, theme, day_or_night)->
    m "img",
      src: GUI.img_head + "/banner/title#{width}" + RAILS.head_img[width]?[theme]?[day_or_night]

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
        cb = act(cb)
        o.onmousedown = cb
        o.ongesturestart = cb
        o.ontouchstart = cb
      move: (cb)->
        cb = act(cb)
        o.onmousemove = cb
        o.ongesturechange = cb
        o.ontouchmove = cb
      end: (cb)->
        cb = act(cb)
        o.onmouseup = cb
        o.ongestureend = cb
        o.ontouchend = cb
    dsl.call list_cmds
    o

  inline_item: (cb)->
    inline_item_span = (align, em, vdom)->
      m "li",
        style: "width:#{em}em; text-align:#{align};"
      , vdom
    list_cmds =
      center: (em, vdom...)-> inline_item_span "center", em, vdom
      right:  (em, vdom...)-> inline_item_span "right", em, vdom

    m "ul.mark.inline", cb.call(list_cmds)


  letter: (style, head, vdom...)->
    [ m "h3.mesname",
        m "b", head
      m "p.text.#{style}", vdom
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
      m.redraw()
      tick = cb(_.now())
      if tick
        setTimeout ->
          action()
        , tick
    action()

  if_exist: (query, cb)->
    win.on.load.push ->
      dom = document.querySelector(query)
      cb(dom) if !!dom && cb

  comma: (num)->
    (String Math.round num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

  name:
    config: (o)->
      RAILS.roles[o]?.name || RAILS.gifts[o]?.name || RAILS.events[o]?.name || o || ""

  names:
    config: (list, cb)->
      hash = {}
      for key in list
        hash[key] ||= 0
        hash[key] += 1
      for key, size of hash
        cb GUI.name.config(key), size

  message:
    say: (v)->
      m "table.say.#{v.mestype}",
        m "tbody",
          m "tr", [
            m "td.img",
              GUI.portrate v.face_id

            m "td.field",
              m ".msg", [
                GUI.letter v.style, m.trust(v.name), m.trust(v.log)
                m "p.mes_date",
                  m "span.mark", v.anchor
              ]
          ]

    action: (v)->
      v.updated_timer ||= new Timer v.updated_at,
        prop: m.prop()
      m ".#{v.mestype}",
        m ".action", [
          m "p.text.#{v.style}", [
            m "b", m.trust v.name
            "は、"
            m.trust v.log
          ]
          m "p.mes_date", v.updated_timer.prop()
        ]



class GUI.TouchMenu
  constructor: (@menus)->
    @state = m.prop(false)

  by_menu: ->
    hash = {}
    for menu of @menus
      prop = @prop[menu]()
      hash[menu] = [prop] if @finder.reduce[menu][prop]
    @finder.where hash

  menu_set: (@finder, @prop, sort_by, @menus)->
    menu_item = (caption_func, item_func)=>
      menu = @state()
      prop = @prop[menu]
      reduce = @finder.reduce[menu]
      keys = Object.keys(reduce).sort (a,b)-> 
        reduce[b][sort_by] - reduce[a][sort_by]

      [ unless reduce.all? && caption_func "all", reduce.all
          o = @finder.reduce._all.all
          item_func o[sort_by], @btn(prop, "all"), "- すべて -"
        for key in keys
          o = reduce[key]
          caption = caption_func key, o
          continue unless caption
          item_func o[sort_by], @btn(prop, key), caption
      ]

    @helper = 
      btn_group: (caption_func)->
        menu_item caption_func, (size, btn, caption)->
          m "a", btn,
            m "span.badge", size
            m "span", caption

      btn_list: (caption_func)->
        m "ul",
          menu_item caption_func, (size, btn, caption)->
            m "li.btn-block", btn,
              m "span.badge", size
              m "span", caption

  menu: (options, vdom...)->
    menu_cb = @menus[@state()]
    if menu_cb
      vdom.push m ".drag", m ".contentframe", menu_cb.call(@helper)

    m ".pagenavi.choice.guide.form-inline", options, vdom

  start: (mark)->
    state = @state
    GUI.attrs ->
      @start ->
        state( mark != state() && mark )

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

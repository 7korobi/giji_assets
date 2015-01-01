class GUI.TouchMenu
  @icons = new @

  constructor: (@menus = {})->
    @state = m.prop(false)

  menu_set: (@prop, sort_by, @menus)->
    menu_item = (caption_func, item_func)=>
      menu = @state()
      prop = @prop[menu]
      reduce = @query.reduce()[menu]
      return [] unless reduce?

      keys = Object.keys(reduce).sort (a,b)-> 
        reduce[b][sort_by] - reduce[a][sort_by]

      [ unless reduce.all? && caption_func "all", reduce.all
          o = @query.reduce().all.all

          btn = @btn(prop, "all")
          btn.key = "all"
          item_func o[sort_by], btn, "-全体-"
        for key in keys
          o = reduce[key]
          caption = caption_func key, o
          continue unless caption

          btn = @btn(prop, key)
          btn.key = key
          item_func o[sort_by], btn, caption
      ]

    @helper = 
      btn_group: (em, caption_func)->
        menu_item caption_func, (size, btn, caption)->
          btn.style = "width: #{em}em;"
          m "a", btn,
            m "span", caption
            m "span.badge.pull-right", size

      btn_list: (caption_func)->
        m "ul",
          menu_item caption_func, (size, btn, caption)->
            m "li.btn-block", btn,
              m "span", caption
              m "span.badge.pull-right", size

  menu_of = (o)->
    o.menus[o.state()]
  menu: (vdom...)->
    menu_cb = menu_of(@)
    if menu_cb && ! @icon_key
      vdom.push m ".drag", m ".contentframe", menu_cb.call(@helper, @)
    vdom

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

  basic_btn = (state, prop, key, cb)->
    GUI.attrs ->
      if prop
        @end ->
          state false
          prop key
        val = prop()
        if cb(key, val)
          @className "btn btn-success"
        else
          @className "btn btn-default"

  btn: (prop, key, serializer)-> 
    basic_btn @state, prop, key, (key, val)->
      if serializer
        key = serializer key
        val = serializer val
      key == val

  toggle: (prop)->
    basic_btn @state, prop, !prop(), (key, val)-> val

  badge: (@icon_key, badge_cb)->
    if badge_cb?
      GUI.TouchMenu.icons.badge[@icon_key] = badge_cb
    else
      delete GUI.TouchMenu.icons.badge[@icon_key]

  icon: (@icon_key, menu_cb)->
    if menu_cb?
      menu_cb.menu = @
      GUI.TouchMenu.icons.menus[@icon_key] = menu_cb
    else
      delete GUI.TouchMenu.icons.menus[@icon_key]

  @icons.badge = {}
  @icons.menu = (vdom...)->
    set_menu = (o, cb)->
      return unless cb
      vdom.push cb.call(o.helper, o)
    menu_cb = menu_of(@)
    if menu_cb
      o = menu_cb.menu
      set_menu(o, menu_cb)
      set_menu(o, menu_of(o))
    if vdom.length
      m ".drag", m ".contentframe", vdom

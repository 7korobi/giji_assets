class GUI.TouchMenu
  @icons = new @

  constructor: (@menus = {})->
    @state = m.prop(false)

  by_menu: ->
    hash = {}
    for menu of @menus
      prop = @prop[menu]()
      hash[menu] = [prop] if @all.reduce[menu][prop]
    @all.where hash

  menu_set: (@all, @prop, sort_by, @menus)->
    menu_item = (caption_func, item_func)=>
      menu = @state()
      prop = @prop[menu]
      reduce = @all.reduce[menu]
      keys = Object.keys(reduce).sort (a,b)-> 
        reduce[b][sort_by] - reduce[a][sort_by]

      [ unless reduce.all? && caption_func "all", reduce.all
          o = @all.reduce._all.all
          item_func o[sort_by], @btn(prop, "all"), "-全体-"
        for key in keys
          o = reduce[key]
          caption = caption_func key, o
          continue unless caption
          item_func o[sort_by], @btn(prop, key), caption
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

  menu: (vdom...)->
    menu_cb = @menus[@state()]
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

  icon: (@icon_key, menu_cb)->
    GUI.TouchMenu.icons.menus[@icon_key] = 
      cb: menu_cb
      menu: @

  @icons.menu = (vdom...)->
    item = @menus[@state()]
    if item
      o = item.menu
      vdom.push item.cb.call(o.helper, o)

      # sub-menu section
      menu_cb = o.menus[o.state()]
      if menu_cb
        vdom.push menu_cb.call(o.helper, o)
    vdom

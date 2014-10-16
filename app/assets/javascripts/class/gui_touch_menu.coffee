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
      vdom.push m ".drag", m ".contentframe", menu_cb.call(@helper, @)

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

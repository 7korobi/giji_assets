Tie = require "./tie"


setting = (list...)->
  tooltip:   list.find((o)-> o.tooltip   )?.tooltip || null
  className: list.map( (o)-> o.className ).join " "


menuicon = (value, attr, { badge })->
  m "a.menuicon", attr,
    m "span.icon-#{value}"
    m ".emboss.pull-right", badge() if badge


bigicon = (value, attr, { badge })->
  m "section", attr,
    m ".bigicon",
      m "span.icon-#{value}"
    m ".badge.pull-right", badge() if badge


icon = { menuicon, bigicon }


icon_tag = (params, btn, o)->
  (value, attr = {})->
    { _id, options } = o

    now_val = params[_id]
    bool = value == now_val

    tag = attr.tag || "menuicon"
    option = options[value]
    attr = btn bool, _id, value, setting attr, option, o.attr
    icon[tag] value, attr, option



radio_item = (params, org_attr, o)->
  (value, attr = {})->
    { _id, type } = o

    val = Mem.unpack[type]
    uri = Mem.pack[type]
    now_val = params[_id]
    attr.value = uri value
    attr.checked = "checked" if now_val == val value
    attr = _.assign attr, org_attr
    setting attr, o.attr

    m "input", attr



checkbox_btn = (params, btn, o)->
  (attr = {})->
    { _id, name } = o

    now_val = params[_id]
    attr = btn now_val, _id, ! now_val, setting attr, o.attr
    m "span", attr, name


checkbox = (params, attr, o)->
  ->
    { _id } = o

    now_val = params[_id]
    attr.checked = "checked" if now_val

    setting o.attr

    m "input", attr



select_multi_btn = (params, btn, o)->
  (data)->
    { _id, options } = o

    now_vals = params[_id]
    for value, option of options when ! option.hidden
      bool = now_vals[value]
      attr = btn bool, _id, value, setting option, o.attr
      m "span", attr,
        data option
        m ".emboss.pull-right", option.badge() if option.badge


select_multi = (params, attr, o)->
  (data)->
    { _id, name, options, current } = o

    now_vals = params[_id]
    now_option = options[now_val]
    m 'select', attr,
      for value, option of options when ! option.hidden
        selected = if now_vals[value] then "selected" else null
        key = value
        m 'option', { selected, value, key },
          data option



select_btn = (params, btn, o)->
  (data)->
    { _id, attr: {required}, options, current } = o

    now_val = params[_id]
    list =
      for value, option of options when ! option.hidden
        bool = value == now_val
        attr = btn bool, _id, value, setting option, o.attr
        m "span", attr,
          data option
          m ".emboss.pull-right", option.badge() if option.badge

    unless required && current
      attr = btn "" == now_val, _id, null, setting o.attr, { className: "icon-cancel-alt" }
      list.unshift m "span", attr, ""
    list


select = (params, attr, o)->
  (data)->
    { _id, name, options, current } = o

    now_val = params[_id]
    now_option = options[now_val]
    selected = if now_option then null else "selected"

    setting o.attr

    m 'select', attr,
      unless attr.required && current
        m 'option', { selected, value: "", key: name },
          "- #{name} -"
      for value, option of options when ! option.hidden
        selected = if (now_val == option._id) then "selected" else null
        key = value
        m 'option', { selected, value, key },
          data option



checkboxes = (params, attr, o)->
  (value)->
    { _id, type } = o

    val = Mem.unpack[type]
    uri = Mem.pack[type]
    now_vals = params[_id]
    attr.name = "[#{_id}]#{value}"
    attr.checked = "checked" if now_vals[value]

    setting o.attr

    m "input", attr



input = (params, attr, o)->
  ->
    { _id } = o

    now_val = params[_id]
    attr.value = now_val

    setting o.attr

    m "input", attr


textarea = (params, attr, o)->
  ->
    { _id } = o

    now_val = params[_id]

    setting o.attr

    m "textarea", attr, now_val


h_label = (params, o)->
  ->
    { name, label_attr } = o

    m "label", label_attr, name

h_header = (params, o)->
  ->
    { name } = o

    m "h6", name


labeler = (params, o)->
  (help)->
    { _id, label_attr, options, help_on, help_off } = o

    now_val = params[_id]
    m "label", label_attr,
      if help && now_val
        if options
          help options[now_val]
        else
          help now_val
      if help_on || help_off
        if now_val
          help_on
        else
          help_off


submit_form = (tie, attr)->
  (label)->
    css =  ".btn"
    css += ".edge" unless tie.disabled
    css += ".active" if tie.disabled

    attr = _.assign attr,
      type: "submit"
      disabled: tie.disabled
    m "button#{css}", attr, label

submit_btn = (tie, attr)->
  submit = attr.onsubmit or (e)-> tie.do_submit()
  (label)->
    css =  ".btn"
    css += ".edge" unless tie.disabled
    css += ".active" if tie.disabled

    attr = _.assign attr,
      type: "button"
      disabled: tie.disabled
      onclick: submit
      onmouseup: submit
      ontouchend: submit
    m "button#{css}", attr, label


form_attr = (tie, { attr })->
  _.assign attr,
    disabled: tie.disabled
    onsubmit: (e)->
      tie.do_submit()
      false

change_attr = (val, tie, { _id, attr })->
  ( setting )->
    _.assign {}, attr, setting,
      disabled: tie.disabled
      onblur:     (e)-> tie.do_blur   _id, e
      onfocus:    (e)-> tie.do_focus  _id, e
      onchange:   (e)-> tie.do_change _id, val e
      onselect:   (e)-> tie.do_select _id, e
      oninvalid:  (e)-> tie.do_fail   _id, val e

input_attr = (val, tie, { _id, attr })->
  ( setting )->
    _.assign {}, attr, setting,
      disabled: tie.disabled
      onblur:    (e)-> tie.do_blur   _id, e
      onfocus:   (e)-> tie.do_focus  _id, e
      oninput:   (e)-> tie.do_change _id, val e
      onselect:  (e)-> tie.do_select _id, e
      oninvalid: (e)-> tie.do_fail   _id, val e

btn_attr = (val, tie, b)->
  (bool, _id, new_val, { className, tooltip })->
    onchange = ->
      return if b.timer
      tie.do_change _id, val bool, new_val
      debounce b
      .catch ->
        b.timer = null

    css = "btn"
    css += " edge" unless tie.disabled
    css += " active" if bool
    css += " " + className if className

    "data-tooltip": tooltip
    className: css
    onclick: onchange
    onmouseup: onchange
    ontouchend: onchange


c_icon      = (bool, new_val)-> if bool then null else new_val
c_tap       = (bool, new_val)-> new_val
e_checked   = (e)-> (e.currentTarget || @).checked
e_value     = (e)-> (e.currentTarget || @).value
e_selected  = (e)->
  list = (e.currentTarget || @).selectedOptions
  news = {}
  for option in list
    news[option.value] = true
  news


debounce = (o)->
  o.timer = true
  new Promise (_, ng)=>
    m.startComputation()
    o.timer = setTimeout ->
      ng "reset #{ o.timeout }ms "
    , o.timeout


class InputTie
  do_change: (id, value)->
    if @params[id] == value
      @stay id, value
    else
      @change id, value, @params[id]
      @params[id] = value

    d =
      if @check()
        !! @timer
      else
        false
    @disable @disabled = d unless @disabled == d
    m.endComputation()

  do_fail: (id, e)->
    unless @disabled
      @disable @disabled = true

  do_blur: (id, e)->
    @focus id, false

  do_focus: (id, e)->
    @focus id, true, @focus_id
    @focus_id = id
    @focused = @input[id]

  do_select: (id, e)->
    s = getSelection()
    { anchorOffset, focusOffset } = s
    offsets = [anchorOffset, focusOffset].sort()
    @select id, s.toString(), offsets

  do_submit: ->
    return if @timer
    return unless @check()
    console.log "do_submit"

    p_timer = debounce @

    p_action = value = @action()
    unless @action.then?
      p_action = new Promise (ok)-> ok value

    @on()
    Promise.race [p_timer, p_action]
    .then ()=>
      clearTimeout @timer
    .catch (@message)=>
      console.log @message
    .then ()=>
      @off()
      m.endComputation()

  action: ->
  check:  -> true
  disable: (id, b)->
  focus:   (id, b, old_id)->
  stay:    (id, value)->
  change:  (id, value, old_value)->
  select:  (id, str, offsets)->

  off: ->
    @disabled = false
    @disable false
    @timer = null

  on: ->
    @disabled = true
    @disable true

  cancel: ->
    clearTimeout @timer
    @off()

  submit_for: (attr)->
    if @form
      submit_form @, attr
    else
      submit_btn @, attr

  input_for: (options)->
    Input.format options
    new Input @, options

  init_submit: ({@form})->
    @submit = @submit_for {}
    @

  constructor: ({ @timeout, @params, ids })->
    @off()
    @input = {}

    @tie = Tie.build_input ids, @params, @, Input
    @prop = @tie.prop

  @form = (params, ids)->
    { timeout } = Input
    new InputTie { timeout, ids, params }
    .init_submit
      form: (attr, vdom...)->
        m "form", form_attr(@, attr), vdom

  @btns = (params, ids)->
    { timeout } = Input
    new InputTie { timeout, ids, params }
    .init_submit {}


class Input
  @timeout = 1000

  constructor: (tie, o)->
    params = tie.params
    now_val = -> tie.params[o._id]

    @timeout ?= 200
    @parent = tie
    @label = labeler params, o
    @head  = h_label params, o

    switch o.attr.type
      when "tree"
        btn = btn_attr c_icon, tie, @
        @head = h_header params, o
        @item = icon_tag params, btn, o
        switch o.attr.style
          when "icon"
            sub = {}
            @sub = =>
              compo = sub[ now_val() ]
              if compo
                m.component compo
              else
                null

            @icon = (value, option)=>
              sub[ value ] = option
            @start = (value, attr)=>
              attr

      when "btns"
        btn = btn_attr c_tap,      tie, @
        @head = h_header params, o
        if o.attr.multiple
          @field = select_multi_btn params, btn, o
        else
          @field = select_btn params, btn, o

      when "checkbox_btn"
        btn = btn_attr c_tap,      tie, @
        @head = h_header params, o
        @field = checkbox_btn params, btn, o

      when "select"
        if o.attr.multiple
          attr = change_attr e_selected, tie, o
          @field = select_multi params, attr, o

        else
          attr = change_attr e_value, tie, o
          @field = select params, attr, o

      when "radio"
        attr = change_attr e_value, tie, o
        @item = radio_item params, attr, o

      when "checkbox"
        attr = change_attr e_checked, tie, o
        @field = checkbox params, attr, o

      when "textarea"
        attr = input_attr e_value, tie, o
        @field = textarea params, attr, o

      else
        attr = input_attr e_value, tie, o
        @field = input params, attr, o

  @format = (o)->
    o.label_attr ?= {}
    o.type ?= "String"
    if o.attr?.name
      o.attr.id ?= o.attr.name
      o.label_attr.for = o.attr.name

    for _id, caption of o.options
      continue if caption._id?
      o.options[_id] =
        if "object" == typeof caption
          caption._id = _id
          caption
        else
          { _id, caption }

    switch o.attr.type
      when "checkbox_btn", "checkbox"
        o.type = "Bool"
      when "number"
        o.type = "Number"


module.exports = { Input, InputTie }

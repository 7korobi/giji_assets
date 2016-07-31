Tie = require "./tie"
m = require "mithril"
_ = require "lodash"


menuicon = (icon, attr, option)->
  m "a.menuicon", attr,
    m "span.icon-#{icon}"
    m ".emboss.pull-right", option.badge() if option.badge


bigicon = (icon, attr, option)->
  m "section", attr,
    m ".bigicon",
      m "span.icon-#{icon}"
    m ".badge.pull-right", option.badge() if option.badge


icon = { menuicon, bigicon }


icon_item = (params, btn, o)->
  (value, attr = {})->
    { _id, options } = o

    now_val = params[_id]
    option = options[value]

    tag = attr.tag || "menuicon"

    ma = btn _id, o.attr, attr, option,
      className: [option?.className, attr.className, o.attr.className].join(" ")
      selected: value == now_val
      value:    value
    # data-tooltip, disabled
    icon[tag] value, ma, option



btn_item = (params, btn, o)->
  (value, attr = {})->
    { _id, options } = o

    now_val = params[_id]
    option = options[value]

    label = option.label

    ma = btn _id, o.attr, attr, option,
      className: [option?.className, attr.className, o.attr.className].join(" ")
      selected: value == now_val
      value:    value
    # data-tooltip, disabled
    m "span", ma,
      label
      m ".emboss.pull-right", option.badge() if option.badge


radio_item = (params, change, o)->
  (value, attr = {})->
    { _id, type, options } = o

    now_val = params[_id]
    option = options?[value]

    val = Mem.unpack[type]
    uri = Mem.pack[type]

    ma = change _id, o.attr, attr, option,
      className: [option?.className, attr.className, o.attr.className].join(" ")
      type: "radio"
      name: o.attr.name || _id
      value: uri value
      checked: (now_val == val value)
    # data-tooltip, disabled
    m "input", ma


checkbox_multi_item = (params, change, o)->
  (value, attr = {})->
    { _id, type, options } = o

    # TODO: change value for Set
    now_vals = params[_id]
    option = options[value]

    val = Mem.unpack[type]
    uri = Mem.pack[type]

    ma = change _id, o.attr, attr, option,
      className: [option.className, attr.className, o.attr.className].join(" ")
      type: "checkbox"
      name: "[#{_id}]#{value}"
      value: uri value
      checked: now_vals[value]
    # data-tooltip, disabled
    m "input", ma


checkbox_btn = (params, btn, o)->
  (attr = {})->
    { _id, name } = o

    now_val = params[_id]

    ma = btn _id, o.attr, attr,
      className: [attr.className, o.attr.className].join(" ")
      selected: now_val
      value:    now_val
    # data-tooltip, disabled
    m "span", ma, name


checkbox = (params, change, o)->
  (attr = {})->
    { _id, type } = o

    now_val = params[_id]

    val = Mem.unpack[type]
    uri = Mem.pack[type]

    ma = change _id, o.attr, attr,
      className: [attr.className, o.attr.className].join(" ")
      type: "checkbox"
      name: o.attr.name || _id
      value: uri now_val
      checked: now_val
    # data-tooltip, disabled
    m "input", ma


select_multi_btn = (params, btn, o)->
  (attr = {})->
    { _id, options } = o

    # TODO: change value for Set
    now_vals = params[_id]

    for value, option of options when ! option.hidden
      label = option.label

      ma = btn _id, o.attr, attr, option,
        className: [option.className, attr.className, o.attr.className].join(" ")
        selected: now_vals[value]
        value:    now_vals[value]
      # data-tooltip, disabled
      m "span", ma,
        label
        m ".emboss.pull-right", option.badge() if option.badge


select_multi = (params, change, o)->
  option_call = option_attr()
  (attr = {})->
    { _id, type, name, options, current } = o

    # TODO: change value for Set
    now_vals = params[_id]

    val = Mem.unpack[type]
    uri = Mem.pack[type]

    m 'select', change(),
      for value, option of options when ! option.hidden
        ma = option_call o.attr, attr, option,
          className: [option.className, attr.className, o.attr.className].join(" ")
          selected: now_vals[value]
          value: uri value
        # label, disabled
        m 'option', ma


select_btn = (params, btn, o)->
  (attr = {})->
    { _id, options, current } = o

    now_val = params[_id]

    list =
      for value, option of options when ! option.hidden
        label = option.label

        ma = btn _id, o.attr, attr, option,
          className: [option.className, attr.className, o.attr.className].join(" ")
          selected: value == now_val
          value: value
        # data-tooltip, disabled
        m "span", ma,
          label
          m ".emboss.pull-right", option.badge() if option.badge

    unless o.attr.required && current
      ma = btn _id, o.attr, attr
        className: [attr.className, o.attr.className, "icon-cancel-alt"].join(" ")
        selected: ! now_val
        value: null
        "data-tooltip": "選択しない"
      list.unshift m "span", ma, ""
    list


select = (params, change, o)->
  option_call = option_attr()
  (attr = {})->
    { _id, type, name, options, current } = o

    now_val = params[_id]

    val = Mem.unpack[type]
    uri = Mem.pack[type]

    list =
      for value, option of options when ! option.hidden
        label = option.label

        ma = option_call o.attr, attr, option,
          className: option.className
          selected: value == now_val
          value: uri value
        # label, disabled
        m 'option', ma

    unless o.attr.required && current
      ma = option_call o.attr, attr, option,
        className: option.className
        selected: ! now_val
        label: "- #{name} -"
        value: uri null
      # disabled
      list.unshift m 'option', ma

    ma = change _id, o.attr, attr,
      className: [attr.className, o.attr.className].join(" ")
      name: o.attr.name || _id
    # data-tooltip, disabled
    m 'select', ma, list



input = (params, area, o)->
  (attr = {})->
    { _id } = o

    now_val = params[_id]

    ma = area _id, o.attr, attr,
      className: [attr.className, o.attr.className].join(" ")
      name: o.attr.name || _id
      value: now_val
    # data-tooltip, disabled
    m "input", ma


textarea = (params, area, o)->
  (attr = {})->
    { _id } = o

    now_val = params[_id]

    ma = area _id, o.attr, attr,
      className: [attr.className, o.attr.className].join(" ")
      name: o.attr.name || _id
    # data-tooltip, disabled
    m "textarea", ma, now_val


h_label = (params, o)->
  (attr = {})->
    { name, label_attr } = o

    ma = _.assignIn label_attr, attr
    m "label", ma, name

h_header = (params, o)->
  (attr = {})->
    { name, label_attr } = o

    ma = _.assignIn label_attr, attr
    m "h6", ma, name


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
    tag =  "button.btn"
    tag += ".edge" unless tie.disabled
    tag += ".active" if tie.disabled

    ma = _.assignIn attr,
      type: "submit"
      disabled: tie.disabled
    m tag, ma, label

submit_btn = (tie, attr)->
  submit = attr.onsubmit or (e)-> tie.do_submit()
  (label)->
    tag =  "button.btn"
    tag += ".edge" unless tie.disabled
    tag += ".active" if tie.disabled

    ma = _.assignIn attr,
      type: "button"
      disabled: tie.disabled
      onclick: submit
      onmouseup: submit
      ontouchend: submit
    m tag, ma, label


form_attr = (tie, { attr })->
  ma = _.assignIn attr,
    disabled: tie.disabled
    onsubmit: (e)->
      tie.do_submit()
      false


option_pick = (attrs)->
  attrs = attrs.map (ma)->
    target = ["id", "className", "selected", "disabled", "value", "label"]
    target.push "badge" if ma.badge
    _.pick ma, target
  _.assignIn attrs...

input_pick = (attrs, last)->
  _.assignIn {}, attrs..., last

btn_pick = (attrs, last)->
  attrs = attrs.map (ma)->
    target = ["id", "className"]
    target.push "title" if ma.title
    target.push "data-tooltip" if ma["data-tooltip"]?
    _.pick ma, target
  _.assignIn attrs..., last


option_attr = (val, tie)->
  ( _id, attrs... )->
    option_pick attrs

change_attr = (val, tie)->
  ( _id, attrs... )->
    input_pick attrs,
      disabled: tie.disabled
      onblur:     (e)-> tie.do_blur   _id, e
      onfocus:    (e)-> tie.do_focus  _id, e
      onchange:   (e)-> tie.do_change _id, val e
      onselect:   (e)-> tie.do_select _id, e
      oninvalid:  (e)-> tie.do_fail   _id, val e

input_attr = (val, tie)->
  ( _id, attrs... )->
    input_pick attrs,
      disabled: tie.disabled
      onblur:    (e)-> tie.do_blur   _id, e
      onfocus:   (e)-> tie.do_focus  _id, e
      oninput:   (e)-> tie.do_change _id, val e
      onselect:  (e)-> tie.do_select _id, e
      oninvalid: (e)-> tie.do_fail   _id, val e

btn_attr = (val, tie, b)->
  ( _id, attrs..., o )->
    { className, disabled, selected, value } = o
    onchange = ->
      return if b.timer
      debounce b
      .catch ->
        b.timer = null
      tie.do_change _id, val selected, value

    css = "btn"
    css += " edge" unless disabled || tie.disabled
    css += " active" if selected
    css += " " + className if className

    btn_pick attrs,
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
  new Promise (_, ng)->
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
  constructor: (tie, o)->
    params = tie.params

    @timeout ?= 100
    @parent = tie
    @label = labeler params, o
    @head  = h_label params, o

    now_val = -> tie.params[o._id]

    switch o.attr.type
      when "icon"
        btn = btn_attr c_icon, tie, @
        @head = h_header params, o
        @item = icon_item params, btn, o

      when "btns"
        btn = btn_attr c_tap, tie, @
        @head = h_header params, o
        @item = btn_item params, btn, o
        if o.attr.multiple
          @field = select_multi_btn params, btn, o
        else
          @field = select_btn params, btn, o

      when "checkbox_btn"
        btn = btn_attr c_tap, tie, @
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


  @timeout: 1000

  @format: (o)->
    o.label_attr ?= {}
    o.type ?= "String"
    if o.attr?.name
      o.attr.id ?= o.attr.name
      o.label_attr.for = o.attr.name

    for _id, label of o.options
      continue if label._id?
      o.options[_id] =
        if "object" == typeof label
          label._id = _id
          label
        else
          { _id, label }

    switch o.attr.type
      when "checkbox_btn", "checkbox"
        o.type = "Bool"
      when "number"
        o.type = "Number"


module.exports = { Input, InputTie }

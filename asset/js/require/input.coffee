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
  (value, m_attr = {})->
    { _id, options, attr } = o

    now_val = params[_id]
    option = options[value]

    tag = m_attr.tag || "menuicon"

    ma = btn _id, attr, m_attr, option,
      className: [option?.className, m_attr.className, attr.className].join(" ")
      selected: value == now_val
      value:    value
    # data-tooltip, disabled
    icon[tag] value, ma, option



btn_item = (params, btn, o)->
  (value, m_attr = {})->
    { _id, options, attr } = o

    now_val = params[_id]
    option = options[value]

    label = option.label

    ma = btn _id, attr, m_attr, option,
      className: [option?.className, m_attr.className, attr.className].join(" ")
      selected: value == now_val
      value:    value
    # data-tooltip, disabled
    m "span", ma,
      label
      m ".emboss.pull-right", option.badge() if option.badge


radio_item = (params, change, o)->
  (value, m_attr = {})->
    { _id, type, options, attr } = o

    now_val = params[_id]
    option = options?[value]

    val = Mem.unpack[type]
    uri = Mem.pack[type]

    ma = change _id, attr, m_attr, option,
      className: [option?.className, m_attr.className, attr.className].join(" ")
      type: "radio"
      name: attr.name || _id
      value: uri value
      checked: (now_val == val value)
    # data-tooltip, disabled
    m "input", ma


checkbox_multi_item = (params, change, o)->
  (value, m_attr = {})->
    { _id, type, options, attr } = o

    # TODO: change value for Set
    now_vals = params[_id]
    option = options[value]

    val = Mem.unpack[type]
    uri = Mem.pack[type]

    ma = change _id, attr, m_attr, option,
      className: [option.className, m_attr.className, attr.className].join(" ")
      type: "checkbox"
      name: "[#{_id}]#{value}"
      value: uri value
      checked: now_vals[value]
    # data-tooltip, disabled
    m "input", ma


checkbox_btn = (params, btn, o)->
  (m_attr = {})->
    { _id, name, attr } = o

    now_val = params[_id]

    ma = btn _id, attr, m_attr,
      className: [attr.className, attr.className].join(" ")
      selected: now_val
      value:    now_val
    # data-tooltip, disabled
    m "span", ma, name


checkbox = (params, change, o)->
  (m_attr = {})->
    { _id, type, attr } = o

    now_val = params[_id]

    val = Mem.unpack[type]
    uri = Mem.pack[type]

    ma = change _id, attr, m_attr,
      className: [attr.className, attr.className].join(" ")
      type: "checkbox"
      name: attr.name || _id
      value: uri now_val
      checked: now_val
    # data-tooltip, disabled
    m "input", ma


select_multi_btn = (params, btn, o)->
  (m_attr = {})->
    { _id, options, attr } = o

    # TODO: change value for Set
    now_vals = params[_id]

    for value, option of options when ! option.hidden
      label = option.label

      ma = btn _id, attr, m_attr, option,
        className: [option.className, m_attr.className, attr.className].join(" ")
        selected: now_vals[value]
        value:    now_vals[value]
      # data-tooltip, disabled
      m "span", ma,
        label
        m ".emboss.pull-right", option.badge() if option.badge


select_multi = (params, change, o)->
  option_call = option_attr()
  (m_attr = {})->
    { _id, type, name, options, current, attr } = o

    # TODO: change value for Set
    now_vals = params[_id]

    val = Mem.unpack[type]
    uri = Mem.pack[type]

    m 'select', change(),
      for value, option of options when ! option.hidden
        ma = option_call attr, m_attr, option,
          className: [option.className, m_attr.className, attr.className].join(" ")
          selected: now_vals[value]
          value: uri value
        # label, disabled
        m 'option', ma, ma.label


select_btn = (params, btn, o)->
  (m_attr = {})->
    { _id, options, current, attr } = o

    now_val = params[_id]

    list =
      for value, option of options when ! option.hidden
        label = option.label

        ma = btn _id, attr, m_attr, option,
          className: [option.className, m_attr.className, attr.className].join(" ")
          selected: value == now_val
          value: value
        # data-tooltip, disabled
        m "span", ma,
          label
          m ".emboss.pull-right", option.badge() if option.badge

    unless attr.required && current
      ma = btn _id, attr, m_attr
        className: [attr.className, attr.className, "icon-cancel-alt"].join(" ")
        selected: ! now_val
        value: null
        "data-tooltip": "選択しない"
      list.unshift m "span", ma, ""
    list


select = (params, change, o)->
  option_call = option_attr()
  (m_attr = {})->
    { _id, type, name, options, current, attr } = o

    now_val = params[_id]

    val = Mem.unpack[type]
    uri = Mem.pack[type]

    list =
      for value, option of options when ! option.hidden
        label = option.label

        ma = option_call attr, m_attr, option,
          className: option.className
          selected: value == now_val
          value: uri value
        # label, disabled
        m 'option', ma, ma.label

    unless attr.required && current
      ma = option_call attr, m_attr, option,
        className: option.className
        selected: ! now_val
        label: "- #{name} -"
        value: uri null
      # disabled
      list.unshift m 'option', ma, ma.label

    ma = change _id, attr, m_attr,
      className: [attr.className, attr.className].join(" ")
      name: attr.name || _id
    # data-tooltip, disabled
    m 'select', ma, list



input = (params, area, o)->
  (m_attr = {})->
    { _id, attr } = o

    now_val = params[_id]

    ma = area _id, attr, m_attr,
      className: [attr.className, attr.className].join(" ")
      name: attr.name || _id
      value: now_val
    # data-tooltip, disabled
    m "input", ma


textarea = (params, area, o)->
  (m_attr = {})->
    { _id, attr } = o

    now_val = params[_id]

    ma = area _id, attr, m_attr,
      className: [attr.className, attr.className].join(" ")
      name: attr.name || _id
    # data-tooltip, disabled
    m "textarea", ma, now_val


h_label = (params, o)->
  (m_attr = {})->
    { name, label_attr, attr } = o

    ma = _.assignIn label_attr, m_attr
    m "label", ma, name

h_header = (params, o)->
  (m_attr = {})->
    { name, label_attr, attr } = o

    ma = _.assignIn label_attr, m_attr
    m "h6", ma, name


labeler = (params, o)->
  ->
    { _id, options, info, attr, label } = o

    now_val = params[_id]
    if info
      text = info.label if info.label
      text = info.off   if info.off   && ! now_val
      text = info.on    if info.on    && now_val
      text = info.valid if info.valid && now_val
      m "label", label.attr, text


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
  tie.do_view null, {}
  submit = attr.onsubmit or (e)->
    tie.do_submit()
    false
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
    config: mithril_config tie
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

change_attr = (val, tie, b)->
  ( _id, attrs... )->
    ma = input_pick attrs,
      config: mithril_config tie, _id
      disabled: tie.disabled
      onblur:     (e)-> tie.do_blur   _id, e
      onfocus:    (e)-> tie.do_focus  _id, e
      onselect:   (e)-> tie.do_select _id, e
      onchange:   (e)-> tie.do_change _id, val(e), ma
      oninvalid:  (e)-> tie.do_fail   _id, val(e), ma

input_attr = (val, tie, b)->
  ( _id, attrs... )->
    ma = input_pick attrs,
      config: mithril_config tie, _id
      disabled: tie.disabled
      onblur:    (e)-> tie.do_blur   _id, e
      onfocus:   (e)-> tie.do_focus  _id, e
      onselect:  (e)-> tie.do_select _id, e
      oninput:   (e)-> tie.do_change _id, val(e), ma
      oninvalid: (e)-> tie.do_fail   _id, val(e), ma

btn_attr = (val, tie, b)->
  ( _id, attrs..., o )->
    { className, disabled, selected, value, attr } = o
    onchange = ->
      return if b.timer
      debounce b
      .catch ->
        b.timer = null
      tie.do_change _id, val(selected, value), ma

    css = "btn"
    css += " edge" unless disabled || tie.disabled
    css += " active" if selected
    css += " " + className if className

    ma = btn_pick attrs,
      config: mithril_config tie, _id
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

mithril_config = (tie, _id)->
  (elem, isNew, context)->
    if isNew
      tie.do_view _id, elem
      context.onunload = ->
        tie.did_view _id, elem

debounce = (o)->
  o.timer = true
  new Promise (_, ng)->
    o.timer = setTimeout ->
      ng "reset #{ o.timeout }ms "
    , o.timeout


class InputTie
  did_view: (id, elem)->
    if id
      @input[id].do_view null, null
    else
      @dom = null

  do_view: (id, elem)->
    elem.validity ?=
      valid: true
    elem.checkValidity ?= ->
      console.warn "#{id} button validity"
      @validity.valid
    elem.setCustomValidity ?= (@validationMessage)->
      console.warn "#{id} button set error #{@validationMessage}"
      if @validationMessage
        @validity.customError = true
        @validity.valid = false
      else
        @validity.customError = false
        @validity.valid = true

    if id
      @input[id].do_view elem
    else
      @dom = elem

  do_change: (id, value, attr)->
    if @params[id] == value
      @stay id, value
    else
      @change id, value, @params[id]
      @params[id] = value

    @input[id].do_change value, attr
    @validate @input[id], value, attr

    @disabled = !! @timer

  do_fail: (id, value)->

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
    return unless @dom.checkValidity()
    console.log "do_submit"

    p_timer = debounce @

    p_action = value = @action()
    unless @action.then?
      p_action = new Promise (ok)-> ok value

    @on()
    m.redraw()
    Promise.race [p_timer, p_action]
    .then ()=>
      clearTimeout @timer
    .catch (@message)=>
      console.log @message
    .then ()=>
      @off()
      m.redraw()

  validate: (input, value, attr)->
  action: ->
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

  errors: (cb)->
    for id, { dom } of @input when dom
      if dom.validationMessage
        cb dom.validationMessage

  infos: (cb)->
    for id, { info_msg } of @input when info_msg
      cb info_msg

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

validity_attr =
  valid: "valid"
  valueMissing: "required"
  typeMismatch: "type"
  patternMismatch: "pattern"
  rangeUnderflow: "min"
  rangeOverflow: "max"
  stepMismatch: "step"
  tooLong: "maxlength"
  tooShort: "minlength"

custom_validity = (validity, key, text)->
  return null unless validity
  validity[validity_attr[key]] || text

class Input
  do_view: (@dom)->
  do_change: (value, { minlength, maxlength, min, max, step, pattern, type, required })->
    if @dom
      @info ""
      @error ""
      @dom.checkValidity()
      if minlength && 0 < value.length < minlength
        # for firefox, safari.
        unless Input.skip_minlength
          @error custom_validity @format.error, "tooShort", "このテキストは #{minlength} 文字以上で指定してください（現在は #{value.length} 文字です）。"
      if @format.error
        for key, val of @dom.validity when val
          @error custom_validity @format.error, key

  info: (@info_msg = "")->
  error: (msg = "")->
    @dom?.setCustomValidity msg

  constructor: (tie, format)->
    @format = format
    @tie    = tie
    params  = tie.params

    @timeout ?= 100
    @label = labeler params, format
    @head  = h_label params, format

    now_val = -> tie.params[format._id]

    switch format.attr.type
      when "icon"
        btn = btn_attr c_icon, tie, @
        @head = h_header params, format
        @item = icon_item params, btn, format

      when "btns"
        btn = btn_attr c_tap, tie, @
        @head = h_header params, format
        @item = btn_item params, btn, format
        if format.attr.multiple
          @field = select_multi_btn params, btn, format
        else
          @field = select_btn params, btn, format

      when "checkbox_btn"
        btn = btn_attr c_tap, tie, @
        @head = h_header params, format
        @field = checkbox_btn params, btn, format

      when "select"
        if format.attr.multiple
          attr = change_attr e_selected, tie, @
          @field = select_multi params, attr, format

        else
          attr = change_attr e_value, tie, @
          @field = select params, attr, format

      when "radio"
        attr = change_attr e_value, tie, @
        @item = radio_item params, attr, format

      when "checkbox"
        attr = change_attr e_checked, tie, @
        @field = checkbox params, attr, format

      when "textarea"
        attr = input_attr e_value, tie, @
        @field = textarea params, attr, format

      else
        attr = input_attr e_value, tie, @
        @field = input params, attr, format


  @timeout: 1000

  @format: (o)->
    o.label ?= {}
    o.label.attr ?= {}
    o.type ?= "String"
    if o.attr?.name
      o.attr.id ?= o.attr.name
      o.label.attr.for = o.attr.name

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

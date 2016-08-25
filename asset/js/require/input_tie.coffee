Tie = require "./tie"
m = require "mithril"
_ = require "lodash"


label_head = (params, join, o)->
  (m_attr = {})->
    { name } = o

    ma = join m_attr
    m "label", ma, name

h6_head = (params, join, o)->
  (m_attr = {})->
    { name } = o

    ma = join m_attr
    m "h6", ma, name


form_submit = (tie, attr)->
  (label)->
    tag =  "button.btn"
    tag += ".edge" unless tie.disabled
    tag += ".active" if tie.disabled

    ma = _.assignIn attr,
      type: "submit"
      disabled: tie.disabled
    m tag, ma, label

btn_submit = (tie, attr)->
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

label_attr = (val, tie, b)->
  ( _id, attrs...)->
    _.assignIn attrs...

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
      @validity.valid
    elem.setCustomValidity ?= (@validationMessage)->
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

  bundle: (format)->
    InputTie.format format
    type = InputTie.type[format.attr.type]
    type = type.multiple if format.attr.multiple
    @input[format._id] = new type @, format

  init_submit: ({@form})->
    @submit =
      if @form
        form_submit @, {}
      else
        btn_submit  @, {}
    @

  constructor: ({ @timeout, @params, ids })->
    console.info "construct for #{ids}"
    @off()
    @input = {}
    @tie = Tie.build_input ids, @params, @
    @prop = @tie.prop

  @form: (params, ids)->
    { timeout } = Input
    new InputTie { timeout, ids, params }
    .init_submit
      form: (attr, vdom...)->
        m "form", form_attr(@, attr), vdom

  @btns: (params, ids)->
    { timeout } = Input
    new InputTie { timeout, ids, params }
    .init_submit {}

  @format: (o)->
    o.label ?= {}
    o.label.attr ?= {}
    o.type ?= "String"
    if o.attr?.name
      o.attr.id ?= o.attr.name
      o.label.attr.for = o.attr.name

    for _id, label of o.options when ! label._id
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

  @type = {}

validity_attr =
  valid: "valid"
  valueMissing: "required"
  typeMismatch: "type"
  patternMismatch: "pattern"
  rangeUnderflow: "min"
  rangeOverflow: "max"
  stepMismatch: "step"
  tooLines: "max_line"
  tooLong: "maxlength"
  tooShort: "minlength"
  hasSecret: "not_secret"
  hasPlayer: "not_player"

custom_validity = (validity, key, text)->
  return text unless validity
  validity[validity_attr[key]] || text


class Input
  do_view: (@dom)->
  do_change: (value, attr)->
    if @dom
      @info ""
      @error ""
      @dom.checkValidity()

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

    now_val = -> tie.params[format._id]

    attr_label = @_attr_label @_value, tie, @
    @label = @_label params, attr_label, format if @_label
    @head  = @_head  params, attr_label, format if @_head
    @foot  = @_foot  params, attr_label, format if @_foot

    attr_item  = @_attr @_value, tie, @
    @item  = @_item  params, attr_item, format if @_item
    @field = @_field params, attr_item, format if @_field
    return

  @timeout: 1000
  timeout: 100
  calc: {}
  _head:  label_head
  _attr_label: label_attr
  _label: (params, join, o)->
    (m_attr = {})=>
      { _id, options, info, attr, label } = o

      now_val = params[_id]

      if @label_for
        if options
          option = options[now_val]
          if option && @label_for
            return @label_for option
      if info
        text = info.label if info.label
        text = info.off   if info.off   && ! now_val
        text = info.on    if info.on    && now_val
        text = info.valid if info.valid && now_val
        ma = join _id, m_attr, label.attr
        m "label", ma, text


basic_field = (params, area, o)->
  (m_attr = {})->
    { _id, attr } = o

    now_val = params[_id]

    ma = area _id, attr, m_attr,
      className: [attr.className, attr.className].join(" ")
      name: attr.name || _id
      value: now_val
    # data-tooltip, disabled
    m "input", ma

class basic_input extends Input
  _value: e_value
  _attr:  input_attr
  _field: basic_field


text_point = (size)->
  pt = 20
  pt += (size - 50)/14 if 50 < size
  Math.floor pt

text_foot = (params, join, o)->
  (m_attr = {})=>
    { _id, attr } = o

    if @calc.point
      mark = m "span.emboss", "#{@calc.point}pt "
    else
      mark = ""
    if ! @dom || @dom.validationMessage
      mark = m "span.WSAY.emboss", "⊘"

    ma = join _id, attr, m_attr
    [
      mark
      " #{@calc.sjis}"
      m "sub", "/#{ma.max_sjis}" if ma.max_sjis
      m "sub", "字"
      " #{@calc.line}"
      m "sub", "/#{ma.max_line}" if ma.max_line
      m "sub", "行"
    ]

text_change = (value, { not_secret, not_player, unit, max_sjis, max_line, minlength, maxlength, min, max, step, pattern, type, required })->
  if @dom
    @info ""
    @error ""
    @dom.checkValidity()

    line = value.split("\n").length
    sjis = value.sjis_length
    if "point" == unit
      point = text_point sjis
    @calc = { point, line, sjis }

    if not_secret && match_secret = value.match />>[\=\*\!]\d+/g
      @error custom_validity @format.error, "hasSecret", "あぶない！秘密会話へのアンカーがあります！"

    if not_player && match_player = value.match /\/\*|\*\//g
      @error custom_validity @format.error, "hasPlayer", "/*中の人の発言があります。*/"

    if max_line && max_line < line
      @error custom_validity @format.error, "tooLines", "このテキストを #{max_line} 行以下にしてください。"

    if max_sjis && max_sjis < sjis
      @error custom_validity @format.error, "tooLong", "このテキストを #{max_sjis} 文字以下にしてください。"

    if minlength && 0 < value.length < minlength
      # for firefox, safari.
      unless InputTie.skip_minlength
        @error custom_validity @format.error, "tooShort", "このテキストは #{minlength} 文字以上で指定してください（現在は #{value.length} 文字です）。"

    if @format.error
      for key, val of @dom.validity when val
        @error custom_validity @format.error, key

class text_input extends Input
  do_change: text_change
  _value: e_value
  _attr:  input_attr
  _foot:  text_foot
  _field: basic_field
  calc:
    sjis: 0
    line: 0


for key in ["hidden", "tel", "password", "datetime", "date", "month", "week", "time", "datetime-local", "number", "range", "color"]
  InputTie.type[key] = basic_input

for key in ["text", "search", "url", "email"]
  InputTie.type[key] = text_input


class InputTie.type.textarea extends Input
  do_change: text_change
  _value: e_value
  _attr:  input_attr
  _foot:  text_foot
  calc:
    sjis: 0
    line: 0
  _field: (params, area, o)->
    (m_attr = {})->
      { _id, attr } = o

      now_val = params[_id]

      ma = area _id, attr, m_attr,
        className: [attr.className, attr.className].join(" ")
        name: attr.name || _id
      # data-tooltip, disabled
      m "textarea", ma, now_val


class InputTie.type.checkbox extends Input
  _value: e_checked
  _attr:  change_attr
  _field: (params, change, o)->
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


class InputTie.type.radio extends Input
  _value: e_value
  _attr:  change_attr
  _item:  (params, change, o)->
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


class InputTie.type.select extends Input
  _value: e_value
  _attr:  change_attr
  _field: (params, change, o)->
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


class InputTie.type.select.multiple extends Input
  _value: e_value
  _attr:  change_attr
  _field: (params, change, o)->
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


class InputTie.type.checkbox_btn extends Input
  _head:  h6_head
  _value: c_tap
  _attr:  btn_attr
  _field: (params, btn, o)->
    (m_attr = {})->
      { _id, name, attr } = o

      now_val = params[_id]

      ma = btn _id, attr, m_attr,
        className: [attr.className, attr.className].join(" ")
        selected: now_val
        value:    now_val
      # data-tooltip, disabled
      m "span", ma, name


class InputTie.type.icon extends Input
  _head:  h6_head
  _value: c_icon
  _attr:  btn_attr
  _item:  (params, btn, o)->
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
      tags[tag] value, ma, option

  menuicon = (icon, attr, option)->
    m "a.menuicon", attr,
      m "span.icon-#{icon}"
      m ".emboss.pull-right", option.badge() if option.badge

  bigicon = (icon, attr, option)->
    m "section", attr,
      m ".bigicon",
        m "span.icon-#{icon}"
      m ".badge.pull-right", option.badge() if option.badge

  tags = { menuicon, bigicon }


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


class InputTie.type.btns extends Input
  _head:  h6_head
  _value: c_tap
  _attr:  btn_attr
  _item:  btn_item
  _field: (params, btn, o)->
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

class InputTie.type.btns.multiple extends Input
  _head:  h6_head
  _value: c_tap
  _attr:  btn_attr
  _item:  btn_item
  _field: (params, btn, o)->
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

module.exports = InputTie

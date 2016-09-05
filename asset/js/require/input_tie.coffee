Tie = require "./tie"
Mem = require "memory-record"
m = require "mithril"
_ = require "lodash"


submit_pick = (attrs...)->
  _.assignIn attrs...

input_pick = (attrs, last)->
  _.assignIn {}, attrs..., last

option_pick = (attrs...)->
  attrs = attrs.map (ma)->
    target = ["id", "className", "selected", "disabled", "value", "label"]
    target.push "badge" if ma.badge
    _.pick ma, target
  _.assignIn attrs...


_attr_form = (tie, { attr })->
  ma = _.assignIn attr,
    config: tie._config()
    disabled: tie.disabled
    onsubmit: (e)->
      tie.do_submit()
      false

_attr_label = ( _id, attrs...)->
  { _value, tie } = b = @
  _.assignIn attrs...


change_attr = ( _id, attrs... )->
  { _value, tie } = b = @
  @attr = ma = input_pick attrs,
    config: tie._config _id
    disabled: tie.disabled
    onblur:     (e)-> tie.do_blur   _id, e
    onfocus:    (e)-> tie.do_focus  _id, e
    onselect:   (e)-> tie.do_select _id, e
    onchange:   (e)-> tie.do_change _id, _value(e), ma
    oninvalid:  (e)-> tie.do_fail   _id, _value(e), ma

input_attr = ( _id, attrs... )->
  { _value, tie } = b = @
  @attr = ma = input_pick attrs,
    config: tie._config _id
    disabled: tie.disabled
    onblur:    (e)-> tie.do_blur   _id, e
    onfocus:   (e)-> tie.do_focus  _id, e
    onselect:  (e)-> tie.do_select _id, e
    oninput:   (e)-> tie.do_change _id, _value(e), ma
    oninvalid: (e)-> tie.do_fail   _id, _value(e), ma

e_checked   = (e)-> (e.currentTarget || @).checked
e_value     = (e)-> (e.currentTarget || @).value
e_selected  = (e)->
  list = (e.currentTarget || @).selectedOptions
  news = {}
  for option in list
    news[option.value] = true
  news

_debounce = ->
  @timer = true
  new Promise (_, ng)=>
    @timer = setTimeout =>
      ng "reset #{ @timeout }ms "
    , @timeout


class InputTie
  timeout: 1000

  _debounce: _debounce
  _config: (_id)->
    (elem, isNew, context)=>
      if isNew
        @do_view _id, elem
        context.onunload = =>
          @do_view _id

  do_view: (id, elem)->
    if id
      if elem
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

      @input[id].do_view elem
    else
      @dom = elem

  do_change: (id, value)->
    input = @input[id]
    value = Mem.unpack[input.format.type] value
    old = @params[id]
    if old == value
      @stay id, value
    else
      @params[id] = value
      @change id, value, old

    input.do_change value

    @disabled = !! @timer

  do_fail: (id, value)->
    input = @input[id]
    value = Mem.unpack[input.format.type] value

    input.do_fail value

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

    p_timer = @_debounce()

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

  submit: (children...)->
    tag =  "button.btn"
    tag += ".edge" unless @disabled
    tag += ".active" if @disabled

    ma = @_submit_attr null, {}
    m tag, ma, children...

  draw: ->
    for input in inputs
      input.draw()
    for draw in @_draw
      draw()

  do_draw: (cb)->
    @_draw.push cb

  bundle: (format)->
    InputTie.format format
    type = InputTie.type[format.attr.type]
    type = type.multiple if format.attr.multiple
    @input[format._id] = new type @, format

  _submit: ({@form})->
    attr = {}
    @_submit_attr =
      if @form
        (__, attr)->
          submit_pick attr,
            type: "submit"
            disabled: @disabled
      else
        (__, attr)->
          @do_view null, {}
          submit = (e)=>
            @do_submit()
            false

          submit_pick attr,
            type: "button"
            disabled: @disabled
            onclick: submit
            onmouseup: submit
            ontouchend: submit
    @

  constructor: ({ @params, ids })->
    console.info "construct for #{ids}"
    @off()
    @_draw = []
    @input = {}
    @tie = Tie.build_input ids, @params, @
    @prop = @tie.prop

  @form: (params, ids)->
    new InputTie { ids, params }
    ._submit
      form: (attr, vdom...)->
        m "form", _attr_form(@, attr), vdom

  @btns: (params, ids)->
    new InputTie { ids, params }
    ._submit {}

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
      when "stack"
        o.type = "Array"
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


class basic_input
  _attr_label: _attr_label
  _value: e_value
  _attr:  input_attr

  _debounce: _debounce
  timeout: 100

  default_option:
    className: "icon-cancel-alt"
    label:     ""
    "data-tooltip": "選択しない"

  constructor: (@tie, @format)->
    { @_id, @options, @attr, @type, @name } = @format
    @__uri = Mem.pack[@type]
    @__val = Mem.unpack[@type]

  draw: ->
    { info, label } = @format
    @__name = @attr.name || @_id
    @__value = @tie.params[@_id]

  info: (@info_msg = "")->
  error: (msg = "")->
    @dom?.setCustomValidity msg

  do_view: (@dom)->

  do_fail: (value)->

  do_change: (value)->
    { not_secret, not_player, unit, max_sjis, max_line, minlength, maxlength, min, max, step, pattern, type, required } = @attr

    if @dom && ! @dom.validity.customError
      # @dom.validity.checkValidity()
      if @format.error
        for key, val of @dom.validity when val
          msg = @format.error[validity_attr[key]]
          if msg
            @error msg
            return

  option: (value)->
    if value
      @options?[value] || {}
    else
      @default_option

  item: (value, m_attr = {})->
    option = @option value
    ma = option_pick @attr, m_attr, option,
      className: [option.className, m_attr.className].join(" ")
      value: @__uri value
      selected: value == @__value
      # label, disabled
    m 'option', ma, ma.label

  datalist: (m_attr = {})->
    throw "not implement"

  head: (m_attr = {})->
    ma = @_attr_label m_attr
    m "label", ma, @name

  label: (m_attr = {})->
    if @label_for
      if @options
        option = @options[@__value]
        if option
          return @label_for option
    if info
      text = info.label if info.label
      text = info.off   if info.off   && ! @__value
      text = info.on    if info.on    && @__value
      text = info.valid if info.valid && @__value
      ma = @_attr_label @_id, m_attr, @format.label.attr
      m "label", ma, text

  field: (m_attr = {})->
    ma = @_attr @_id, @attr, m_attr,
      className: [@attr.className, m_attr.className].join(" ")
      name:  @__name
      value: @__value
    # data-tooltip, disabled
    m "input", ma

for key in ["hidden", "tel", "password", "datetime", "date", "month", "week", "time", "datetime-local", "number", "range", "color"]
  InputTie.type[key] = basic_input


class InputTie.type.checkbox extends basic_input
  _value: e_checked
  _attr:  change_attr
  field: (m_attr = {})->
    ma = @_attr @_id, @attr, m_attr,
      className: [@attr.className, m_attr.className].join(" ")
      type: "checkbox"
      name:  @__name
      value: @__uri @__value
      checked: @__value
    # data-tooltip, disabled
    m "input", ma


class InputTie.type.radio extends basic_input
  _value: e_value
  _attr:  change_attr
  field: (m_attr = {})->
    list =
      for value, option of @options when ! option.hidden
        @item value, m_attr

    unless attr.required && current
      list.unshift @item "", m_attr
    list

  item: (value, m_attr = {})->
    option = @option value
    ma = @_attr @_id, @attr, m_attr, option,
      className: [@attr.className, option.className, m_attr.className].join(" ")
      type: "radio"
      name:  @__name
      value: @__uri @__value
      checked: (value == @__val @__value)
    # data-tooltip, disabled
    m "input", ma,
      option.label
      m ".emboss.pull-right", option.badge() if option.badge


class InputTie.type.select extends basic_input
  _value: e_value
  _attr:  change_attr
  default_option:
    className: ""
    label:　"ーーー"

  field: (m_attr = {})->
    list =
      for value, option of @options when ! option.hidden
        @item value, m_attr

    unless attr.required && current
      list.unshift @item "", m_attr
      # disabled

    ma = @_attr @_id, @attr, m_attr,
      className: [@attr.className, m_attr.className].join(" ")
      name: @__name
    # data-tooltip, disabled
    m 'select', ma, list


class InputTie.type.select.multiple extends basic_input
  _value: e_selected
  _attr:  change_attr
  field: (m_attr = {})->
    ma = @_attr @_id, @attr, m_attr,
      className: [@attr.className, m_attr.className].join(" ")
      name: @__name
    # data-tooltip, disabled
    m 'select', ma,
      for value, option of @options when ! option.hidden
        @item value

  item: (value, m_attr = {})->
    option = @option value
    ma = option_pick @attr, m_attr, option,
      className: [option.className, m_attr.className].join(" ")
      value: @__uri value
      selected: @__value[value]
      # label, disabled
    m 'option', ma, ma.label

module.exports = InputTie

require "./input_tie_text"
require "./input_tie_btn"

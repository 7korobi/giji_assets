InputTie = require './input_tie'
m = require "mithril"
_ = require "lodash"


_pick = (attrs, last)->
  attrs = attrs.map (ma)->
    target = ["id", "className"]
    target.push "title" if ma.title
    target.push "data-tooltip" if ma["data-tooltip"]?
    _.pick ma, target
  _.assignIn attrs..., last

c_stack = (bool, new_val, target)->
  if target
    new_val.push target
  else
    new_val.pop()
  new_val

c_icon      = (bool, new_val)-> if bool then null else new_val
c_tap       = (bool, new_val)-> new_val


class btn_input extends InputTie.type.hidden
  _attr: ( _id, attrs..., last )->
    { _value, tie } = b = @
    { className, disabled, selected, value, target, attr } = last
    onchange = ->
      return if b.timer
      b._debounce()
      .catch ->
        b.timer = null
      now_val = _value selected, value, target
      tie.do_change _id, now_val, ma
      tie.do_fail   _id, now_val, ma unless b.dom.validity.valid

    css = "btn"
    css += " edge" unless disabled || tie.disabled
    css += " active" if selected
    css += " " + className if className

    @attr = ma = _pick attrs,
      config: tie._config _id
      className: css
      onclick: onchange
      onmouseup: onchange
      ontouchend: onchange

  do_change: (value)->
    { pattern, required } = @attr

    if @dom
      if required && ! value
        error = "このフィールドを入力してください。"

      if pattern && value.match new Regexp pattern
        error = "指定されている形式で入力してください。"

      @error error
    super

  head: (m_attr = {})->
    { name } = @format

    ma = @_attr_label m_attr
    m "h6", ma, name


class InputTie.type.checkbox_btn extends btn_input
  _value: c_tap
  field: (m_attr = {})->
    { _id, name, attr } = @format

    now_val = @tie.params[_id]

    ma = @_attr _id, attr, m_attr,
      className: [attr.className, attr.className].join(" ")
      selected: now_val
      value:    now_val
    # data-tooltip, disabled
    m "span", ma, name


class InputTie.type.icon extends btn_input
  _value: c_icon
  field: null
  with: (value, mode)->
    { _id, attr } = @format

    now_val = @tie.params[_id]
    bool = now_val == value

    switch mode
      when bool
        @_with[value]()
      when ! bool
        null        
      else
        @_with = {}
        @_with[value] = mode

  item: (value, m_attr = {})->
    { _id, attr } = @format

    now_val = @tie.params[_id]
    option = @options[value]

    tag = m_attr.tag || "menuicon"

    ma = @_attr _id, attr, m_attr, option,
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


item = (value, m_attr = {})->
  { _id, attr } = @format

  now_val = @tie.params[_id]
  option = @options[value]
  label = option.label

  ma = @_attr _id, attr, m_attr, option,
    className: [option?.className, m_attr.className, attr.className].join(" ")
    selected: value == now_val
    value:    value
  # data-tooltip, disabled
  m "span", ma,
    label
    m ".emboss.pull-right", option.badge() if option.badge


class InputTie.type.btns extends btn_input
  _value: c_tap
  item:  item
  field: (m_attr = {})->
    { _id, current, attr } = @format

    now_val = @tie.params[_id]

    list =
      for value, option of @options when ! option.hidden
        label = option.label

        ma = @_attr _id, attr, m_attr, option,
          className: [option.className, m_attr.className, attr.className].join(" ")
          selected: value == now_val
          value: value
        # data-tooltip, disabled
        m "span", ma,
          label
          m ".emboss.pull-right", option.badge() if option.badge

    unless attr.required && current
      ma = @_attr _id, attr, m_attr,
        className: [attr.className, attr.className, "icon-cancel-alt"].join(" ")
        selected: ! now_val
        value: null
        "data-tooltip": "選択しない"
      list.unshift m "span", ma, ""
    list


class InputTie.type.btns.multiple extends btn_input
  _value: c_tap
  item:  item
  field: (m_attr = {})->
    { _id, attr } = @format

    # TODO: change value for Set
    now_vals = @tie.params[_id]

    for value, option of @options when ! option.hidden
      label = option.label

      ma = @_attr _id, attr, m_attr, option,
        className: [option.className, m_attr.className, attr.className].join(" ")
        selected: now_vals[value]
        value:    now_vals[value]
      # data-tooltip, disabled
      m "span", ma,
        label
        m ".emboss.pull-right", option.badge() if option.badge


class InputTie.type.stack extends btn_input
  _value: c_stack
  item: (target, m_attr = {})->
    { _id, attr } = @format

    now_val = @tie.params[_id]
    option = @options[target]
    label = option.label

    ma = @_attr _id, attr, m_attr, option,
      className: [option?.className, m_attr.className, attr.className].join(" ")
      target: target
      value: now_val
    # data-tooltip, disabled
    m "a", ma,
      label
      m ".emboss.pull-right", option.badge() if option.badge

  back: (m_attr = {})->
    { _id, attr } = @format

    now_val = @tie.params[_id]

    ma = @_attr _id, attr, m_attr,
      className: [m_attr.className, attr.className, "icon-cancel-alt"].join(" ")
      value: now_val
    # data-tooltip, disabled
    m "a", ma

  field: (m_attr = {})->
    @format

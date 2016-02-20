input = (params, attr, {_id, attr_value})->
  ->
    now_val = params[_id]
    attr[attr_value] = now_val
    attr.checked = if attr.checked then "checked"
    m "input", attr

textarea = (params, attr, {_id})->
  ->
    now_val = params[_id]
    m "textarea", attr, now_val

select = (params, attr, {_id, name, options, init})->
  (data)->
    now_val = params[_id]
    now_option = options[now_val]
    selected = if now_option then null else "selected"
    m 'select', attr,
      unless attr.required && init
        m 'option', {selected, value: "", key: name},
          "- #{name} -"
      for value, option of options
        selected = if (now_val == value) then "selected" else null
        key = value
        m 'option', {selected, value, key},
          data option

header = (params, {name, label_attr})->
  ->
    m "label", label_attr, name

labeler = (params, {_id, label_attr, options, help_on, help_off})->
  (help)->
    now_val = params[_id]
    m "label", label_attr,
      if help && now_val
        help options[now_val]
      if now_val
        help_on
      else
        help_off


event = (params, {_id, type, attr_value})->
  val = unpack[type]
  m.withAttr attr_value, (new_val)->
    params[_id] = val new_val

change_attr = (e)->
  onchange: e

input_attr = (e)->
  oninput: e


new Mem.Rule("option").schema ->
  @scope (all)->
    checkbox: -> all.where (o)-> o.attr.type == 'checkbox'
    text:     -> all.where (o)-> o.attr.type == 'text'

    form: (params, list, attr)->
      onsubmit = attr.onsubmit or ->
      hash = {attr}
      hash.by_cookie = ->
        for key in list
          {cookie, type} = all.hash[key]
          if cookie
            match = document.cookie.match ///#{key}=([^;]+)///
            if match?[1]?
              params[key] = unpack[type] decodeURI match[1]
        return

      hash.disable = (b)->
        for key in list
          hash[key].attr.disabled = b
        attr.disabled = b

      attr.onsubmit = ->
        return if attr.disabled
        onsubmit()
        false

      for key in list
        {init, type} = all.hash[key]
        hash[key] = all.hash[key].vdom params
        params[key] = unpack[type] init
      hash

  @deploy (o)->
    o.option_id = o._id
    if o.attr?.name
      o.attr.key = o._id
      o.attr.id = o.attr.name

    o.label_attr =
      for: o.attr.name

    o.type = "String"

    switch o.attr.type
      when "checkbox"
        o.type = "Bool"
        o.attr_value = "checked"
        o.vdom = (params)->
          attr = change_attr event params, o
          head = header params, o
          label = labeler params, o
          field = input params, _.assign(o.attr, attr), o
          {attr, head, label, field}

      when "select"
        o.attr_value = "value"
        o.vdom = (params)->
          attr = change_attr event params, o
          head = header params, o
          label = labeler params, o
          field = select params, _.assign(o.attr, attr), o
          {attr, head, label, field}

      when "textarea"
        o.attr_value = "value"
        o.vdom = (params)->
          attr = input_attr event params, o
          head = header params, o
          label = labeler params, o
          field = textarea params, _.assign(o.attr, attr), o
          {attr, head, label, field}

      when "number"
        o.type = "Number"
        o.attr_value = "value"
        o.vdom = (params)->
          attr = input_attr event params, o
          head = header params, o
          label = labeler params, o
          field = input params, _.assign(o.attr, attr), o
          {attr, head, label, field}

      else
        o.attr_value = "value"
        o.vdom = (params)->
          attr = input_attr event params, o
          head = header params, o
          label = labeler params, o
          field = input params, _.assign(o.attr, attr), o
          {attr, head, label, field}

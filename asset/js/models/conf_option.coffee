radio = (params, attr, {_id, type})->
  val = Mem.unpack[type]
  uri = Mem.pack[type]
  (value)->
    now_val = params[_id]
    attr.value = uri value
    attr.checked = "checked" if now_val == val value
    m "input", attr

checkbox = (params, attr, {_id})->
  ->
    now_val = params[_id]
    attr.checked = "checked" if now_val
    m "input", attr

input = (params, attr, {_id, attr_value})->
  ->
    now_val = params[_id]
    attr[attr_value] = now_val
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
        if options
          help options[now_val]
        else
          help now_val
      if help_on || help_off
        if now_val
          help_on
        else
          help_off


event = (params, {_id, type, attr_value})->
  val = Mem.unpack[type]
  m.withAttr attr_value, (new_val)->
    params[_id] = val new_val

change_attr = (e)->
  onchange: e

input_attr = (e)->
  oninput: e


new Mem.Rule("option").schema ->
  @scope (all)->
    all.form = (params, list, gesture)->
      attr = gesture.form({})
      hash = { attr }
      hash.by_cookie = ->
        for key in list
          {cookie, type} = all.hash[key]
          if cookie
            match = document.cookie.match ///#{key}=([^;]+)///
            if match?[1]?
              params[key] = Mem.unpack[type] decodeURI match[1]
        return

      gesture.disable = (b)->
        for key in list
          hash[key].attr.disabled = b
        attr.disabled = b

      for key in list
        {init, type} = all.hash[key]
        hash[key] = all.hash[key].vdom params
        params[key] = Mem.unpack[type] init
      hash

    checkbox: -> all.where (o)-> o.attr.type == 'checkbox'
    text:     -> all.where (o)-> o.attr.type == 'text'


  @deploy (o)->
    o.option_id = o._id
    if o.attr?.name
      o.attr.key = o._id
      o.attr.id = o.attr.name

    o.label_attr =
      for: o.attr.name

    o.type ?= "String"

    switch o.attr.type
      when "checkbox"
        o.type = "Bool"
        o.attr_value = "checked"
        o.vdom = (params)->
          attr = change_attr event params, o
          attr = _.assign o.attr, attr
          head = header params, o
          label = labeler params, o
          field = checkbox params, attr, o
          {attr, head, label, field}

      when "radio"
        o.attr_value = "value"
        o.vdom = (params)->
          attr = change_attr event params, o
          attr = _.assign o.attr, attr
          field = radio params, attr, o
          {attr, field}

      when "select"
        o.attr_value = "value"
        o.vdom = (params)->
          attr = change_attr event params, o
          attr = _.assign o.attr, attr
          head = header params, o
          label = labeler params, o
          field = select params, attr, o
          {attr, head, label, field}

      when "textarea"
        o.attr_value = "value"
        o.vdom = (params)->
          attr = input_attr event params, o
          attr = _.assign o.attr, attr
          head = header params, o
          label = labeler params, o
          field = textarea params, attr, o
          {attr, head, label, field}

      when "number"
        o.type = "Number"
        o.attr_value = "value"
        o.vdom = (params)->
          attr = input_attr event params, o
          attr = _.assign o.attr, attr
          head = header params, o
          label = labeler params, o
          field = input params, attr, o
          {attr, head, label, field}

      else
        o.attr_value = "value"
        o.vdom = (params)->
          attr = input_attr event params, o
          attr = _.assign o.attr, attr
          head = header params, o
          label = labeler params, o
          field = input params, attr, o
          {attr, head, label, field}

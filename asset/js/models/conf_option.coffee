new Mem.Rule("option").schema ->
  @scope (all)->
    checkbox: -> all.where (o)-> o.attr.type == 'checkbox'
    text:     -> all.where (o)-> o.attr.type == 'text'

  set_event = (form, {_id, type, event, attr_value})->
    val = unpack[type]
    event m.withAttr attr_value, (new_val)->
      form[_id] = val new_val

  input = (form, {_id, attr, attr_value})->
    now_val = form[_id]
    attr[attr_value] = now_val
    attr.checked = if attr.checked then "checked"
    ->
      m "input", attr

  textarea = (form, {_id, attr})->
    now_val = form[_id]
    ->
      m "textarea", attr, now_val

  select = (form, {_id, attr, name, options, init})->
    now_val = form[_id]
    now_option = options[now_val]
    selected = if now_option then null else "selected"
    (data)->
      m 'select', attr,
        unless attr.required && init
          m 'option', {selected, value: "", key: name},
            "- #{name} -"
        for value, option of options
          selected = if (now_val == value) then "selected" else null
          key = value
          m 'option', {selected, value, key},
            data option

  label = (form, {_id, label_attr, options, help_on, help_off})->
    now_val = form[_id]
    (help)->
      m "label", label_attr,
        if help && now_val
          help options[now_val]
        if now_val
          help_on
        else
          help_off


  @deploy (o)->
    o.option_id = o._id
    if o.attr?.name
      o.attr.key = o._id
      o.attr.id = o.attr.name

    o.label_attr =
      for: o.attr.name

    o.type = "Thru"

    o.view = (form, vdom)->
      set_event form, o
      vdom input(form, o), label(form, o)

    change_event = (e)->
      o.attr.onchange = e

    input_event = (e)->
      o.attr.onchange = e
      o.attr.onkeyup = e
      o.attr.onblur = e

    switch o.attr.type
      when "checkbox"
        o.type = "Bool"
        o.attr_value = "checked"
        o.event = change_event

      when "select"
        o.attr_value = "value"
        o.event = change_event
        o.view = (form, vdom)->
          set_event form, o
          vdom select(form, o), label(form, o)

      when "textarea"
        o.attr_value = "value"
        o.event = input_event
        o.view = (form, vdom)->
          set_event form, o
          vdom textarea(form, o), label(form, o)

      when "number"
        o.type = "Number"
        o.event = input_event
        o.attr_value = "value"

      else
        o.event = input_event
        o.attr_value = "value"

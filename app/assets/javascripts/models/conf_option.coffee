new Mem.Rule("option").schema ->
  @scope (all)->
    checkbox: -> all.where (o)-> o.attr.type == 'checkbox'
    text:     -> all.where (o)-> o.attr.type == 'text'

  @deploy (o)->
    o.option_id = o._id
    if o.attr?.name
      o.attr.key = o._id
      o.attr.id = o.attr.name

    o.label_attr =
      for: o.attr.name

    event_base = (e)->
      o.event m.withAttr o.attr_value, e

    o.view = (form)->
      now_val = form[o._id]
      event_base (new_val)->
        form[o._id] = new_val
      o.attr[o.attr_value] = now_val
      o.attr.checked = if o.attr.checked then "checked"
      m "div",
        m "input", o.attr
        m "label", o.label_attr,
          if now_val
            o.help_on
          else
            o.help_off

    switch o.attr.type
      when "checkbox"
        o.event = (e)->
          o.attr.onchange = e
        o.attr_value = "checked"
        o.view = (form)->
          now_val = form[o._id]
          event_base (new_val)->
            form[o._id] = new_val
          o.attr.checked = if o.attr.checked then "checked"
          m "div",
            m "input", o.attr
            m "label", o.label_attr,
              if now_val
                o.help_on
              else
                o.help_off

      when "select"
        o.event = (e)->
          o.attr.onchange = e
        o.attr_value = "value"
        o.view = (form, data, help)->
          now_val = form[o._id]
          selected = if now_val then null else "selected"
          event_base (new_val)->
            form[o._id] = o.options[new_val]
          m 'div',
            m 'select', o.attr,
              unless o.attr.required && o.default
                m 'option', {selected, value: ""},
                  "- #{o.name} -"
              for value, option of o.options
                selected = if (now_val == value) then "selected" else null
                m 'option', {selected, value},
                  data option
            m "label", o.label_attr,
              if help && now_val
                help now_val
              if now_val
                o.help_on
              else
                o.help_off
      when "textarea"
        o.event = (e)->
          o.attr.onchange = e
          o.attr.onkeyup = e
          o.attr.onblur = e
        o.attr_value = "value"
        o.view = (form)->
          now_val = form[o._id]
          event_base (new_val)->
            form[o._id] = new_val
          o.attr[o.attr_value] = now_val
          o.attr.checked = if o.attr.checked then "checked"
          m "div",
            m "textarea", o.attr, now_val

      else
        o.event = (e)->
          o.attr.onchange = e
          o.attr.onkeyup = e
          o.attr.onblur = e
        o.attr_value = "value"
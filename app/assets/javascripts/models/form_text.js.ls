new Mem.Rule("form_text").schema ->
  formats =
    talk: "発言"
    memo: "メモ"

  @belongs_to "form"

  @order (o)-> o._id

  @scope (all)->
    formats: (form_id, mestype)->
      all.where((o)-> o.form_id == form_id && o.mestype == mestype && o.format_name? )

    mestypes: (form_id, format)->
      all.where((o)-> o.form_id == form_id && o.format == format )

  @default ->

  @deploy (o)->
    o._id = "#{o.form_id}-#{o.mestype}-#{o.format}"
    o.format_name = formats[o.format]
    o.mestype_name = Mem.ables.find(o.mestype).name
    o.infos  = []
    o.errors = []
    o.text = m.prop("")
    o.target_hash = {}

    text_on = m.withAttr "value", (value)->
      o.text(value)
      o.validate()

    o.target_at = (value)->
      o.target_hash[value]
    for target in o.targets
      o.target_hash[target.pno] = target
    o.target = m.prop o.targets.last.pno

    validate = ->
    switch o.format
      when "act"
        validate = ->
          console.log ["act", o.action, o.target()]
          if o.action?.target
            o.errors.push("対象を選んでください。")   if -1 == o.target()
          else
            o.errors.push("誰も選ばないでください。") if -1 != o.target()

    o.validate = ->
      o.errors = []
      validate()
      o.valid = ! o.errors.length

    o.attr =
      form: ->
        onchange: (e)->
          e.target.name
          e.target.value
          console.log [e, o]
        onreset: (e)->
        onsubmit: (e)->
          console.log [e, role, able, o]
          false
      action: ->
        onchange: m.withAttr "value", (index)->
          act = Mem.actions.find(index)
          o.action = act
          if act
            o.text act.text
          o.validate()
      text: ->
        value:    o.text()
        onkeyup:  text_on
        onchange: text_on
      target: ->
        value:    o.target()
        onchange: m.withAttr "value", (value)->
          o.target unpack.Number value
          o.validate()

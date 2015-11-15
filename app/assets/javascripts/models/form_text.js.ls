new Mem.Rule("form_text").schema ->
  formats =
    talk: "発言"
    memo: "メモ"
    act: "アクション"

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
    o.target_hash = {}
    o.text = m.prop("")

    o.target_at = (value)->
      o.target_hash[value]
    for target in o.targets
      o.target_hash[target.pno] = target
    o.target = m.prop o.targets.last.pno

    switch o.format
      when \act
        o.max =
          unit: 'count'
          line: 1
          size: 100
      else
        o.max =
          unit: 'point'
          line: 5
          size: 100

    text_on = m.withAttr "value", (value)->
      o.text value
      validate.talk o
    validate.talk o

    o.attr =
      form: ->
        onchange: (e)->
          e.target.name
          e.target.value
          console.log [e, o]
        onreset: (e)->
        onsubmit: (e)->
          console.log [e, o]
          false
      action: ->
        onchange: m.withAttr "value", (index)->
          act = Mem.actions.find(index)
          o.action = act
          if act
            o.text act.text
          validate.talk o
      text: ->
        value:    o.text()
        onkeyup:  text_on
        onchange: text_on
      target: ->
        value:    o.target()
        onchange: m.withAttr "value", (value)->
          o.target unpack.Number value
          validate.talk o



export Txt =
  input: (prop)->
    onblur:   m.withAttr("value", prop)
    onchange: m.withAttr("value", prop)
    value: prop()

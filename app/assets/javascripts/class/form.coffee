Txt = (->
  input: (prop)->
    onblur:   m.withAttr("value", prop)
    onchange: m.withAttr("value", prop)
    value: prop()
)()

Btns = (->
  base = (btn, style, prop, options, order = Object.keys options)->
    for key in order
      caption = options[key]
      attr = btn(style, prop, key)
      m "span", attr, caption

  check: -> base Btn.keys, arguments...
  radio: -> base Btn.set,  arguments...
  menu: ->  base Btn.menu, arguments...
)()

Btn = (->
  base = (style, check, store, load, key)->
    style.class ?= 'edge'
    GUI.attrs {}, ->
      @end ->
        store key

      if check load, key
        @className "btn #{style.class} active"
      else
        @className "btn #{style.class}"

  is_true = (load)->
    load()
  eq = (load, key)->
    key == load()
  include = (load, key)->
    load()[key]
  keys_eq = (load, keys)->
    to_s = Serial.serializer.Keys
    to_s(load()) == to_s(keys)

  base: base

  bool: (style, prop)->
    base style, is_true, prop, prop, !prop()

  call: (style, call)->
    prop = -> null
    base style, eq, call, prop, "call"

  set: (style, prop, val)->
    base style, eq, prop, prop, val

  keys_reset: (style, prop, val)->
    setter = (key)->
      unless keys_eq(prop, val)
        prop Serial.parser.Keys val
    base style, keys_eq, setter, prop, val

  keys: (style, prop, val)->
    setter = (key)->
      keys = prop()
      keys[key] = ! keys[key]
      prop keys
    base style, include, setter, prop, val

  menu: (style, prop, val)->
    setter = (key)=>
      target =
        if eq prop, key
          ""
        else
          key
      prop target
    base style, eq, setter, prop, val
)()

btns = (btn, style, prop, options, order = Object.keys options)->
  for key in order
    caption = options[key]
    attr = btn(style, prop, key)
    m "span", attr, caption

btn = (style, check, store_base, load, key)->
  style.class ?= 'edge'
  store = store_base
  cb = ->
    store key
    store = ->
    setTimeout ->
      store = store_base
    , 200

  if check load, key
    class_name = "btn #{style.class} active"
  else
    class_name = "btn #{style.class}"

  className: class_name
  onmouseup: cb
  ontouchend: cb

is_true = (load)->
  load()

eq = (load, key)->
  key == load()

include = (load, key)->
  load()[key]

keys_eq = (load, keys)->
  to_s = pack.Keys
  to_s(load()) == to_s(keys)


@Btns =
  check: -> btns Btn.keys, arguments...
  radio: -> btns Btn.set,  arguments...
  menu: ->  btns Btn.menu, arguments...

@Btn =
  base: btn

  bool: (style, prop)->
    btn style, is_true, prop, prop, !prop()

  call: (style, call)->
    prop = -> null
    btn style, eq, call, prop, "call"

  set: (style, prop, val)->
    btn style, eq, prop, prop, val

  keys_reset: (style, prop, val)->
    setter = (key)->
      unless keys_eq(prop, val)
        prop unpack.Keys val
    btn style, keys_eq, setter, prop, val

  keys: (style, prop, val)->
    setter = (key)->
      keys = prop()
      keys[key] = ! keys[key]
      prop keys
    btn style, include, setter, prop, val

  menu: (style, prop, val)->
    setter = (key)=>
      target =
        if eq prop, key
          ""
        else
          key
      prop target
    btn style, eq, setter, prop, val

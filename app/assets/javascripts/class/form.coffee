Txt = (->
  input: (prop)->
    onblur:   m.withAttr("value", prop)
    onchange: m.withAttr("value", prop)
    value: prop()
)()

Submit = (->
  test: (object)->
    query =
      method: "POST"
      url: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/test-form.html"
      serialize: (data)->
        console.log data
        data
      deserialize: Serial.parser.HtmlGon
    m.request(query)
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

  submit: (style, object)->
    submit = (objecct)->
      untap = -> true
      Submit.test()

    untap = -> false
    base style, untap, submit, null, object

  bool: (style, prop)->
    base style, is_true, prop, prop, !prop()

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

/*
form v0.0.1
http://github.com/7korobi/---
(c) 7korobi
License: MIT
*/

export Txt =
  input: (prop)->
    onblur:   m.withAttr("value", prop)
    onchange: m.withAttr("value", prop)
    value: prop()

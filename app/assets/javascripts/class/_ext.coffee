define = (type, cb)->
  Object.defineProperties type.prototype, cb()

define Array, ->
  last:
    get: -> @[@length - 1]
  first:
    get: -> @[0]

Number.MAX_INT32 = 0x7fffffff

_.mixin
  parseID: (id)->
    time = Serial.parser.Date id[2..-1]
    [id[0..1], time]



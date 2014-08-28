_.mixin
  parseID: (id)->
    time = Serial.parser.Date id[2..-1]
    [id[0..1], time]

class Serial
  # OIl
  @map = 
    to_s: "0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
    to_i: {}

  for c, n in @map.to_s
    @map.to_i[c] = n
  @map.size = @map.to_s.length

  @parser = 
    Array: (val)->
      if val.split?
        val.split ","
      else
        [val]

    Date: (code)->
      base = 1
      result = 0
      for c in code
        n = Serial.map.to_i[c]
        unless n?
          return Number.NaN
        result += n * base
        base *= Serial.map.size
      result

    Number: Number
    String: String
    null:    String
    undefined: String

  @serializer = 
    Array: (val)->
      if val.join?
        val.join ","
      else
        [val]

    Date: (val)->
      time = Math.ceil val
      result = ""
      while time >= 1
        result += Serial.map.to_s[time % Serial.map.size]
        time = Math.floor time / Serial.map.size
      result

    Number: String
    String: String
    null:    String
    undefined: String

    

  @url = {}

for key, func of Serial.parser
  Serial.url[key] = 
    switch key
      when "Number"
        "([-]?[\\.0-9]+)"
      when "Date"
        "([0-9a-zA-Z]+)"
      else
        "([^\\/\\-\\=\\.]+)"

class ID
  @random_size = Serial.map.size * Serial.map.size
  @now = ->
    Serial.serializer.Date(Math.random() * ID.random_size) + Serial.serializer.Date _.now()


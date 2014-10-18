class Serial
  # OIl
  @map = 
    to_s: "0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
    to_i: {}

  for c, n in @map.to_s
    @map.to_i[c] = n
  @map.size = @map.to_s.length

  string_parser = (val)->
      switch val
        when "", null, undefined
          ""
        else
          String(val)

  string_serializer = (val)->
      switch val
        when "", null, undefined
          ""
        else
          String(val).replace ///[~/=.&\?\#\[\]()\"'`;]///g, (s)->
            "%" + s.charCodeAt(0).toString(16)    

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
    Text: string_parser
    String: string_parser 
    null:    string_parser
    undefined: string_parser

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

    Number: string_serializer
    Text: string_serializer
    String: string_serializer
    null:    string_serializer
    undefined: string_serializer

    

  @url = {}

for key, func of Serial.parser
  Serial.url[key] = 
    switch key
      when "Number"
        "([-]?[\\.0-9]+)"
      when "Date"
        "([0-9a-zA-Z]+)"
      when "Text"
        "([^\\~\\/\\=\\.\\&\\[\\]\\(\\)\\\"\\'\\`\\;]*)"
      else
        "([^\\~\\/\\=\\.\\&\\[\\]\\(\\)\\\"\\'\\`\\;]+)"

class ID
  @random_size = Serial.map.size * Serial.map.size * Serial.map.size
  @now = ->
    Serial.serializer.Date(Math.random() * ID.random_size) + Serial.serializer.Date _.now()
  @at = (date)->
    Serial.serializer.Date(Math.random() * ID.random_size) + Serial.serializer.Date new Date(date)

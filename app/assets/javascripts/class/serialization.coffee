
class Serial
  @parser = 
    Array: (val)->
      if val.split?
        val.split ","
      else
        val

    Date: (val)->
      new Date Number val

    Number: Number
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
        "([0-9]+)"
      else
        "([^\\/\\-\\=\\.]+)"

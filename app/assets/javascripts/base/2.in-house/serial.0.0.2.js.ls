/*
Serial v0.0.2
http://github.com/7korobi/---
(c) 7korobi
License: MIT
*/

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
      String(val).replace //[~\/=.&\?\#\[\]()\"'`;]//g, (s)->
        "%" + s.charCodeAt(0).toString(16)


array_base_parser = (val)->
  if Array.isArray(val)
    val
  else
    "#{val}".split ","



export pack =
  Keys: (val)->
    list =
      if Array.isArray(val)
        val
      else
        for key, item of val
          continue unless item
          key
    pack.Array list.sort()

  Array: (val)->
    if Array.isArray(val)
      val.join ","
    else
      "#{val}"

  Date: (val)->
    time = Math.floor val
    result = ""
    while time >= 1
      result += Serial.map.to_s[time % Serial.map.size]
      time = Math.floor time / Serial.map.size
    result

  Bool: (bool)->
    if bool then "T" else "F"

  Number: string_serializer
  Text: string_serializer
  String: string_serializer
  null:    string_serializer
  undefined: string_serializer



export unpack =
  HtmlGon: (html)->
    pattern = //
      <script.*?>([\s\S]*?)</script>
    //ig
    while script = pattern.exec(html)
      code = script[1]
      eval code if code.length > 0
    gon

  Keys: (val)->
    hash = {}
    if val.length
      list = array_base_parser(val)
      for key in list
        hash[key] = true
    else
      for key, bool of val
        hash[key] = true if bool
    hash

  Array: (val)->
    if val.length
      array_base_parser(val)
    else
      []

  Date: (code)->
    return code if 0 < code
    base = 1
    result = 0
    for c in code
      n = Serial.map.to_i[c]
      unless n?
        return Number.NaN
      result += n * base
      base *= Serial.map.size
    result

  Bool: (val)->
    switch val
      when true, "T"
        true
      when false, "F"
        false
      else
        Number.NaN

  Number: Number
  Text: string_parser
  String: string_parser
  null:    string_parser
  undefined: string_parser



export Serial =
  map:
    to_s: "0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
    to_i: {}
  url: {}

for c, n in Serial.map.to_s
  Serial.map.to_i[c] = n
Serial.map.size = Serial.map.to_s.length

for key, func of unpack
  Serial.url[key] =
    switch key
      when "Number"
        "([-]?[\\.0-9]+)"
      when "Date"
        "([0-9a-zA-Z]+)"
      when "Array", "Keys"
        "([^\\~\\/\\=\\.\\&\\[\\]\\(\\)\\\"\\'\\`\\;]*)"
      when "Text"
        "([^\\~\\/\\=\\.\\&\\[\\]\\(\\)\\\"\\'\\`\\;]*)"
      else
        "([^\\~\\/\\=\\.\\&\\[\\]\\(\\)\\\"\\'\\`\\;]+)"


export ID =
  patch_size: Serial.map.size * Serial.map.size * Serial.map.size

  now: ->
    ID.at _.now()

  at: (date, count)->
    count ?= Math.random() * ID.patch_size
    pack.Date(date * ID.patch_size + count)

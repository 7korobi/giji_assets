Tie = require "./tie"

decode = (str)->
  decodeURI str

encode = (str)->
  encodeURI str
  .replace /%5B/g, '['
  .replace /%5D/g, ']'


input = (key)->
  Mem.Query.stores.hash[key]


memory_prop = (params, key, unpack)->
  (val)->
    if arguments.length
      params[key] = unpack val
    else
      params[key]


state = _.debounce ->
  params = Url.location()
  if decode(location.href) != decode(params.href)
    console.warn "url changed."
    if history?
      history[Url.mode] "URL", null, params.href

    Url.popstate()
, 50


class LocationStore
  @now: ->
    new @ location

  constructor: ({ @protocol, @host, @pathname, @search, @hash, @href })->
    return

  each: (cb)->
    for type in Tie.types.url when path = @[type]
      for url in Url.type[type]
        cb url, path, type
    @

  fetch: ->
    @each (url, path, target)->
      url.fetch path
    @

  view: ->
    @each (url, path, target)=>
      @[target] = url.view path
    @href = @protocol + "//" + @host + @pathname + @search + @hash
    @


class Url
  @conf = {}
  @type = {}
  for type in Tie.types.url
    @type[type] = []

  @maps: (hh)->
    @tie = Tie.build_url hh, Tie.params, @
    @prop = @tie.prop
    @params = Tie.params

  @popstate: ->
    @loc = LocationStore.now()
    @loc.fetch()
    @mode = "replaceState"

  @pushstate: ->
    @mode = "pushState"
    state()

  @replacestate: ->
    state()

  @location: ->
    unless @loc?
      @popstate()
    @loc.view()

  constructor: (@_id, @type, @format)->
    @keys = []
    regexp = @format
    .replace /[.]/gi, (key)-> "\\#{key}"
    .replace /:([a-z_]+)/gi, (_, key)=>
      @keys.push key
      Mem.Serial.url[input(key).type]
    , "i"
    @scanner = new RegExp regexp

  serialize: ->
    path = @format
    for key in @keys
      serial = Mem.pack[input(key).type]
      path = path.replace ///:#{key}///gi, serial Url.params[key]
    encode path

  fetch: (path)->
    @match = @scanner.exec path
    if @match
      @match.shift()
      for key, i in @keys
        Url.prop[key] decode @match[i]

  view: (path)->
    @match = @scanner.exec path
    if @match
      return path.replace @scanner, @serialize()

    if @current
      @match = true
      path +=
        if path.length
          "&"
        else
          switch @type
            when "hash"
              "#"
            when "search"
              "?"
      path += @serialize()
    path


module.exports = Url


class Url
  @pathname = []
  @cookie = []
  @search = []
  @hash = []
  @routes = {}

  @data = {}

  @each = (cb)->
    targets = 
      cookie:   document.cookie
      pathname: location.pathname
      search:   location.search
      hash:     location.hash

    for target, data of targets
      if data
        for url_key in Url[target]
          route = Url.routes[url_key]
          cb(route, data, target)

  @popstate = ->
    Url.data = {}
    Url.each (route, data, target)->
      route.popstate data, target

  @pushstate = ->
    link = location.href
    if history?
      Url.each (route, data, target)->
        switch target
          when "cookie"
            expires = new Date(_.now() + 3600000 * 24 * 0.5).toUTCString()
            document.cookie = "#{route.pushstate data}; expires=#{expires}; "
          else
            link = link.replace(data, route.pushstate data)

    if location.href != link
      history.pushState "pushstate", null, link
      Url.popstate()

  constructor: (@format, @event_cb = ->)->
    @keys = []
    @params_in_url = []
    @scanner = new RegExp @format.replace(/[.]/ig,(key)-> "\\#{key}" ).replace /:([a-z_]+)/ig, (_, key)=>
      type = Url.options[key]?.type
      @keys.push key
      @params_in_url.push key

      Serial.url[type]
    , "i"

  popstate: (path, @target)->
    @data = {}
    @params = []
    @match = @scanner.exec(path)
    if @match
      @match.shift()
      for key, i in @keys
        @change key, @match[i]
    @event_cb(@data)

  pushstate: (link)->
    # TODO: cookie & href each targets.
    switch @target
      when "cookie"
        document.cookie = @serialize()
      else
        return link unless location[@target]?
        link.replace @scanner, @serialize()


  serialize: ->
    path = @format
    for key in @params_in_url
      type = Url.options[key]?.type
      path = path.replace ///:#{key}///ig, Serial.serializer[type](@value key)
    path


  change: (key, value)->
    type = Url.options[key]?.type
    value = Serial.parser[type](value)

    @params.push key
    Url.data[key] = @data[key] = value
    if Url.bind[key]?
      for subkey, subval of Url.bind[key][value]
        @change subkey, subval if key != subkey


  value: (key)->
    value = @data[key]
    if value?
      value
    else
      (Url.options[key]?.current) || null


class Url
  @routes = {}
  @prop = {}

  @location = ->
    cookie:   document.cookie
    protocol: location.protocol
    host:     location.host
    pathname: location.pathname
    search:   location.search
    hash:     location.hash

  @each = (cb)->
    targets = Url.location()
    for target, data of targets
      for url_key, route of Url.routes[target]
        cb(route, targets[target], target, targets)
    targets

  @popstate = ->
    Url.each (route, data, target)->
      route.popstate data, target
    Url.replacestate()

  @state = (cb)->
    _.debounce ->
      new_href = Url.href()
      if location.href != new_href
        cb(new_href, location.href)
        Url.popstate()
    , DELAY.presto

  @pushstate = Url.state (new_href)->
    history.pushState "pushstate", null, new_href if history?

  @replacestate = Url.state (new_href)->
    history.replaceState "replacestate", null, new_href if history?

  @href = ->
    link = Url.each (route, data, target, targets)->
      switch target
        when "cookie"
          expires = new Date(_.now() + 3600000 * 24 * 0.5).toUTCString()
          document.cookie = "#{route.pushstate data}; expires=#{expires}; "
        else
          targets[target] = route.pushstate data, target

    link.protocol + "//" + link.host + link.pathname + link.search + link.hash

  constructor: (@format, @options = {})->
    @keys = []
    @keys_in_url = []

    @data = {}

    @scanner = new RegExp @format.replace(/[.]/ig,(key)-> "\\#{key}" ).replace /:([a-z_]+)/ig, (_, key)=>
      type = Url.options[key]?.type
      @keys.push key
      @keys_in_url.push key
      @prop key

      Serial.url[type]
    , "i"

  popstate: (path, target)->
    @data = {}
    @match = @scanner.exec(path)
    if @match
      @match.shift()
      for key, i in @keys
        @parse key, @match[i]

      @params = Object.keys @data
      @options.change?(@data)

  pushstate: (path, target)->
    if @scanner.exec(path)
      path.replace @scanner, @serialize()
    else
      if @options.unmatch
        path += 
        if path.length
          "&" 
        else
          @options.unmatch
        path += @serialize()
      path

  serialize: ->
    path = @format
    for key in @keys_in_url
      type = Url.options[key]?.type
      val = @prop(key)()
      path = path.replace ///:#{key}///ig, Serial.serializer[type](val)
    path 


  prop: (key)->
    unless Url.prop[key]
      prop = m.prop()
      Url.prop[key] = (val)=>
        if arguments.length
          type = Url.options[key]?.type
          val = Serial.parser[type](val)

          m.startComputation()
          prop @data[key] = val
          if Url.bind[key]?
            for subkey, subval of Url.bind[key][value]
              @prop(subkey)(subval) if key != subkey
          m.endComputation()

          Url.pushstate()

        else
          value = prop()
          if value?
            value
          else
            (Url.options[key]?.current) || null

    Url.prop[key]

  parse: (key, value)->
    @prop(key)(value)

    if Url.bind[key]?
      for subkey, subval of Url.bind[key][value]
        @parse(subkey, subval) if key != subkey


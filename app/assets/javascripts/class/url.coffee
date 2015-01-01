
class Url
  @routes = {}
  @cookie = {}
  @prop = {}

  @location = ->
    cookie:   document.cookie
    protocol: location.protocol
    host:     location.host
    pathname: location.pathname
    search:   location.search
    hash:     location.hash

  @each = (cb)->
    Url.routes.cookie = Url.cookie
    targets = Url.location()
    for target, data of targets
      for url_key, route of Url.routes[target]
        cb(route, targets[target], target, targets)
    targets

  @popstate = ->
    console.log "pop state"
    Url.each (route, data, target)->
      route.popstate data, target
    Url.mode = "replaceState"

  @state = _.debounce ->
    new_href = Url.href()
    if decodeURI(location.href) != decodeURI(new_href)
      history[Url.mode] "pushstate", null, new_href if history?
      Url.popstate()
  , DELAY.presto

  @pushstate = ->
    Url.mode = "pushState"
    Url.state()

  @replacestate = ->
    Url.state()

  @href = ->
    link = Url.each (route, data, target, targets)->
      targets[target] = route.pushstate data, target

    link.protocol + "//" + link.host + link.pathname + link.search + link.hash

  constructor: (@format, @options = {})->
    @keys = []
    @keys_in_url = []

    @data = {}

    if @options.cookie
      Url.cookie[ID.now()] = @

    @scanner = new RegExp @format.replace(/[.]/ig,(key)-> "\\#{key}" ).replace /:([a-z_]+)/ig, (_, key)=>
      type = Url.options[key]?.type
      @keys.push key
      @keys_in_url.push key
      @parse key

      Serial.url[type]
    , "i"

  values: ->
    Url.prop[key]() for key in @keys_in_url

  popstate: (path, target)->
    @data = {}
    @match = @scanner.exec(path)
    if @match
      @match.shift()
      for key, i in @keys
        val = decodeURI @match[i]
        @prop(key)(val, true)

      @params = Object.keys @data
      @options.change?(@data)
    Url.replacestate()

  pushstate: (path, target)->
    if target == "cookie" && @options.cookie
      return @set_cookie @serialize()

    if @scanner.exec(path)
      return path.replace @scanner, @serialize()

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
      {type, current} = Url.options[key] || {}
      prop_base = @prop.bind(@)
      bind_base = Url.bind[key]
      parser = Serial.parser[type]
      type ?= "String"
      prop = m.prop()
      bind = 
        if bind_base
          switch typeof bind_base
            when "object"
              (key, val, prop_field)->
                for subkey, subval of bind_base[val]
                  prop_field(subkey)(subval, true) if key != subkey
                return
            when "function"
              bind_base
        else
          ->

      Url.prop[key] = (val, is_replace)=>
        if arguments.length
          val = parser(val)

          prop @data[key] = val
          bind(key, val, prop_base)

          if is_replace
            Url.replacestate()
          else
            Url.pushstate()

        else
          value = prop()
          if value?
            value
          else
            current

    Url.prop[key]

  parse: (key)->
    @prop(key)

    if Url.bind[key]?
      for value, obj of Url.bind[key]
        for subkey, subval of obj
          @parse(subkey) unless Url.prop[subkey]

  set_cookie: (value)->
    ary = [value]

    {time, domain, path, secure} = @options.cookie
    if time
      expires = new Date Math.min 2147397247000, _.now() + time * 3600000
      ary.push "expires=#{expires.toUTCString()}"
    if domain
      ary.push "domain=#{domain}"
    if path
      ary.push "path=#{path}"
    if secure
      ary.push "secure"
    document.cookie = ary.join("; ")

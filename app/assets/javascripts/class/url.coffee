
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
    if decodeURI(location.href) != new_href
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
      prop = m.prop()
      Url.prop[key] = (val, is_replace)=>
        if arguments.length
          type = Url.options[key]?.type
          val = Serial.parser[type](val)

          m.startComputation()
          prop @data[key] = val
          if Url.bind[key]?
            for subkey, subval of Url.bind[key][val]
              @prop(subkey)(subval, true) if key != subkey

          m.endComputation()

          if is_replace
            Url.replacestate()
          else
            Url.pushstate()

        else
          value = prop()
          if value?
            value
          else
            (Url.options[key]?.current) || null

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

define_prop = (key)->
  (val)->
    if arguments.length
      Url.params[key] = val
    else
      Url.params[key]

export class Url
  @routes = {}
  @params = {}
  @prop = {}


  @location = ->
    protocol: location.protocol
    host:     location.host
    pathname: location.pathname
    search:   location.search
    hash:     location.hash

  @define = (props)->
    Url.options = props
    for key, o of props
      props[key] = o = {} unless o
      o.type ?= "String"
      o.url = Mem.Serial.url[o.type]
      o.parse = Mem.unpack[o.type]
      o.serial = Mem.pack[o.type]
      o.current ?= ""

      Url.params[key] = o.current
      Url.prop[key] = define_prop key

  @each = (cb)->
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
    is_change = false
    old_cookie = document.cookie

    new_href = Url.href()

    if old_cookie != document.cookie
      is_change = true

    if decodeURI(location.href) != decodeURI(new_href)
      history[Url.mode] "pushstate", null, new_href if history?
      is_change = true

    if is_change
      Url.popstate()
  , DELAY.presto

  @pushstate = ->
    Url.mode = "pushState"
    Url.state()

  @replacestate = ->
    Url.state()

  @href = ->
    link = Url.each (route, data, target, targets)->
      targets[target] = route.replace data, target

    link.protocol + "//" + link.host + link.pathname + link.search + link.hash


  (@format, @options = {})->
    @keys_in_url = []

    @scanner = new RegExp @format.replace(/[.]/gi, (key)-> "\\#{key}" ).replace /:([a-z_]+)/gi, (_, key)~>
      @keys_in_url.push key

      Url.options[key]?.url
    , "i"

  popstate: (path, target)->
    data = {}
    @match = @scanner.exec(path)
    if @match
      @match.shift()
      for key, i in @keys_in_url
        val = decodeURI @match[i]
        data[key] = val
        Url.params[key] = val

      @options.change?(data)
    Url.replacestate()

  replace: (path, target)->
    if @scanner.exec(path)
      return path.replace @scanner, @serialize()

    # todo
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
      serial = Url.options[key]?.serial
      val = Url.params[key]
      path = path.replace //:#{key}//gi, serial(val)
    path


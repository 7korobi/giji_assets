

getter_setter =
  callee: (store, current, parse, serial, key)->
    prop = ->
      if arguments.length
        newval = parse(arguments[0])
        newval ?= current
        if store != newval
          store := newval
          Url.options[key].bind(store)
          Url.replacestate()
      store

    prop.toJSON = -> serial(store)
    prop

do_define = (key, option)->
  {parse, serial, current} = option
  Url.options[key].bind ?= ->
  Url.prop[key] = getter_setter.callee(current, current, parse, serial, key)


export class Url
  @routes = {}
  @cookies = {}
  @prop = {}
  @mode = "replaceState"

  @location = ->
#    storage:  window.localStorage
    cookie:   document.cookie
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
      o.current ?= o.parse("")

      do_define key, o

  @binds = (binds)->
    for key, list of binds
      Url.bind key, list

  @bind = (key, list)!->
    Url.options[key].bind =
      switch typeof! list
        when \Function
          list
        when \Array
          binder = Url.options[key].binder = {}
          for subs in list
            binder[subs[key]] = subs
          (val)!->
            for subkey, subval of binder[val]
              console.log [subkey, subval, binder[val]] unless Url.prop[subkey]
              Url.prop[subkey](subval) if key != subkey


  @each = (cb)->
    Url.routes.cookie = Url.cookies
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


  @cookie = (format, options)->
    url = new Url(format)
    url.options.cookie = options
    url

  (@format, @options = {})->
    @keys_in_url = []

    if @options.cookie
      Url.cookies[Serial.ID.now()] = @

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
        Url.prop[key](val)

      @options.change?(data)
    Url.replacestate()

  replace: (path, target)->
    if target == "cookie" && \Object == typeof! @options.cookie
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
      serial = Url.options[key]?.serial
      val = Url.prop[key]()
      path = path.replace //:#{key}//gi, serial(val)
    path

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

  # obsolete
  values: (diff = {})->
    for key in @keys_in_url
      diff[key] || Url.prop[key]()


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
    Url.each (route, data, target)->
      route.popstate data, target


  @pushstate = ->
    link = location.href
    if history?
      Url.each (route, data, target, target_is_cookie)->
        link = route.pushstate link

    if location.href != link
      history.pushState "pushstate", null, link
      Url.popstate()


  @vue = new Vue
    data: Url.data
    ready: ->
      pushstate = _.debounce Url.pushstate, DELAY.presto,
        leading: false
        trailing: true
      @$watch '$data', pushstate


  constructor: (@format, vue = {})->
    @keys = []
    @params_in_url = []
    @scanner = new RegExp @format.replace(/[.]/ig,(key)-> "\\#{key}" ).replace /:([a-z_]+)/ig, (_, key)=>
      type = Url.options[key]?.type
      @keys.push key
      @params_in_url.push key

      Serial.url[type]
    , "i"
    @vue = new Vue _.merge vue,
      data:
        url: Url.vue.$data
        params: []


  popstate: (path, @target)->
    @params = []
    @match = @scanner.exec(path)
    if @match
      @match.shift()
      for key, i in @keys
        @change key, @match[i]

    @vue.$set "url", Url.vue.$data
    @vue.$set "params", @params


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
    Url.vue.$data[key] = value
    if Url.bind[key]?
      for subkey, subval of Url.bind[key][value]
        @change subkey, subval if key != subkey


  value: (key)->
    value = Url.vue.$data[key]
    if value?
      value
    else
      (Url.options[key]?.current) || null


###
el: the element the directive is bound to.
key: the keypath of the binding, excluding arguments and filters.
arg: the argument, if present.
expression: the raw, unparsed expression.
vm: the context ViewModel that owns this directive.
value: the current binding value.
# <div v-href=""></div>
###


Vue.directive 'href',
  bind: (value) ->
    @el.addEventListener 'click', =>
      @vm[@key]


  update: (value)->
    $(@el).attr 'href', Url.link value


  unbind: ->
    @el.removeEventListener 'click', =>
      console.log 'unbind'





Parse =
  Array: (val)->
    if val.split?
      val.split ","
    else
      val

  Date: (val)->
    new Date Number val

class Url
  @targets = ->
    hash =
      cookie:   document.cookies
      pathname: location.pathname
      search:   location.search
      hash:     location.hash
  @popstate = ->
    for target, data of Url.targets()
      if data
        for url_key in LOCATION[target]
          Url.routes[url_key].popstate data, target

  pushstate = ->
    link = location.href
    if history?
      for target, data of Url.targets()
        if data
          for url_key in LOCATION[target]
            link = Url.routes[url_key].pushstate link
    if location.href != link
      history.pushState "pushstate", null, link
      Url.popstate()

  @pushstate = _.debounce pushstate, DELAY.presto,
    leading: false
    trailing: true

  @vue = new Vue
    data: {}
    ready: ->
      @$watch '$data', (value)->
        Url.pushstate()
  @routes = {}

  constructor: (@format, vue = {})->
    self = @
    @keys = []
    @scanner = new RegExp @format.replace(/[.]/ig,(key)-> "\\#{key}" ).replace /:([a-z_]+)/ig, (_, key)=>
      @keys.push key
      switch LOCATION.options[key].type
        when Number
          "([\\.0-9]+)"
        else
          "([^\\/\\-\\=\\.]+)"
    , "i"
    @vue = new Vue _.merge vue,
      data:
        url: Url.vue.$data
        params: []

  popstate: (path, @target)->
    @params_in_url = []
    @params = []
    @match = @scanner.exec(path)
    if @match
      @match.shift()
      for key, i in @keys
        value = @match[i]
        @params_in_url.push key
        @change key, value

    @vue.$set "url", Url.vue.$data
    @vue.$set "params", @params

  pushstate: (link)->
    return link unless location[@target]?
    path = @format
    for key in @params_in_url
      path = path.replace ///:#{key}///ig, @value key
    link.replace @scanner, path

  change: (key, value)->
    @params.push key
    Url.vue.$data[key] = LOCATION.options[key].type value
    if LOCATION.bind[key]?
      for subkey, subval of LOCATION.bind[key][Url.vue.$data[key]]
        @change subkey, subval if key != subkey

  value: (key)->
    value = Url.vue.$data[key]
    if value?
      value
    else
      LOCATION.options[key].current


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





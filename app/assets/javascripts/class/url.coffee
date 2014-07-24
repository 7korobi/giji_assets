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
      cookie: document.cookies
      search: location.search
      hash:   location.hash
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
  @pushstate = _.debounce pushstate, DELAY.presto,
    leading: false
    trailing: true

  @vue = new Vue
    data: {}
    ready: ->
      @$watch '$data', Url.pushstate
  @routes = {}

  @boot = ->
    $(window).on "hashchange", (event)->
      if event.clipboardData
        console.log event
      else
        Url.popstate()

    $(window).on "popstate", (event)->
      if event.clipboardData
        console.log event
      else
        Url.popstate()

  constructor: (@format, vue = {})->
    @keys = []
    @scanner = new RegExp @format.replace /:([a-z_]+)/ig, (_, key)=>
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
        if key
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

for key, val of LOCATION.options
  val ||= {}
  LOCATION.options[key] =
    type: eval(val.type || "String")
    current: val.current || null

for key, binds of LOCATION.bind
  LOCATION.bind[key] = {}
  for bind in binds
    LOCATION.bind[key][bind[key]] = bind


###
el: the element the directive is bound to.
key: the keypath of the binding, excluding arguments and filters.
arg: the argument, if present.
expression: the raw, unparsed expression.
vm: the context ViewModel that owns this directive.
value: the current binding value.
# <div v-href=""></div>
###


Vue.config
  debug: true

Vue.directive 'href',
  bind: (value) ->
    @el.addEventListener 'click', =>
      @vm[@key]

  update: (value)->
    $(@el).attr 'href', Url.link value

  unbind: ->
    @el.removeEventListener 'click', =>
      console.log 'unbind'

Url.routes =
  story: new Url "/on/:story_id"
  timer: new Url "timer=:viewed_at"

  messages: new Url "/:event_id/messages/:message_ids/"
  news:     new Url "/:event_id/:mode_id/news/:row/"
  all:      new Url "/:event_id/:mode_id/all/"
  page:     new Url "/:event_id/:mode_id/:page.of.:row/"

  hides:  new Url "/hides/:hide_ids"
  search: new Url "/search/:search"

  potof: new Url "/potof/:potofs_order"

  css: new Url "/css.:theme.:width.:layout.:font",
    el: "html"
    ready: ->
      style_p = ""
      @$watch 'url', =>
        html = document.documentElement
        html.className = html.className.replace style_p, @style
        style_p = @style
    computed:
      style: ->
        h = {}
        for key in @params
          val = @url[key]
          h["#{val}-#{key}"] = true if key? && val? && String == LOCATION.options[key].type
        Object.keys(h).join(" ")

Url.boot()




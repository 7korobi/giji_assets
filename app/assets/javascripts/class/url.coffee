Parse =
  Array: (val)->
    if val.split?
      val.split ","
    else
      val

  Date: (val)->
    new Date Number val

class Url
  @routes = {}
  @data = {}

  @popstate = ->
    targets =
      cookie: document.cookies
      search: location.search
      hash:   location.hash
    for target, data of targets
      if data
        for url_key in LOCATION[target]
          Url.routes[url_key].popstate data, target

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

  constructor: (path, vue = {})->
    @keys = [null]
    @scanner = new RegExp path.replace /:([a-z_]+)/ig, (_, key)=>
      @keys.push key
      switch LOCATION.options[key].type
        when Number
          "([\\.0-9]+)"
        else
          "([^\\/\\-\\=\\.]+)"
    , "i"

    @vue = new Vue _.merge vue,
      data:
        url: {}
        params: []
    @vue.$watch 'url', (url)=>
      @pushstate()
      @target

  popstate: (path, @target)->
    @match = @scanner.exec(path)
    @params = []
    if @match
      for key, i in @keys
        if key
          value = @match[i]
          @change key, value
    @vue.$set "url", Url.data
    @vue.$set "params", @params

  pushstate: (path)->
    link = location.href
    if location[@target]? && history?
      link.replace @scanner, (_, key)=> @value key
      history.pushState "pushstate", null, link

  change: (key, value)->
    @params.push key
    Url.data[key] = LOCATION.options[key].type value
    if LOCATION.bind[key]?
      for subkey, subval of LOCATION.bind[key][Url.data[key]]
        @change subkey, subval if key != subkey

  value: (key)->
    console.log [key, Url.data[key], LOCATION.options[key]]
    Url.data[key] | LOCATION.options[key].current



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
    computed:
      style: ->
        h = {}
        for key in @params
          val = @url[key]
          h["#{val}-#{key}"] = true if key? && val? && String == LOCATION.options[key].type
        Object.keys(h).join(" ")

Url.boot()




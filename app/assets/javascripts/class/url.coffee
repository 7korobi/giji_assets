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

###
      $(this.el).tokenfield();
      $(this.el).on('tokenfield:editedtoken',function (e) {
        self.vm.$set(self.key,$(this).tokenfield("getTokensList", ','));
      }).on('tokenfield:createdtoken', function(e){
        self.vm.$set(self.key,$(this).tokenfield("getTokensList", ','));
      }).on('tokenfield:removedtoken', function(e){
        self.vm.$set(self.key,$(this).tokenfield("getTokensList", ','));
      });
    },
    update: function(value){
      $(this.el).tokenfield('setTokens',value);
    }

el: the element the directive is bound to.
key: the keypath of the binding, excluding arguments and filters.
arg: the argument, if present.
expression: the raw, unparsed expression.
vm: the context ViewModel that owns this directive.
value: the current binding value.
# <div v-href=""></div>
###

Parse =
  Array: (val)->
    if val.split?
      val.split ","
    else
      val

  Date: (val)->
    new Date Number val

class Url
  @popstate = ->
    if document.cookies
      for url_key in LOCATION.cookie
        LOCATION.routes[url_key].popstate(document.cookies)
    if location.search
      for url_key in LOCATION.search
        LOCATION.routes[url_key].popstate(location.search)
    if location.hash
      for url_key in LOCATION.hash
        LOCATION.routes[url_key].popstate(location.hash)

  @change = (key, value)->
    obj =  LOCATION.options[key]
    obj.value = eval(obj.type) value
    console.log [key, obj.value]

  @value  = (key)->
    console.log [key, "set"]
    obj =  LOCATION.options[key]
    obj.value | obj.current

  constructor: (path)->
    @keys = [null]
    @scanner = new RegExp path.replace /:([a-z_]+)/ig, (_, key)=>
      @keys.push key
      "([^\\/\\-\\=\\.]+)"
    , "i"

  popstate: (path)->
    @match = @scanner.exec(path)
    if @match
      for key, i in @keys
        if key
          value = @match[i]
          Url.change(key, value)

  pushstate: (path)->
    link = location.href
    link.replace @scanner, (_, key)->
      Url.value(key)
    if history?
      history.pushState("pushstate", null, link)

for key, val of LOCATION.routes
  LOCATION.routes[key] = new Url(val)

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


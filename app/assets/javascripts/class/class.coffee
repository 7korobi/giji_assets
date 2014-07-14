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
    if @match
      path.replace @scanner, (_, key)->
        Url.value(key)

for key, val of LOCATION.routes
  LOCATION.routes[key] = new Url(val)

window.onhashchange = (event)->
  if event.clipboardData
    console.log event
  else
    Url.popstate()

window.onpopstate = (event)->
  if event.clipboardData
    console.log event
  else
    Url.popstate()


LOCATION.pathname = []
LOCATION.cookie = []
LOCATION.search = []
LOCATION.hash = ["css"]

Url.routes =
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

Url.hash = ["css"]
Url.options = LOCATION.options
Url.bind = LOCATION.bind

Url.routes =
  css: new Url "css=:theme-:width-:layout-:font", (params)->
    @style_p ||= ""
    h = 
      w770: true
    for key, val of params
      h["#{val}-#{key}"] = true if key? && val? && "String" == ((Url.options[key]?.type) || "String")
    style = Object.keys(h).join(" ")

    html = document.documentElement
    html.className = html.className.replace @style_p, style
    @style_p = style

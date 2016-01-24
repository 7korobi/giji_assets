iframe_handler = document.createElement("div")
document.body.appendChild iframe_handler
iframe_handler.style.display = "none"

typeof_str = Object.prototype.toString
type = (o)->
  typeof_str.call(o)[8..-2]

build = (key, o, cb)->
  switch type o
    when "Array"
      for val in o
        cb "#{key}[]", val
    when "Object"
      for subkey, val of o
        break unless val?
        cb "#{key}#{subkey}", val
    else
      cb key, val


module.exports = Submit =
  get: (url, params)->
    query_string = "?"
    for key, val of params
      query_string += "#{key}=#{val}"
    query =
      method: "GET"
      url: url + encodeURI(query_string)
      deserialize: unpack.HtmlGon
    m.request(query)

  iframe: (url, params)->
    deferred = m.deferred()

    auto_submit =
      action: encodeURI url
      method: "POST"
      target: "submit_result"
      config: (form)->
        form.style.display = "none"
        form.submit()

    auto_load =
      name: "submit_result"
      config: (iframe)->
        timer = setTimeout ->
          deferred.reject Error("form request time out.")
        , DELAY.largo
        iframe.style.display = "none"
        iframe.contentWindow.name = "submit_result"
        iframe.onload = ->
          console.log "iframe.onload"
          try
            clearTimeout timer
            deferred.resolve unpack.HtmlGon iframe.contentDocument.body.innerHTML
          catch e
            deferred.reject e
          finally
            m.endComputation()

    m.startComputation()
    m.render iframe_handler,
      m 'iframe', auto_load
      m 'form#submit_request', auto_submit,
        build "", params, (key, val)->
          m 'input',
            type: "hidden"
            name: key
            value: val

    deferred.promise

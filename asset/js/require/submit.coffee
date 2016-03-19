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
        continue unless val
        cb "#{key}#{subkey}", val
    when "Function"
      if val = o()
        cb key, val
    else
      if o
        cb key, o

iframe_handler = document.createElement("div")
document.body.appendChild iframe_handler
iframe_handler.style.display = "none"

module.exports = Submit =
  get: (base_url, params)->
    query_array = ["?"]
    for key, val of params
      query_array.push "#{key}=#{val}"

    method = "GET"
    url = base_url + encodeURI(query_array.join("&"))
    deserialize = Mem.unpack.HtmlGon
    m.request({method, url, deserialize})
    .then (data)->
      console.log " :: GET #{url}"
      data

  iframe: (url, params)->
    new Promise (ok, ng)->
      auto_submit =
        action: url
        method: "POST"
        target: "submit_result"
        config: (form)->
          form.style.display = "none"
          form.submit()

      auto_load =
        name: "submit_result"
        sandbox: "allow-same-origin"
        config: (iframe)->
          timer = setTimeout ->
            ng new Error("form request time out.")
          , 10000
          iframe.style.display = "none"
          iframe.contentWindow.name = "submit_result"
          iframe.onload = ->
            try
              clearTimeout timer
              ok Mem.unpack.HtmlGon iframe.contentDocument.body.innerHTML
            catch e
              ng e
            finally
              requestAnimationFrame ->
                m.endComputation()

      m.startComputation()
      m.render iframe_handler, [
        m 'iframe', auto_load
        m 'form#submit_request', auto_submit,
          build "", params, (key, val)->
            m 'input',
              type: "hidden"
              name: key
              value: val
      ]
    .then (data)->
      p = {gon: {}}
      data.call p, p
      console.log " :: POST(iframe) -> #{url}"
      console.log p
      p.gon


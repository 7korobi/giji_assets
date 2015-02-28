# Original JavaScript code by Chirp Internet: www.chirp.com.au
# Please acknowledge use of this code by including this header.
Hilitor = (id, tag) ->
  targetNode = document.getElementById(id) or document.body
  hiliteTag = tag or "EM"
  skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN)$")
  colors = [
    "#ff6"
    "#a0ffff"
    "#9f9"
    "#f99"
    "#f6f"
  ]
  wordColor = []
  colorIdx = 0
  matchRegex = ""
  openLeft = false
  openRight = false
  @setMatchType = (type) ->
    switch type
      when "left"
        @openLeft = false
        @openRight = true
      when "right"
        @openLeft = true
        @openRight = false
      when "open"
        @openLeft = @openRight = true
      else
        @openLeft = @openRight = false
    return

  @setRegex = (input) ->
    input = input.replace(/^[^\w]+|[^\w]+$/g, "").replace(/[^\w'-]+/g, "|")
    re = "(" + input + ")"
    re = "\\b" + re  unless @openLeft
    re = re + "\\b"  unless @openRight
    matchRegex = new RegExp(re, "i")
    return

  @getRegex = ->
    retval = matchRegex.toString()
    retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "")
    retval = retval.replace(/\|/g, " ")
    retval


  # recursively apply word highlighting
  @hiliteWords = (node) ->
    return  if node is `undefined` or not node
    return  unless matchRegex
    return  if skipTags.test(node.nodeName)
    if node.hasChildNodes()
      i = 0

      while i < node.childNodes.length
        @hiliteWords node.childNodes[i]
        i++
    if node.nodeType is 3 # NODE_TEXT
      if (nv = node.nodeValue) and (regs = matchRegex.exec(nv))
        wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length]  unless wordColor[regs[0].toLowerCase()]
        match = document.createElement(hiliteTag)
        match.appendChild document.createTextNode(regs[0])
        match.style.backgroundColor = wordColor[regs[0].toLowerCase()]
        match.style.fontStyle = "inherit"
        match.style.color = "#000"
        after = node.splitText(regs.index)
        after.nodeValue = after.nodeValue.substring(regs[0].length)
        node.parentNode.insertBefore match, after
    return


  # emove highlighting
  @emove = ->
    arr = document.getElementsByTagName(hiliteTag)
    while arr.length and (el = arr[0])
      parent = el.parentNode
      parent.replaceChild el.firstChild, el
      parent.normalize()
    return


  # start highlighting at target node
  @apply = (input) ->
    @emove()
    return  if input is `undefined` or not input
    @setRegex input
    @hiliteWords targetNode
    return

  return

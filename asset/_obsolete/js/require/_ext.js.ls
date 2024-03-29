player = (log)->
  return log unless log
  log.replace //
    (/\*)(.*?)(\*/|$)
  //g,'<em>$1<span class="player">$2</span>$3</em>'

unanchor = (log)->
  return log unless log
  log.replace /<mw (\w+),(\d+),([^>]+)>/g, (key, a, turn, id)->
    """>>#{id}"""

anchor = (log)->
  return log unless log
  log.replace /<mw (\w+),(\d+),([^>]+)>/g, (key, a, turn, id)->
    """<span anchor="#{a},#{turn},#{id}" class="mark">&gt;&gt;#{id}</span>"""

anchor_preview = (log)->
  log

unrandom = (log)->
  return log unless log
  log.replace /<rand ([^>]+),([^>]+)>/g, (key, val, cmd)->
    cmd

random = (log)->
  return log unless log
  log.replace /<rand ([^>]+),([^>]+)>/g, (key, val, cmd)->
    cmd = cmd.replace /]]]]/, "]]"
    """<span data-tooltip="#{cmd} = #{val}" class="mark tooltip-top">#{val}</span>"""

random_preview = (log)->
  log.replace /\[\[([^\[]+)\]\]/g, (key, val)->
    """<span data-tooltip="#{val} = ？" class="mark tooltip-top">#{val}</span>"""

link_regexp = //
  (\w+):\/\/([^/<>）］】」\s]+)([^<>）］】」\s]*)
//
link_regexp_g = //
  (\w+):\/\/([^/<>）］】」\s]+)([^<>）］】」\s]*)
//g

id_num = 0
uri_to_link = _.memoize (uri)->
  id_num++
  [uri, protocol, host, path] = uri.match link_regexp
  """<span data-tooltip="
  #{host}
  #{path}

" external="link_#{id_num},#{uri},#{protocol},#{host},#{path}" class="emboss tooltip-top">LINK - #{protocol}</span>"""

link = (log)->
  return log unless log
  text = log.replace(/\s|<br>/g, ' ').replace(/(<([^>]+)>)/ig,"")
  uris = text.match link_regexp_g
  if uris
    for uri in uris
      log = log.replace uri, uri_to_link uri
  return log

space = (log)->
  return log unless log
  log.replace /(^|\n|<br>)(\ *)/gm, (full, s1, s2, offset)->
    s1 ||= ""
    nbsps = s2.replace /\ /g, '&nbsp;'
    "#{s1}#{nbsps}"

br = (log)->
  log.replace /\n/gm, (br)-> "<br>"

unbr = (log)->
  log.replace /<br>/gm, (br)-> "\n"

nowrap = (log)->
  log.replace /<br>|\n/gm, (br)-> " "

unhtml = (log)->
  log.replace /&/g, "&amp;"
     .replace /</g, "&lt;"
     .replace />/g, "&gt;"
     .replace /"/g, "&quot;"
     .replace /'/g, "&apos;"
     .replace /\//g, "&\#x2f;"

Number.MAX_INT32 = 0x7fffffff
Number.MAX_BITS  = 0xffffffff


defines = (obj, hash)!->
  configurable = false
  enumerable = false
  for key, {get, set} of hash
    Object.defineProperty obj.prototype, key, {configurable, enumerable, get, set}

defines Array,
  last:
    get: -> @[@.length - 1]

  first:
    get: -> @[0]


defines String,
  deco_preview:
    get: ->
      br space player anchor_preview link random_preview unhtml @

  deco_text_br:
    get: ->
      space player anchor link random @

  deco_text_lf:
    get: ->
      br space player anchor link random @

  line_text:
    get: ->
      nowrap player anchor link random @

  undecolate:
    get: ->
      unanchor unrandom unbr @

  sjis_length:
    get: ->
      # countup sjis byte size
      other = @match(/[^\x01-\xff]/g) or []
      @length + other.length

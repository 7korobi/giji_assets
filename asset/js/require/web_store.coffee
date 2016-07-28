Tie = require "./tie"

storage_prop = (store, key, unpack, pack)->
  (val)->
    if arguments.length
      store.setItem key, pack val
    else
      unpack store.getItem key

cookie_prop = (options, key, unpack, pack)->
  (val)->
    if arguments.length
      ary = ["#{key}=#{pack val}"]

      { time, domain, path, secure } = options
      if time
        expires = new Date Math.min 2147397247000, Date.now() + time * 3600000
        ary.push "expires=#{expires.toUTCString()}"
      if domain
        ary.push "domain=#{domain}"
      if path
        ary.push "path=#{path}"
      if secure
        ary.push "secure"
      document.cookie = ary.join("; ")
    else
      match = ///#{key}=([^;]+)///.exec document.cookie
      if match?[0]?
        unpack match[1]


class WebStore
  @maps: (ha)->
    @session = Tie.build_store ha.session, storage_prop, sessionStorage
    @local   = Tie.build_store ha.local,   storage_prop,   localStorage
    @cookie  = Tie.build_store ha.cookie,   cookie_prop, @cookie_options
    @params  = Tie.params

  @copyBy: (source)->
    for store in Tie.types.store
      @[store].copyBy source

  @copyTo: (target)->
    for store in Tie.types.store
      @[store].copyTo target

module.exports = WebStore
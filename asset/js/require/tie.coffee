memory_prop = (params, key, unpack)->
  (val)->
    if arguments.length
      params[key] = unpack val
    else
      params[key]


class Tie
  @types =
    url: ["protocol", "host", "pathname", "search", "hash", "href"]
    store: ["session", "local", "cookie"]

  @build_input: (ids, params, inputTie, Input)->
    tie = new Tie
    for o in Mem.Query.inputs.where(_id: ids || []).list
      inputTie.input[o._id] = new Input inputTie, o
      tie.deploy memory_prop, params, o
    tie


  @build_url: (hh, params, Url)->
    tie = new Tie
    for type in Tie.types.url
      if h = hh[type]
        for conf, format of h
          unless Url.conf[conf]
            Url.type[type].push Url.conf[conf] = new Url conf, type, format
    for store in Mem.Query.stores.list
      tie.deploy memory_prop, params, store
    tie

  @build_store: (ids, define, params)->
    tie = new Tie
    for store in Mem.Query.stores.where(_id: ids || []).list
      tie.deploy define, params, store
    tie

  constructor: ->
    @prop = {}

  deploy: (define, params, { _id, current, type })->
    unpack = Mem.unpack[type]
    pack   = Mem.pack[type]
    params[_id] = unpack current
    @prop[_id] = define params, _id, unpack, pack

  save: ->
    for key, prop of @prop
      prop Url.prop key

Tie.params = {}

module.exports = Tie

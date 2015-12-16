###
Mem v0.0.3
http://github.com/7korobi/---
(c) 7korobi
License: MIT
###

typeof_str = Object.prototype.toString
type = (o)->
  typeof_str.call(o)[8..-2]

def = (obj, key, {get, set})->
  configurable = false
  enumerable = false
  Object.defineProperty obj, key, {configurable, enumerable, get, set}
  return


class @Mem
  @rule = {}

class Mem.Query
  constructor: (@finder, @filters, @desc, @sort_by)->

  _filters: (query, cb)->
    return @ unless query
    filters = @filters.concat()
    switch type query
      when "Object"
        for target, req of query
          filters.push cb target, req
      when "Function"
        filters.push cb null, query
      else
        console.log [type query, query]
        throw Error 'unimplemented'
    new Mem.Query @finder, filters, @desc, @sort_by

  in: (query)->
    @_filters query, (target, req)->
      switch type req
        when "Array"
          (o)->
            for key in req
              return true if key in o[target]
            false
        when "RegExp"
          (o)->
            for val in o[target]
              return true if req.test val
            false
        when "Null", "Boolean", "String", "Number"
          (o)->
            req in o[target]
        else
          console.log [type req, req]
          throw Error 'unimplemented'

  distinct: (reduce, target)->
    query = new Mem.Query @finder, @filters, @desc, @sort_by
    query._distinct = {reduce, target}
    query

  where: (query)->
    @_filters query, (target, req)->
      switch type req
        when "Array"
          (o)->
            o[target] in req
        when "RegExp"
          (o)-> req.test o[target]
        when "Function"
          req
        when "Null", "Boolean", "String", "Number"
          (o)-> o[target] == req
        else
          console.log [type req, req]
          throw Error 'unimplemented'

  search: (text)->
    return @ unless text
    list =
      for item in text.split(/\s+/)
        item = item.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
        continue unless item.length
        "(#{item})"
    return @ unless list.length
    regexp = (new RegExp list.join("|"), "ig")
    @where (o)-> (! o.search_words) || regexp.test o.search_words

  sort: (desc, order = @sort_by)->
    sort_by =
      switch type order
        when "Function"
          order
        when "String", "Number"
          (o)-> o[order]
        else
          console.log [type req, req]
          throw Error 'unimplemented'
    return @ if desc == @desc && sort_by == @sort_by
    new Mem.Query @finder, @filters, desc, sort_by

  clear: ->
    delete @_reduce
    delete @_list
    delete @_hash
    delete @_memory

  def @.prototype, "reduce",
    get: ->
      @finder.calculate(@) unless @_reduce?
      @_reduce

  def @.prototype, "list",
    get: ->
      @finder.calculate(@) unless @_list?
      @_list

  def @.prototype, "hash",
    get: ->
      @finder.calculate(@) unless @_hash?
      @_hash

  def @.prototype, "memory",
    get: ->
      @finder.calculate(@) unless @_memory?
      @_memory

  def @.prototype, "ids",
    get: ->
      Object.keys @memory

  find: (id)->
    @hash[id]

  finds: (ids)->
    for id in ids when o = @hash[id]
      o

  pluck: (keys...)->
    switch keys.length
      when 0
        @list.map -> null
      when 1
        @list.map (o)->
          o[keys[0]]
      else
        @list.map (o)->
          for key in keys
            o[key]

class Mem.Finder
  constructor: (@sort_by)->
    all = new Mem.Query @, [], false, @sort_by
    all._memory = {}
    @scope = {all}
    @query = {all}

  rehash: (rules, diff)->
    delete @query.all._reduce
    delete @query.all._list
    delete @query.all._hash
    @query =
      all: @query.all

    for rule in rules
      rule.rehash diff
    return

  calculate_reduce: (query)->
    init = (map)->
      o = {}
      o.count = 0 if map.count
      o.all   = 0 if map.all
      o

    reduce = (item, o, map)->
      unless map.max <= o.max
        o.max_is = item
        o.max = map.max
      unless o.min <= map.min
        o.min_is = item
        o.min = map.min
      o.count += map.count if map.count
      o.all += map.all if map.all

    calc = (o)->
      o.avg = o.all / o.count if o.all && o.count

    # map_reduce
    base = {}
    for id, {item, emits} of query._memory
      for [keys, last, map] in emits
        o = base
        for key in keys
          o = o[key] ||= {}
        o = o[last] ||= init map
        reduce item, o, map

    for group, emits of base
      for key, map of emits
        calc map
    query._reduce = base

  calculate_sort: (query)->
    list = query._list

    [lt, gt] =
      if query.desc
        [1, -1]
      else
        [-1, 1]

    s = query.orders = {}
    for o in list
      s[o._id] = query.sort_by(o)
    if list.length
      is_array = Array.isArray query.sort_by(list[0])

    query._list =
      if is_array
        list.sort (a,b)->
          a_list = s[a._id]
          b_list = s[b._id]
          for a_val, index in a_list
            b_val = b_list[index]
            return lt if a_val < b_val
            return gt if a_val > b_val
          return 0
      else
        list.sort (a,b)->
          a_val = s[a._id]
          b_val = s[b._id]
          return lt if a_val < b_val
          return gt if a_val > b_val
          return 0

  calculate_group: (query)->
    {reduce, target} = query._distinct
    query._list =
      for id, o of query._reduce[reduce]
        o[target]

  calculate_list: (query, all)->
    if query._memory == all
      deploy = (id, o)->
        query._hash[id] = o.item
    else
      query._memory = {}
      deploy = (id, o)->
        query._memory[id] = o
        query._hash[id] = o.item

    query._hash = {}
    query._list =
      for id, o of all
        for filters in query.filters
          o = null unless filters o.item
          break unless o
        continue unless o
        deploy(id, o)

  calculate: (query)->
    @calculate_list query, @query.all._memory
    if query._list.length && @map_reduce?
      @calculate_reduce query
      if query._distinct?
        @calculate_group query
    @calculate_sort query
    return

class Mem.Rule
  @responses = {}

  constructor: (field)->
    @id = "#{field}_id"
    @list_name = "#{field}s"
    @base_obj = {}
    @validates = []
    @responses = Mem.Rule.responses[field] ?= []
    @map_reduce = ->
    @protect = ->
    @deploy = (o)=>
      o._id = o[@id] unless o._id
      o[@id] = o._id unless o[@id]
    @finder = new Mem.Finder (list)-> list
    @finder.name = @list_name

    Mem.rule[field] = @
    Mem[@list_name] = @finder.query.all

  schema: (cb)->
    cache_scope = (key, finder, query_call)->
      switch type query_call
        when "Function"
          finder.query.all[key] = (args...)->
            finder.query["#{key}:#{JSON.stringify args}"] ?= query_call args...
        else
          finder.query.all[key] = query_call

    definer =
      scope: (cb)=>
        @finder.scope = cb @finder.query.all
        for key, query_call of @finder.scope
          cache_scope(key, @finder, query_call)

      default: (cb)=>
        for key, val of cb()
          @base_obj[key] = val

      depend_on: (parent)=>
        Mem.Rule.responses[parent] ?= []
        Mem.Rule.responses[parent].push @

      belongs_to: (parent, option)=>
        parents = "#{parent}s"
        parent_id = "#{parent}_id"

        def @base_obj, parent,
          get: ->
            Mem[parents].find @[parent_id]

        dependent = option?.dependent?
        if dependent
          definer.depend_on parent
          @validates.push (o)-> o[parent]?

      has_many: (children, option)=>
        key = @id
        all = @finder.query.all
        query = option?.query

        cache_scope children, @finder, (id)->
          query ?= Mem[children]
          query.where (o)-> o[key] == id

        def @base_obj, children,
          get: ->
            all[children](@._id)

      order: (order)=>
        query = @finder.query.all.sort false, order
        query._memory = @finder.query.all._memory
        Mem[@list_name] = @finder.query.all = query

      protect: (keys...)=>
        @protect = (o, old)->
          for key in keys
            o[key] = old[key]

      deploy: (@deploy)=>
      map_reduce: (@map_reduce)=>

    cb.call(definer, @)

  rehash: (diff)->
    @finder.rehash @responses, diff


  set_base: (mode, from, parent)->
    finder = @finder
    diff = finder.diff
    all = finder.query.all._memory

    deployer =
      (o)=>
        o.__proto__ = @base_obj
        @deploy o

    validate_item = (item)=>
      for validate in @validates
        return false unless validate item
      true

    each = (process)->
      switch type from
        when "Array"
          for item in from || []
            continue unless item
            process(item)
        when "Object"
          for id, item of from || {}
            continue unless item
            item._id = id
            process(item)
      return

    switch mode
      when "merge"
        each (item)=>
          for key, val of parent
            item[key] = val

          deployer item
          return unless validate_item item

          o = {item, emits: []}
          old = all[item._id]
          if old?
            @protect item, old.item
            diff.change = true
          else
            diff.add = true
          all[item._id] = o

          emit = (keys..., last, map)=>
            finder.map_reduce = true
            o.emits.push [keys, last, map]
          @map_reduce o.item, emit
          return

      else
        each (item)=>
          old = all[item._id]
          if old?
            diff.del = true
            delete all[item._id]
          return

    @rehash(diff)
    return

  set: (list, parent)->
    @finder.diff = {}
    for key, val of @finder.query.all._memory
      @finder.query.all._memory = {}
      @finder.diff.del = true
      break
    @set_base "merge", list, parent

  reject: (list)->
    @finder.diff = {}
    @set_base false, list, null

  merge: (list, parent)->
    @finder.diff = {}
    @set_base "merge", list, parent

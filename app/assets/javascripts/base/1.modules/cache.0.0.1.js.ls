/*
Cache v0.0.1
http://github.com/7korobi/---
(c) 7korobi
License: MIT
*/

export class Cache
  @rule = {}

class Cache.Query
  (@finder, @filters, @desc, @sort_by)->

  _filters: (query, cb)->
    return @ unless query
    filters = @filters.concat()
    switch typeof! query
      when \Object
        for target, req of query
          filters.push cb target, req
      when \Function
        filters.push cb null, query
      else
        console.log [typeof! query, query]
        ...
    new Cache.Query @finder, filters, @desc, @sort_by

  in: (query)->
    @_filters query, (target, req)->
      switch typeof! req
        when \Array
          (o)->
            for key in req
              for val in o[target]
                return true if val == key
            false
        when \RegExp
          (o)->
            for val in o[target]
              return true if req.test val
            false
        when \Null, \Boolean, \String, \Number
          (o)->
            for val in o[target]
              return true if val == req
            false
        else
          console.log [typeof! req, req]
          ...

  distinct: (reduce, target)->
    query = new Cache.Query @finder, @filters, @desc, @sort_by
    query._distinct = {reduce, target}
    query

  where: (query)->
    @_filters query, (target, req)->
      switch typeof! req
        when \Array
          (o)->
            for key in req
              return true if o[target] == key
            false
        when \RegExp
          (o)-> req.test o[target]
        when \Function
          req
        when \Null, \Boolean, \String, \Number
          (o)-> o[target] == req
        else
          console.log [typeof! req, req]
          ...

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
      switch typeof! order
        when \Function
          order
        when \String, \Number
          (o)-> o[order]
        else
          console.log [typeof! req, req]
          ...
    return @ if desc == @desc && sort_by == @sort_by
    new Cache.Query @finder, @filters, desc, sort_by

  clear: ->
    delete @_reduce
    delete @_list
    delete @_hash

  reduce: ->
    @finder.calculate(@) unless @_reduce?
    @_reduce

  list: ->
    @finder.calculate(@) unless @_list?
    @_list

  hash: ->
    @finder.calculate(@) unless @_hash?
    @_hash

  find: (id)->
    @hash()[id]?.item

  finds: (ids)->
    for id in ids
      o = @hash()[id]
      continue unless o
      o?.item

class Cache.Finder
  (@sort_by)->
    all = new Cache.Query @, [], false, @sort_by
    all._hash = {}
    @scope = {all}
    @query = {all}

  rehash: (rules, diff)->
    delete @query.all._reduce
    delete @query.all._list
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
    for id, {item, emits} of query._hash
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
    unless query._hash == all
      query._hash = {}
      deploy = (id, o)->
        query._hash[id] = o
        o.item
    else
      deploy = (id, o)->
        o.item

    query._list =
      for id, o of all
        for filters in query.filters
          o = null unless filters o.item
          break unless o
        continue unless o
        deploy(id, o)

  calculate: (query)->
    @calculate_list query, @query.all._hash
    if query._list.length && @map_reduce?
      @calculate_reduce query
      if query._distinct?
        @calculate_group query
    @calculate_sort query
    return

class Cache.Rule
  @responses = {}

  (field)->
    @id = "#{field}_id"
    @list_name = "#{field}s"
    @base_obj = {}
    @validates = []
    @responses = Cache.Rule.responses[field] ?= []
    @map_reduce = ->
    @protect = ->
    @deploy = (o)~>
      o._id = o[@id] unless o._id
      o[@id] = o._id unless o[@id]
    @finder = new Cache.Finder (list)-> list
    @finder.name = @list_name

    Cache.rule[field] = @
    Cache[@list_name] = @finder.query.all

  schema: (cb)->
    definer =
      scope: (cb)~>
        @finder.scope = cb @finder.query.all
        set_scope = (key, finder, query_call)->
          switch typeof! query_call
            when \Function
              finder.query.all[key] = (...args)->
                finder.query["#{key}:#{JSON.stringify args}"] ?= query_call ...args
            else
              finder.query.all[key] = query_call
        for key, query_call of @finder.scope
          set_scope(key, @finder, query_call)

      default: (cb)~>
        @base_obj <<< cb()

      depend_on: (parent)~>
        Cache.Rule.responses[parent] ?= []
        Cache.Rule.responses[parent].push @

      belongs_to: (parent, option)~>
        parents = "#{parent}s"
        parent_id = "#{parent}_id"
        @base_obj[parent] = ->
          Cache[parents].find @[parent_id]

        dependent = option?.dependent?
        if dependent
          definer.depend_on parent
          @validates.push (o)-> o[parent]()?

      order: (order)~>
        query = @finder.query.all.sort false, order
        query._hash = @finder.query.all._hash
        Cache[@list_name] = @finder.query.all = query

      protect: (...keys)~>
        @protect = (o, old)->
          for key in keys
            o[key] = old[key]

      deploy: (@deploy)~>
      map_reduce: (@map_reduce)~>

    cb.call(definer, @)

  rehash: (diff)->
    @finder.rehash @responses, diff


  set_base: (mode, from, parent)->
    finder = @finder
    diff = finder.diff
    all = finder.query.all._hash

    deployer =
      if head.browser.ie || head.browser.safari
        (o, base)->
          _.defaults o, base
      else
        (o, base)->
          o.__proto__ = base

    deployer =
      if head.browser.ie || head.browser.safari
        (o)~>
          _.defaults o, @base_obj
          @deploy o
      else
        (o)~>
          o.__proto__ = @base_obj
          @deploy o

    validate_item = (item)~>
      for validate in @validates
        return false unless validate item
      true

    switch mode
      when "merge"
        for item in from || []
          for key, val of parent
            item[key] = val

          deployer item
          continue unless validate_item item

          o = {item, emits: []}
          old = all[item._id]
          if old?
            @protect item, old.item
            diff.change = true
          else
            diff.add = true
          all[item._id] = o

          emit = (...keys, last, map)~>
            finder.map_reduce = true
            o.emits.push [keys, last, map]
          @map_reduce o.item, emit

      else
        for item in from || []
          o = {item, emits: []}
          old = all[item._id]
          if old?
            diff.del = true
            delete all[item._id]

    @rehash(diff)
    return

  set: (list, parent)->
    @finder.diff = {}
    for key, val of @finder.query.all._hash
      @finder.query.all._hash = {}
      @finder.diff.del = true
      break
    @set_base "merge", list, parent

  reject: (list)->
    @finder.diff = {}
    @set_base false, list, null

  merge: (list, parent)->
    @finder.diff = {}
    @set_base "merge", list, parent

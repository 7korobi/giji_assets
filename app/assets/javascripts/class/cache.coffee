class Cache
  @rule = {}


class Cache.Query
  constructor: (@finder, @match, @desc, @sort_by)->
    @_hash = {}

  _match: (query, cb)->
    return @ unless Object.keys(query).length
    match = @match.concat()
    for target, req of query
      is_object = "object" == typeof req
      match.push cb target, req,
        switch typeof req
          when "object"
            switch 
              when req.test?
                RegExp 
              when req.length?
                Array
              else
                Object
          when "number"
            Number
          when "string"
            String

    new Cache.Query @finder, match, @desc, @sort_by

  in: (query)->
    switch typeof query
      when "object"
        @_match query, (target, req, type)->
          switch type
            when Array
              (o)-> 
                for key in req
                  for val in o[target]
                    return true if val == key
                false
            when RegExp
              (o)->
                for val in o[target]
                  return true if req.test val
                false
            else
              (o)-> 
                for val in o[target]
                  return true if val == req
                false

  where: (query)->
    switch typeof query
      when "object"
        @_match query, (target, req, type)->
          switch type
            when Array
              (o)-> 
                for key in req
                  return true if o[target] == key
                false
            when RegExp
              (o)-> req.test o[target]
            else
              (o)-> o[target] == req
      when "function"
        match = @match.concat query
        new Cache.Query @finder, match, @desc, @sort_by

  search: (text)->
    return @ unless text
    list = 
      for item in text.split(/\s+/)
        item = item.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
        continue unless item.length
        "(#{item})"
    return @ unless list.length
    regexp = (new RegExp list.join("|"), "ig")
    @in search_words: regexp

  sort: (desc, order = @sort_by)->
    sort_by = 
      switch typeof order
        when "function"
          order
        when "string"
          (o)-> o[order]
    return @ if desc == @desc && sort_by == @sort_by
    new Cache.Query @finder, @match, desc, sort_by

  reduce: ->
    @finder.calculate(@) unless @_reduce?
    @_reduce

  list: ->
    @finder.calculate(@) unless @_list?
    @_list

  find: (id)->
    @finder.calculate(@) unless @_hash?
    @_hash[id]?.item


class Cache.Finder
  constructor: (@sort_by)->
    all = new Cache.Query @, [], false, @sort_by
    @scope = {all}
    @query = {all}

  rehash: (rules)->
    return unless @diff.del || @diff.change
    @query = 
      all: @query.all
    for rule in rules
      rule
    return

  calculate_map_reduce: (query)->
    init = (map)=>
      o = {}
      o.count = 0 if map.count
      o.all   = 0 if map.all
      o

    reduce = (item, o, map)=>
      unless map.max <= o.max
        o.max_is = item
        o.max = map.max
      unless o.min <= map.min
        o.min_is = item
        o.min = map.min 
      o.count += map.count if map.count
      o.all += map.all if map.all

    calc = (o)=>
      o.avg = o.all / o.count if o.all && o.count

    # map_reduce
    base = {}
    for id, {item, emits} of query._hash
      for emit in emits 
        [group, key, map] = emit
        o = base
        o = o[group] ||= {}
        o = o[key] ||= init map
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

    query.orders = s = {}
    for o in list
      s[o._id] = query.sort_by(o)
    query._list =
      list.sort (a,b)->
        return lt if s[a._id] < s[b._id]
        return gt if s[a._id] > s[b._id]
        return  0

  calculate_list: (query, all)->
    # list and hash
    query._list = 
      for id, o of all._hash
        {item} = o
        for match in query.match
          o = null unless match item
          break unless o
        continue unless o

        query._hash[id] = o
        item

  calculate: (query)->
    @calculate_list       query, @query.all
    @calculate_sort       query
    @calculate_map_reduce query if @map_reduce?
    return

class Cache.Rule
  constructor: (field)->
    @id = "#{field}_id"
    @list_name = "#{field}s"
    @validates = []
    @responses = []
    @map_reduce = ->
    @protect = ->
    @deploy = (o)=>
      o._id = o[@id] unless o._id
      o[@id] = o._id unless o[@id]

    @finder = new Cache.Finder (list)-> list

    Cache.rule[field] = @
    Cache[@list_name] = @finder.query.all

  schema: (cb)->
    definer =
      scope: (cb)=>
        @finder.scope = cb @finder.query.all
        for key, query_call of @finder.scope
          @finder.query.all[key] = (args...)=>
            @finder.query["#{key}:#{args.join(',')}"] ||= query_call args...

      belongs_to: (parent, option)=>
        parents = "#{parent}s"
        parent_id = "#{parent}_id"

        dependent = option?.dependent?
        if dependent
          Cache.rule[parent].responses.push @ 

        @validates.push (o)->
          that = Cache[parents]?.find(o[parent_id])
          if that?
            o[parent] = that 
          else
            ! dependent

      order: (order)=>
        query = @finder.query.all.sort false, order
        query._hash = @finder.query.all._hash
        Cache[@list_name] = @finder.query.all = query

      protect: (keys...)=>
        @protect = (o, old)->
          for key in keys
            o[key] = old[key]

      deploy: (@deploy)=>
      map_reduce: (@map_reduce)=>

    cb.call(definer, @)


  set_base: (mode, from, parent)->
    finder = @finder
    diff = finder.diff
    all = finder.query.all._hash
 
    validate_item = (item)=>
      for validate in @validates
        return false unless validate item
      true

    switch mode
      when "merge"
        for item in from || []
          continue unless validate_item item
          for key, val of parent
            item[key] = val

          @deploy item
          o = {item, emits: []}
          old = all[item._id]
          if old?
            @protect item, old.item
            diff.change = true 
          else
            diff.add = true
          all[item._id] = o

          emit = (group, key, map)=>
            finder.map_reduce = true
            o.emits.push [group, key, map]
          @map_reduce o.item, emit

      else
        for item in from || []
          @deploy item
          o = {item, emits: []}
          old = all[item._id]
          if old?
            diff.del = true
            delete all[item._id]

    finder.rehash @responses
    return

  set: (list, parent)->
    @finder.diff = {}
    for key, val of @finder.query.all._hash 
      @finder.query.all._hash = {}
      @finder.diff.del = true
      break
    @set_base "merge", list, parent, "merge"

  reject: (list)->
    @finder.diff = {}
    @set_base false, list, null

  merge: (list, parent)->
    @finder.diff = {}
    @set_base "merge", list, parent

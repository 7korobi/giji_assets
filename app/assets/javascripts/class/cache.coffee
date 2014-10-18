class Cache
  @rule = {}


class Cache.Query
  constructor: (@finder)->
    @q = {}

  where: (scopes)->
    query = new Cache.Query(@finder)
    query.q = _.extend({}, @q, scopes)
    query

  search: (text)->
    return @ unless text
    list = 
      for item in text.split(/\s+/)
        item = item.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
        continue unless item.length
        "(#{item})"
    return @ unless list.length
    @finder.search(new RegExp list.join("|"), "ig")
    @where search:["match"]

  find: (id, kind = "all", scope = "_all")->
    @finder.scopes[scope].hash[kind][id]

  sort: (desc)->
    @finder.sort_func desc, @finder.list @q

  list: ->
    @finder.list(@q)


class Cache.Finder
  constructor: (@scopes, @sort_func)->
    @all = new Cache.Query @
    @base_map = => @scopes._all.hash.all
    @map = (o)-> o._id

  search: (@search_regexp)->
    all = _.values @base_map()

    scope = @scopes.search
    scope.hash = {}
    scope.merge all
    @map_reduce
      search: @scopes.search

  list: (query)->
    for id, val of @base_map()
      for scope, kinds of query
        val = null
        for kind in kinds
          kind_hash = @scopes[scope].hash[kind]
          continue unless kind_hash
          
          val = kind_hash?[id]
          break if val
        break unless val
      continue unless val
      val

  refresh: ->
    @cache = {}
    @diff = {}

  map_reduce: (scopes)->
    init = (val)->
      count: 0
      sum: 0

    if scopes?
      @all.reduce ?= {}
    else
      @all.reduce = {}
      scopes = @scopes

    for id, val of @base_map()
      for scope_key, scope of scopes
        @all.reduce[scope_key] = {}
        for kind_key, hash of scope.hash
          first = @map val
          @all.reduce[scope_key][kind_key] = init first
      break

    switch typeof first
      when "number"
        @reduce_calc = true
        map = (val)->
          max: val
          min: val
          count: 1
          sum: val

      else
        map = (val)->
          max: val
          min: val
          count: 1

    reduce = (target, emit, val)=>
      unless emit.max <= target.max
        target.max = emit.max
        target.last = val
      unless target.min <= emit.min
        target.min = emit.min 
        target.first = val
      target.count += emit.count if emit.count
      target.sum += emit.sum if emit.sum

    calc = (target)=>
      if @reduce_calc
        target.avg = target.sum / target.count 

    for id, val of @base_map()
      emit = map @map val
      for scope_key, scope of scopes
        for kind_key, hash of scope.hash
          target = @all.reduce[scope_key][kind_key]
          if hash[val._id]?
            reduce target, emit, val

    for scope_key, scope of scopes
      for kind_key, hash of scope.hash
        target = @all.reduce[scope_key][kind_key]
        calc target


class Cache.Rule
  constructor: (field)->
    @id = "#{field}_id"
    @list_name = "#{field}s"
    @validates = []
    @responses = []
    @adjust =
      _id: (o)-> o._id = o[@id] unless o._id
    @adjust[@id] = (o)=> o[@id] = o._id unless o[@id]
    @adjust_keys = ["_id", @id]

    @finder = new Cache.Finder {}, (list)-> list
    @base_scope "_all",
      kind: -> ["all"]
      finder: @finder

    Cache.rule[field] = @
    Cache[@list_name] = @finder.all

  base_scope: (key, hash)->
    @finder.scopes[key] = scope = new Cache.Scope(@, hash)
    @finder.scope_keys = Object.keys(@finder.scopes).sort().reverse()
    scope.cleanup()

    all = _.values @finder.base_map()
    if 0 < all?.length
      scope.merge all
    scope

  schema: (cb)->
    order_base = (func)=>
      @finder.map = func
      @finder.sort_func = (desc, list)=>
        [lt, gt] =
          if desc 
            [1, -1]
          else
            [-1, 1]

        @finder.orders = s = {}
        for o in list
          s[o._id] = func(o)
        list.sort (a,b)->
          return lt if s[a._id] < s[b._id]
          return gt if s[a._id] > s[b._id]
          return  0

    definer =
      scope: (key, kind)=>
        cache = Cache[@list_name]
        @base_scope key,
          kind: kind
          finder: @finder

      search: (targets)=>
        kind = (o)=>
          regexp = @finder.search_regexp
          if regexp
            for text in targets(o)
              if text && text.match regexp
                return ["match"]
          return []
        @base_scope "search",
          kind: kind
          finder: @finder

      pager: (key, items)=>

      belongs_to: (parent, option)=>
        cache = Cache[@list_name]
        parents = "#{parent}s"
        parent_id = "#{parent}_id"

        @base_scope parent,
          kind: (o)-> [o[parent_id]]
          finder: @finder

        if option?.dependent?
          @validates.push (o)->
            that = Cache[parents]?.find(o[parent_id])
            o[parent] = that if that?
          Cache.rule[parent].responses.push @

      order: (func)=>
        order_base func

      order_by: (key)=>
        order_base (o)-> o[key]

      fields: (adjust)=>
        for key, cb of adjust
          @adjust[key] = cb

      protect: (key)=>
        @adjust[key] = (o, old)->
          o[key] = old[key] if old?

    cb.call(definer, @)
    @adjust_keys = _.keys(@adjust).sort()


  set_base: (from, cb)->
    all = @finder.base_map()
    list = []
 
    accept = (o)=>
      for validate in @validates
        return unless validate(o)
      list.push o

    for o in from || []
      accept o

    for o in list
      old = all?[o._id]
      for key in @adjust_keys
        @adjust[key](o, old)

    for key in @finder.scope_keys
      scope = @finder.scopes[key]
      cb scope, list

    @finder.map_reduce()
    return


  reject: (list)->
    @set_base list, (scope, list)->
      scope.reject list

    for rule in @responses
      rule.rehash() if @finder.diff.del || @finder.diff.change

  merge: (list)->
    @set_base list, (scope, list)->
      scope.merge list

  set: (list)->
    @set_base list, (scope, list)->
      scope.hash = {}
      scope.merge list

    for rule in @responses
      rule.rehash() if @finder.diff.del || @finder.diff.change

  rehash: ->
    all = _.values @finder.base_map()
    @set all

  cleanup: ->
    for key in @finder.scope_keys
      scope = @finder.scopes[key]
      scope.cleanup()


class Cache.Scope
  constructor: (@rule, {@kind, @finder})->

  adjust: (list, merge_phase)->
    all = @finder.base_map()
    @finder.refresh()

    for o in list
      if all?
        old = all[o._id]
      if old?
        for old_kind in @kind(old) || []
          if @hash[old_kind]?
            @finder.diff.del = true
            delete @hash[old_kind][o._id]

      merge_phase(o)
    return
  
  reject: (list)->
    @adjust list, ->

  merge: (list)->
    @adjust list, (o)=>
      for kind in @kind(o) || []
        if kind || kind == 0
          @hash[kind] ||= {}
          if @hash[kind][o._id]
            @finder.diff.change = true 
          else
            @finder.diff.add = true
          @hash[kind][o._id] = o
      return


  cleanup: ->
    @hash = {}

###
new Cache.Append  face: []

new Cache.Replace rule: []
new Cache.Guard   text: ["potof"], ["target", "targets","text", "style", "count"]
new Cache.Guard   vote: ["potof"], ["target", "targets"]

new Cache.Replace site:  []
new Cache.Replace story: ["site"]
new Cache.Append  event: ["story"]
new Cache.Append  scene: ["site"]

new Cache.Append message: ["scene"]
new Cache.Replace  potof: ["scene"]

Cache.data =
  form:
    role: {}
    text:
      title: "title-write"
      cmd: "write"
      csid_cid: ""
      text: ""
      style: ""
      target: ""
      targets: []
    vote: {}
    is_preview: off

    texts:
      - cmd: entry
        title:
        text:
        style:
        csid_cid:
        csid_cids:
        role:
        roles:
        is_preview:
        img: ->
        preview: ->
        request: ->
      - cmd: action
        title:
        text:
        target:
        targets:
        action:
        actions:
        no:
        nos:
        is_preview:
        preview: ->
        request: ->

      targets:
      - cmd: vote
        jst: target
        title:
        target:
        target2:
        targets:
        request: ->
      - cmd: entrust
        title:
        target:
        targets:
        request: ->
      - cmd: role
        title:
        target:
        target2:
        targets:
        request: ->
      - cmd: gift
        title:
        target:
        target2:
        targets:
        request: ->

      commands:
      - cmd: kick
        jst: target
        title:
        target:
        request: ->
      - cmd: maker
        jst: target
        title:
        target:
        request: ->

      - cmd: muster
        jst: button
        title:
        request: ->
      - cmd: start
        jst: button
        title:
        request: ->
      - cmd: update
        jst: button
        title:
        request: ->
      - cmd: extend
        jst: button
        title:
        request: ->
      - cmd: scrapvil
        jst: button
        title:
        request: ->

      links:
      - cmd: exit
        jst: button
        title:
        request: ->
      - cmd: makevilform
        title:
        request: ->

      side:
      - cmd: rolelist
        trsid:
        game:
        request: ->

  stories:
  events:
  potofs:
  story:
    story_id:
  event:
    story_id:
    event_id:
  potof:
    story_id:
    potof_id:
    user_id:
    sow_autn_id:

    longname:
    shortname:
    name:

    win:
      visible:
      result:
    point:
      actaddpt:
      saidpoint:
      saidcount:
    say:
      say:
      tsay:
      spsay:
      wsay:
      gsay:
      say_act:
    is:
      voter:
      human:
      enemy:
      wolf:
      pixi:
      sensible:
      committer:
    timer:
      entry:
      entry_expired:

    live:
    love:
    overhear:

    history:
    status:


###

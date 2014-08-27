_.mixin 
  absorb: (list, keys, object)->
    return list unless object? && keys? && keys.length > 0
    for o in list
      old = object[o._id]
      if old?
        for key in keys
          o[key] = old[key]
    list

Object.defineProperties Array.prototype,
  last:
    get: -> @[@length - 1]
  first:
    get: -> @[0]

class Cache
  @rule = {}

class Cache.Rule
  constructor: (field)->
    @id = "#{field}_id"
    @list_name = "#{field}s"
    @scopes = {}
    @validates = []
    @responses = []
    @protect_ids = []

    Cache.rule[field] = @
    Cache[@list_name] = cache = {}

    @base_scope "_all",
      kind: -> "all"
      reset: (list, map)->
        cache.all = list.all
        cache.find = map.all
      values: (o)-> _.values o

  base_scope: (key, hash)->
    @scopes[key] = scope = new Cache.Scope(@, hash)
    @scope_keys = Object.keys(@scopes).sort().reverse()
    scope.cleanup()

    all = @scopes._all.list.all
    if 0 < all?.length
      scope.merge all
    scope

  schema: (cb)->
    definer =
      scope: (key, kind)=>
        cache = Cache[@list_name]
        @base_scope key,
          kind: kind
          reset: (o)-> cache[key] = o
      
      pager: (key, items)=>

      belongs_to: (parent, option)=>
        cache = Cache[@list_name]
        parents = "#{parent}s"
        parent_id = "#{parent}_id"

        @base_scope parent,
          kind: (o)-> o[parent_id]
          reset: (o)-> cache[parent] = o

        if option?.dependent?
          @validates.push (o)->
            that = Cache[parents]?.find[o[parent_id]]
            o[parent] = that if that?
          Cache.rule[parent].responses.push @

      order: (func)=>
        cb = _.memoize func, (o)-> o._id
        @values = (o)->
          _.values(o).sort (a,b)->
            return -1 if cb(a) < cb(b)
            return  1 if cb(a) > cb(b)
            return  0

      order_by: (key, desc)=>
        @values =
          if desc
            (o)->
              _.values(o).sort (a,b)->
                return  1 if a[key] < b[key]
                return -1 if a[key] > b[key]
                return  0
          else
            (o)->
              _.values(o).sort (a,b)->
                return -1 if a[key] < b[key]
                return  1 if a[key] > b[key]
                return  0

      protect: (id_name)=>
        @protect_ids.push id_name
    _.forEach [@], cb, definer


  set_base: (list, cb)->
    for validate in @validates
      list = _.filter list, validate

    for o in list
      unless o[@id]
        o[@id] = o._id
      unless o._id
        o._id = o[@id]

    _.absorb list, @protect_ids, @scopes._all.map.all

    for key in @scope_keys
      scope = @scopes[key]
      cb scope, list
    
    return true


  reject: (list)->
    @set_base list, (scope, list)->
      scope.reject list

    if @responses.length > 0
      if @scopes._all.diff.del.length > 0
        for rule in @responses
          rule.rehash()

  merge: (list)->
    @set_base list, (scope, list)->
      scope.merge list

  set: (list)->
    @set_base list, (scope, list)->
      scope.map = {}
      scope.list = {}
      scope.merge list

    if @responses.length > 0
      if @scopes._all.diff.del.length > 0
        for rule in @responses
          rule.rehash()

  rehash: ->
    @set @scopes._all.list.all

  cleanup: ->
    for key in @scope_keys
      scope = @scopes[key]
      scope.cleanup()

  values: (hash)->
    _.values hash


class Cache.Scope
  constructor: (@rule, hash)->
    {@kind, @reset, @values} = hash

  adjust: (list, merge_phase)->
    all = @rule.scopes._all.map.all
    values = @values || @rule.values
    @diff = 
      add: []
      del: []
    reset_kinds = {}

    for o in list
      if all?
        old = all[o._id]
      if old?
        old_kind = @kind old
        if @map[old_kind]?
          reset_kinds[old_kind] = true
          @diff.del.push o._id
          delete @map[old_kind][o._id]

      merge_phase(o, reset_kinds)

    for kind, type of reset_kinds
      @list[kind] = values @map[kind]
    @reset @list, @map

  reject: (list)->
    @adjust list, ->

  merge: (list)->
    @adjust list, (o, reset_kinds)=>
      kind = @kind o
      if kind || kind == 0
        reset_kinds[kind] = true
        @map[kind] ||= {}
        @map[kind][o._id] = o
        @diff.add.push o._id


  cleanup: ->
    @map = {}
    @list = {}
    @diff = 
      add: []
      del: []
    @reset @list, @map


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
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
      scope.set all
    scope

  schema: (cb)->
    definer =
      scope: (key, kind)=>
        cache = Cache[@list_name]
        @base_scope key,
          kind: kind
          reset: (o)-> cache[key] = o
      
      pager: (key, items)=>

      belongs_to: (parent)=>
        cache = Cache[@list_name]
        parent_id = "#{parent}_id"
        @base_scope parent,
          kind: (o)-> o[parent_id]
          reset: (o)-> cache[parent] = o

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


  set: (list)->
    for o in list
      unless o[@id]
        o[@id] = o._id
      unless o._id
        o._id = o[@id]

    _.absorb list, @protect_ids, @scopes._all.map.all

    for key in @scope_keys
      scope = @scopes[key]
      @set_scope scope, list

    return true

  values: (hash)->
    _.values hash

  rehash: ->
    @set @scopes._all.list.all

  cleanup: ->
    for __, scope of @scopes
      scope.cleanup()

class Cache.Scope
  constructor: (@rule, hash)->
    {@kind, @reset, @values} = hash

  cleanup: ->
    @map = {}
    @list = {}
    @reset @list, @map

  set: (list)->
    all = @rule.scopes._all.map.all
    values = @values || @rule.values
    reset_kinds = {}
    for o in list
      kind = @kind o
      if kind || kind == 0
        @map[kind] ||= {}

        if all?
          old = all[o._id]

        reset_kinds[kind] = 
          if old?
            old_kind = @kind old
            delete @map[old_kind][o._id]
            reset_kinds[old_kind] = "update"
          else
            "create"

        @map[kind][o._id] = o

    for kind, type of reset_kinds
      @list[kind] = values @map[kind]
    @reset @list, @map

class Cache.Replace extends Cache.Rule
  set_scope: (scope, list)->
    scope.cleanup()
    scope.set list

class Cache.Append extends Cache.Rule
  set_scope: (scope, list)->
    scope.set list


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
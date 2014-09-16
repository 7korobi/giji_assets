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
    @adjust =
      _id: (o)-> o._id = o[@id] unless o._id
    @adjust[@id] = (o)=> o[@id] = o._id unless o[@id]
    @adjust_keys = ["_id", @id]

    Cache.rule[field] = @
    Cache[@list_name] = cache = {}

    @base_scope "_all",
      kind: -> ["all"]
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
          kind: (o)-> [o[parent_id]]
          reset: (o)-> cache[parent] = o

        if option?.dependent?
          @validates.push (o)->
            that = Cache[parents]?.find[o[parent_id]]
            o[parent] = that if that?
          Cache.rule[parent].responses.push @

      order: (func)=>
        @values = (hash)=>
          list = _.values(hash)
          @orders = s = {}
          for o in list
            @orders[o._id] = func(o)
          list.sort (a,b)->
            return -1 if s[a._id] < s[b._id]
            return  1 if s[a._id] > s[b._id]
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

      fields: (adjust)=>
        for key, cb of adjust
          @adjust[key] = cb

      protect: (key)=>
        @adjust[key] = (o, old)->
          o[key] = old[key] if old?

    cb.call(definer, @)
    @adjust_keys = _.keys(@adjust).sort()


  set_base: (from, cb)->
    all = @scopes._all.map.all
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

    for key in @scope_keys
      scope = @scopes[key]
      cb scope, list

    return


  reject: (list)->
    @set_base list, (scope, list)->
      scope.reject list

    for rule in @responses
      rule.rehash() if @scopes._all.diff.del

  merge: (list)->
    @set_base list, (scope, list)->
      scope.merge list

  set: (list)->
    @set_base list, (scope, list)->
      scope.map = {}
      scope.list = {}
      scope.merge list

    for rule in @responses
      rule.rehash() if @scopes._all.diff.del

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
    @diff = {}

    reset_kinds = {}

    for o in list
      if all?
        old = all[o._id]
      if old?
        for old_kind in @kind(old) || []
          if @map[old_kind]?
            reset_kinds[old_kind] = true
            delete @map[old_kind][o._id]
            @diff.del = true

      merge_phase(o, reset_kinds)

    for kind, type of reset_kinds
      @list[kind] = values @map[kind]
    @reset @list, @map

  reject: (list)->
    @adjust list, ->

  merge: (list)->
    @adjust list, (o, reset_kinds)=>
      for kind in @kind(o) || []
        if kind || kind == 0
          reset_kinds[kind] = true
          @map[kind] ||= {}
          @map[kind][o._id] = o
          @diff.add = true
      return

  cleanup: ->
    @map = {}
    @list = {}
    @diff = {}
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

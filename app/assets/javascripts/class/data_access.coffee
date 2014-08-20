class Cache
  @rule = {}


class Cache.Replace
  constructor: (field)->
    Cache.rule[field] = @
    @list_name = "#{field}s"
    @id = "#{field}_id"

    scope = @scope_generate -> "all"
    @scopes = 
      all: scope
    Cache[@list_name] = 
      all: -> _.chain(scope.list.all)


  belongs_to: (parent)->
    parent_id = "#{parent}_id"
    @scope parent, (o)->
      o[parent_id]
    @

  protect: (@protect_ids)-> @

  scope: (key, id_func)->
    scope = @scope_generate(id_func)
    @scopes[key] = scope
    Cache[@list_name][key] = (scope_id)->
      _.chain(scope.list[scope_id])
    @

  scope_generate: (id_func)->
    new Cache.Replace.Scope(@, id_func)

  set: (list)->
    for o in list
      unless o[@id]
        o[@id] = o.id
      unless o.id
        o.id = o[@id]

      old = @scopes.all.map.all?[o.id]
      if old? && @protect_ids?
        for key in @protect_ids
          o[key] = old[key]

    for key, scope of @scopes
      scope.set list

    return true

  find: (id)->
    @scopes.all.map.all[id]


class Cache.Append extends Cache.Replace
  constructor: (field)->
    super

  scope_generate: (id_func)->
    new Cache.Append.Scope(@, id_func)


class Cache.Append.Scope
  constructor: (@cache, @id)->
    @cleanup()

  find: (id)->
    @map.all[id]

  cleanup: ->
    @map = {}
    @list = {}

  set: (list)->
    updated_scope_ids = {}
    for o, idx in list
      scope_id = @id o, idx
      unless @map[scope_id]
        @map[scope_id] = {}
        @list[scope_id] = []
      if @map[scope_id][o.id]
        updated_scope_ids[scope_id] = true
      else
        @list[scope_id].push o
      @map[scope_id][o.id] = o

    for scope_id of updated_scope_ids
      @list[scope_id] = _.values @map[scope_id]


class Cache.Replace.Scope extends Cache.Append.Scope
  set: (list)->
    @cleanup()
    super


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
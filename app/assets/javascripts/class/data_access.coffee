class Cache
  @data = {}
  @rule = {}

  @where = (hash)->
    (new Cache).where(hash)

  constructor: ->
    @query = 
      order: []
      where: {}

  where: (hash)->
    for key, val of hash
      @query.where[key] = val

  first: ->

  last: ->

  all: (ext)->
    _.sortBy Cache.ext.order


class Cache.Replace
  constructor: (refs)->
    for field, @parents of refs
      Cache.rule[field] = @

      @list_name = "#{field}s"
      @id = "#{field}_id"
      @pk = @parents.concat [field]
      Cache.data[@list_name] = []
    @map = {}

  ids: (o)->
    _.map @pk, (key)->
      o["#{key}_id"]

  set_map: (list)->
    for o in list
      unless o[@id]
        o[@id] = o.id
      unless o.id
        o.ids ||= @ids o
        o.id  = o.ids.join("-")
      @map[ o.id ] = o

  set: (list)->
    @set_map list
    Cache.data[@list_name] = list


class Cache.Guard extends Cache.Replace
  constructor: (refs, @protect)->
    super(refs)


class Cache.Append extends Cache.Replace
  constructor: (refs)->
    super(refs)

  set: (news)->
    @set_map news
    list = []
    for _, item of @map
      list.push item
    Cache.data[@list_name] = list


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
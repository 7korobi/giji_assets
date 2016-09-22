new Mem.Rule("item").schema !->
  data = (rule, ary)->
    q = Mem.Query[rule]
    if ary.length > 0
      scope = ary.shift()
      q = q[scope](...ary)
    q

  @order "index"
  @scope (all)->

  class @model extends @model
    list: ->
      if @query
        [rule, ...ary] = @query.split(/ +/)
        data(rule, ary).list

    ->
      [type, template, mestype, index] = @_id.split('-')
      @csid ?= "all" if @face_id
      @type ?= type
      @index ?= Number(index) || @updated_at
      @mestype ?= mestype
      @template ?= template

      if @object
        [rule, ...ary, key] = @object.split(/ +/)
        @log = data(rule, ary)[key]

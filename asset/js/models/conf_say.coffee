new Mem.Rule("say").schema ->
  @scope (all)->
    enable: ->
      all.where _id: Mem.conf.folder.PERJURY.config.saycnt

  class @model extends @model
    constructor: ->
      @say_id = @_id


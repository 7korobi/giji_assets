Mem = require "memory-record"
WebStore = require "./web_store"

new Mem.Rule("store").schema ->
  @scope (all)->

  @deploy (o)->
    WebStore.format(o)



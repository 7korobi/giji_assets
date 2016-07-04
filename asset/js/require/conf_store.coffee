Mem = require "memory-record"

new Mem.Rule("store").schema ->
  @scope (all)->

  @deploy (o)->
    o.store_id = o._id
    o.type ?= "String"
    o.current ?=
      switch o.type
        when "Keys"
          {}
        when "Date", "Number"
          0
        when "String", "Text"
          ""



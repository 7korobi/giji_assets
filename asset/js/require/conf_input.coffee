Mem = require "memory-record"
{ Input } = require "./input"

new Mem.Rule("input").schema ->
  @scope (all)->
    check_vil: -> all.where (o)-> o.attr.type == 'checkbox' && o.sean == "vil"
    checkbox: -> all.where (o)-> o.attr.type == 'checkbox'
    text:    -> all.where (o)-> o.attr.type == 'text'


  @deploy (o)->
    o.option_id = o._id
    o.attr.key = o._id
    o.query ?= {}
    Input.format o

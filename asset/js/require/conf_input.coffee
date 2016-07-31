Mem = require "memory-record"
{ Input } = require "./input"

new Mem.Rule("input").schema ->
  @scope (all)->
    checkbox: (sean)-> all.where (o)-> o.attr.type == 'checkbox' && o.sean == sean

  @deploy (o)->
    Input.format o

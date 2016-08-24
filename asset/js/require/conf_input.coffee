Mem = require "memory-record"
InputTie = require "./input_tie"

new Mem.Rule("input").schema ->
  @scope (all)->
    checkbox: (sean)-> all.where (o)-> o.attr.type == 'checkbox' && o.sean == sean

  @deploy (o)->
    InputTie.format o

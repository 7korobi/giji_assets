
class Validator
  (@checks)->

  validate: (o)->
    o.errors = []
    o.infos = []
    helper =
      error: (text)->
        o.errors.push text
      info: (text)->
        o.infos.push text
      valid: ->
        ! o.errors.length

    for check in @checks
      check.call o, helper
    o.valid = helper.valid()

  and: (checks)->
    new Validator @checks.concat(checks)


### text section
not_secret = ({error})->
not_player = ({info})->
action = ({error})->
  tap_target = -1 == @target()
  if @action
    if @action.target
      error "対象を選びましょう。"   if tap_target
    else
      error "対象を「――」にしましょう。" unless tap_target



### input section

input = ({info})->
  info @able.change if @old() != @target()


### join and export

input_validator = new Validator [input]

announce =
  memo: new Validator []
  talk: new Validator []
  act: new Validator  [action]

character =
  memo: new Validator []
  talk: new Validator [not_player]
  act: new Validator  [not_player, action]

relative =
  memo: new Validator []
  talk: new Validator [not_player]
  act: new Validator  [not_player, action]

combat =
  memo: new Validator [not_secret]
  talk: new Validator [not_secret, not_player]
  act: new Validator  [not_secret, not_player, action]


export validate =
  input: (target)-> input_validator.validate target
  talk: (target)->
    {format, mestype} = target
    #\ENTRY \GSAY \VGSAY \MSAY \SAY
    o = switch mestype
      | \MAKER \ADMIN \TSAY     => announce
      | \VSAY \GSAY \VGSAY      => character
      | \SPSAY \WSAY \XSAY \AIM => relative
      | _                       => combat
    o[format].validate target

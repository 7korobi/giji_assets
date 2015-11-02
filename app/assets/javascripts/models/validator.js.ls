
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

point = (size)->
  pt = 20
  pt += (size - 50)/14 if 50 < size
  Math.floor pt

text = ->
  text = @text()
  @size = text.sjis_length
  @point = point @size
  @lines = text.split("\n").length

summary = ({valid})->
  if 'point' == @max.unit
    mark = "#{@point}pt "
  else
    mark = ""
  mark = "⊘" unless valid()
  @summary = [
    m "span.emboss", mark
    " #{@size}"
    m "sub", "/#{@max.size}字"
    " #{@lines}"
    m "sub", "/#{@max.line}行"
  ]

required = ({error})->
  text = @text()
  if text
    error "入力しましょう。" unless 3 < @size && text.match(/\S/)
    error "#{@max.size}字以下にしましょう。" if @max.size < @size
    error "#{@max.line}行以下にしましょう。" if @max.line < @lines
  else
    error "入力しましょう。"


secret = ({error})->
  text = @text()
  error "あぶない！秘密会話へのアンカーがあります！" if text.match />>[\=\*\!]\d+/g


no_player = ({info})->
  text = @text()
  info "/*中の人の発言があります。*/" if text.match /\/\*|\*\//g


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

### sow_auth section

sow_auth = ({error, info})->
  if @is_login
    info "OK."
  else
    uid = Url.prop.uid()
    pwd = Url.prop.pwd()
    uid_size = uid?.length || 0
    pwd_size = pwd?.length || 0
    if 1 < uid_size < 21 && 2 < pwd_size < 21
      error "パスワードとIDが同じです。" if uid == pwd
    else
      error "IDとパスワードを入力してください。( 3〜20 byte)"

### join and export

sow_auth_validator = new Validator [sow_auth]
input_validator = new Validator [input]

announce =
  memo: new Validator [text, required, summary]
  talk: new Validator [text, required, summary]
  act: new Validator  [text, required, action, summary]

character =
  memo: new Validator [text, required, summary]
  talk: new Validator [text, required, no_player, summary]
  act: new Validator  [text, required, no_player, action, summary]

relative =
  memo: new Validator [text, required, summary]
  talk: new Validator [text, required, no_player, summary]
  act: new Validator  [text, required, no_player, action, summary]

combat =
  memo: new Validator [text, required, secret, summary]
  talk: new Validator [text, required, secret, no_player, summary]
  act: new Validator  [text, required, secret, no_player, action, summary]


export validate =
  sow_auth: (target)-> sow_auth_validator.validate target
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

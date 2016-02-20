
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


### card choice section

cards = ({error, info})->
  {role, gift, extra, mob_type, game_rule, start_auto, player_count, player_count_start} = @params
  full = [...role, ...gift]

  minus = 0
  minus += 2 * Mem.roles.minus2(role).length
  minus += 1 * Mem.roles.minus1(full).length

  player = Mem.roles.players(role).length

  @size =
    drop: player - player_count
    wolf: Mem.roles.wolfs(full).length
    minus: minus
    extra: extra.length
    human: Mem.roles.humans(role).length - minus
    player: player
    robber: Mem.roles.robbers(role).length
    villager: Mem.roles.villagers(role).length
    gift_sides: Mem.roles.gift_sides(gift).length
    gift_items: Mem.roles.gift_items(gift).length
    gift_appends: Mem.roles.gift_appends(gift).length

  switch mob_type
    case "juror"
      error "投票する人物が必要です。見物人（陪審）または、決定者を割り当てましょう。" unless @size.extra || ("decide" in gift)

    case "gamemaster"
      info "見物人（黒幕）を割り当てましょう。" unless @size.extra

  switch game_rule
    case "TABULA", "LIVE_TABULA", "TROUBLE"
      error "人間(#{@size.human}人)は人狼(#{@size.wolf}人)より多く必要です。" unless 0 < @size.wolf < @size.human

    case "MILLERHOLLOW", "LIVE_MILLERHOLLOW", "MISTERY"
      error "村人(#{@size.villager}人)が足りません。" unless 1 < @size.villager
      error "人狼(#{@size.wolf}人)が足りません。"     unless 0 < @size.wolf

  if start_auto
    error "ゲームが開始できません。"     unless     player_count_start <= player_count
    error "最少催行人数が少なすぎます。" unless 3 < player_count_start

  if game_rule in ["LIVE_TABULA", "LIVE_MILLERHOLLOW"]
    error "鱗魚人が勝利できません。" if "dish" in role

  if @size.robber
    error "役職(#{@size.player}人)が足りません。盗賊(#{@size.robber}人)には余り札が必要です。"                               if @size.player < player_count
    error "人狼(#{@size.wolf}人)が足りません。盗賊(#{@size.robber}人)より多くないと、人狼がいない村になる可能性があります。" if @size.wolf <= @size.robber

  else
    error "役職(#{@size.player}人)が足りません。定員以上にしましょう。" if @size.drop < 0

  info  "役職配布時、余り札（#{@size.drop}枚）は捨て去ります。"          if 0 < @size.drop
  error "光の輪や魔鏡と、能力や勝利条件を付与する恩恵は共存できません。" if (@size.gift_sides + @size.gift_appends) && @size.gift_items
  error "能力を加える恩恵と、勝利条件が変わる恩恵は共存できません。"     if @size.gift_sides && @size.gift_appends
  error "NPCのために、村人をひとつ入れてください。"                  unless "villager" in role

### input section

input = ({info})->
  info @able.change if @old() != @target()


### sow_auth section

sow_auth = ({error, info})->
  {uid, pwd} = @params
  if @is_login
    info "OK."
  else
    uid_size = uid?.length || 0
    pwd_size = pwd?.length || 0
    if 1 < uid_size < 21 && 2 < pwd_size < 21
      error "パスワードとIDが同じです。" if uid == pwd
    else
      error "IDとパスワードを入力してください。( 3〜20 byte)"


### join and export

sow_auth_validator = new Validator [sow_auth]
input_validator = new Validator [input]
cards_validator = new Validator [cards]

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
  cards: (target)-> cards_validator.validate target
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

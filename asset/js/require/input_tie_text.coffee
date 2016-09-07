InputTie = require './input_tie'
m = require "mithril"
_ = require "lodash"

text_point = (size)->
  pt = 20
  pt += (size - 50)/14 if 50 < size
  Math.floor pt


class text_input extends InputTie.type.hidden
  draw: ->
    { unit } = @attr
    @__name = @attr.name || @_id
    @__value = @tie.params[@_id]
    size = @__value.length
    sjis = @__value.sjis_length
    line = @__value.split("\n").length
    if "point" == unit
      point = text_point sjis
    @calc = { point, line, sjis, size }

  do_change: (value)->
    { not_secret, not_player, unit, max_sjis, max_line, minlength, maxlength, pattern, required } = @attr
    if @dom
      if not_secret && value.match />>[\=\*\!]\d+/g
        error = "あぶない！秘密会話へのアンカーがあります！"

      if not_player && value.match /\/\*|\*\//g
        error = "/*中の人の発言があります。*/"

      if max_line && max_line < line
        error = "このテキストを #{max_line} 行以下にしてください。"

      if max_sjis && max_sjis < sjis
        error = "このテキストを #{max_sjis} 文字以下にしてください。"

      if minlength && 0 < value.length < minlength
        # for firefox, safari.
        unless InputTie.skip_minlength
          error = "このテキストは #{minlength} 文字以上で指定してください（現在は #{value.length} 文字です）。"
      @error error
    super

  foot: (m_attr = {})->
    ma = @_attr_label @_id, @attr, m_attr
    size = @calc.size

    if ma.maxlength
      max_size = ma.maxlength

    if ma.max_sjis
      size     = @calc.sjis
      max_size = ma.max_sjis

    if @calc.point
      mark = m "span.emboss", "#{@calc.point}pt "
    else
      mark = ""
    if ! @dom || @dom.validationMessage
      mark = m "span.WSAY.emboss", "⊘"

    [
      mark
      " #{size}"
      m "sub", "/#{max_size}"    if max_size?
      m "sub", "字"
      " #{@calc.line}"
      m "sub", "/#{ma.max_line}" if ma.max_line?
      m "sub", "行"
    ]


class InputTie.type.textarea extends text_input
  field: (m_attr = {})->
    ma = @_attr @_id, @attr, m_attr,
      className: [@attr.className, m_attr.className].join(" ")
      name:  @__name
    # data-tooltip, disabled
    m "textarea", ma, @__value


for key in ["text", "search", "url", "email"]
  InputTie.type[key] = text_input


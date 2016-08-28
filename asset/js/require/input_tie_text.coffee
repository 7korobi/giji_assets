InputTie = require 'input_tie'

text_point = (size)->
  pt = 20
  pt += (size - 50)/14 if 50 < size
  Math.floor pt


class text_input extends InputTie.type.hidden
  do_change: (value)->
    { not_secret, not_player, unit, max_sjis, max_line, minlength, maxlength, pattern, required } = @attr

    line = value.split("\n").length
    sjis = value.sjis_length
    if "point" == unit
      point = text_point sjis
    @calc = { point, line, sjis }

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
    { _id, attr } = @format
    unless @calc
      value = @tie.params[_id]
      @do_change value

    if @calc.point
      mark = m "span.emboss", "#{@calc.point}pt "
    else
      mark = ""
    if ! @dom || @dom.validationMessage
      mark = m "span.WSAY.emboss", "⊘"

    ma = @_attr_label _id, attr, m_attr
    [
      mark
      " #{@calc.sjis}"
      m "sub", "/#{ma.max_sjis}" if ma.max_sjis
      m "sub", "字"
      " #{@calc.line}"
      m "sub", "/#{ma.max_line}" if ma.max_line
      m "sub", "行"
    ]


class InputTie.type.textarea extends text_input
  field: (m_attr = {})->
    { _id, attr } = @format

    now_val = @tie.params[_id]

    ma = @_attr _id, attr, m_attr,
      className: [attr.className, attr.className].join(" ")
      name: attr.name || _id
    # data-tooltip, disabled
    m "textarea", ma, now_val


for key in ["text", "search", "url", "email"]
  InputTie.type[key] = text_input


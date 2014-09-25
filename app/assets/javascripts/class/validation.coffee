class InputBase
  calc_point = (size)->
    point  = 20
    point += (size - 50)/14 if 50 < size
    Math.floor point

  change: (text = "")->
    @text = text.replace(/\n$/g, '\n ')
    @lines = @text.split("\n").length

    @size = @text.sjis_length
    @point = calc_point(@size)

    message = @bad[@validate.type]()
    @is_bad = !!message
    @can_preview = !@is_bad

    if @valid
      if 'point' == @max.unit
        mark = "#{point}pt "
      else
        mark = ""
    else
      mark = "⊘"

    @out = 
      style: "cautiontext"
      lines: _.max [5, @lines]
      error: message

    @out.error = "" if "string" != typeof @out.error
    @out.html =
      if @max
        "#{mark} #{size}<sub>/#{@max.size}字</sub>  #{lines}<sub>/#{@max.line}行</sub>"
      else
        ""

  bad_input: ->
    return true unless @text?
    return true if @validate.is_disable
    return true if @text.replace(/\s/g, '').sjis_length < 4
    if @max?
      return true if @max.size < @size
      return true if @max.line < @lines
    return null

  preview: (cb)->
    if @can_preview
      @text_preview =
        switch @validate.preview
          when "talk"
            @text.deco_preview
          when "action"
            target = @validate.target
            head = @validate.head + "は、"
            text = 
              if 0 < @text.length
                @text.replace(/\n$/g, '\n ')
              else
                @validate.text
            "#{head}#{target}#{text.deco_preview}"
      @is_preview = true
      cb()
    else

class InputSow extends InputBase
  constructor: (@max, @validate)->
    @bad =
      entry: =>
        @bad.talk()

      talk: =>
        @danger_anker() || @bad_input()

      memo: =>
        (0 < @size) && @bad.talk()

      action: =>
        (0 < @size) && @bad.talk()

      action_free: =>
        @bad.talk()

      action_bookmark: =>
        @bad_input()

      select: =>
        if @validate.is_change
          @validate.style = "warn"
          "#{@validate.title}をクリックしましょう。"


    @requests =
      entry: ({turn, vid, mes, style, csid_cid, role, entrypwd})=>
        _arg = {turn, vid, mes, style, csid_cid, role, entrypwd}
        _arg.cmd = "entry"
        _arg.target = -1
        _arg

      talk: ({turn, vid, mes, style, target})=>
        _arg.cmd = "write"
        _arg

      memo: ({turn, vid, mes, style, target})=>
        _arg.cmd = "wrmemo"
        _arg

      action: ({turn, vid, actiontext, style, target, actionno})=>
        _arg.cmd = "action"
        _arg

      select: ({vid, target1, target2, cmd})=>
        _arg.entrust = ''        if 'vote'    == cmd
        _arg.entrust = 'entrust' if 'entrust' == cmd
        _arg

      select_commit: ({vid, commit})=>
        _arg.cmd = "commit"
        _arg

    @resets =
      entry: ()=>
        @out.error = ""
        @is_preview = false
        @text = ""

      talk: ()=>
        @out.error = ""
        @is_preview = false
        @text = ""

      memo: ()=>
        @out.error = ""
        @is_preview = false
        @text = last_memo

      action: ()=>
        @out.error = ""
        @text = ""
        @target = "-1"
        @action = "-99"


    @change()

  danger_anker: ->
    if @validate.is_open && @text.match ///>>[\=\*\!]\d+///
      "あぶない！秘密会話へのアンカーがありますよ！"


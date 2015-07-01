new Cache.Rule("target").schema ->
  @scope (all)->
    command: (type)->
      all
    vote: (type)->
      all
  @deploy (o)->


new Cache.Rule("command").schema ->
  @scope (all)->
    target: ->
      all.where(jst: "target")

  @deploy (o)->


new Cache.Rule("writer").schema ->
  @belongs_to "chr_job"

  @scope (all)->
    {}

  @deploy (o)->
    o._id = o.cmd
    o.vdom = GUI.form[o.jst]
    o.is_preview = m.prop(false)
    o.style = m.prop("text")
    o.log = (log)->
      if log
        o.hisoty =
          form: o
          text: log
        Cache.rule.history.merge o.history
        log
      else
        o.history

    o.submit =
      switch o.cmd
        when "entry"
          ({turn, vid, mes, style, csid_cid, role, entrypwd})=>
            _arg = {turn, vid, mes, style, csid_cid, role, entrypwd}
            _arg.cmd = "entry"
            _arg.target = -1
            _arg

        when "write"
          ({turn, vid, mes, style, target})=>
            _arg.cmd = "write"
            _arg

        when "wrmemo"
          ({turn, vid, mes, style, target})=>
            _arg.cmd = "wrmemo"
            _arg

        when "action"
          ({turn, vid, actiontext, style, target, actionno})=>
            _arg.cmd = "action"
            _arg

        when "select"
          ({vid, target1, target2, cmd})=>
            _arg.entrust = ''        if 'vote'    == cmd
            _arg.entrust = 'entrust' if 'entrust' == cmd
            _arg

        when "select_commit"
          ({vid, commit})=>
            _arg.cmd = "commit"
            _arg


new Cache.Rule("history").schema ->
  point = (size)->
    pt = 20
    pt += (size - 50)/14 if 50 < size
    Math.floor pt

  @deploy (o)->
    o.text = o.text.replace(/\n$/g, '\n ')
    o._id = JSON.stringify [o.form._id, o.text]

    o.compact = o.text.replace(/\s/g, '')
    o.compact_size = o.compact.sjis_length

    o.lines = o.text.split("\n").length
    o.size = o.text.sjis_length

    o.point = point o.size

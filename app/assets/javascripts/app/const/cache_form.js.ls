new Mem.Rule("form").schema ->
  @belongs_to "chr_job"

  @order (o)-> o.index

  @scope (all)->

  @default ->

  @deploy (o)->
    text = (mestype)->
      infos  = []
      errors = []
      text = m.prop("")
      text_on = m.withAttr "value", text
      target = m.prop(-1)
      target_on = m.withAttr "value", target
      if mestype in <[SAY GSAY VSAY TSAY]>
        choice_on = ->
          o.mestype = mestype
          o.acttype = mestype
      else
        choice_on = ->
          o.mestype = mestype
          o.acttype = null

      attr =
        choice: ->
          onmouseup: choice_on
          ontouchend: choice_on
        text: ->
          value:   text()
          onkeyup:  text_on
          onchange: text_on
        target: ->
          value:    target()
          onchange: target_on

      {mestype, infos, errors, target, text, attr}

    input = (cmd, able)->
      infos  = []
      errors = []
      target = m.prop(-1)
      target_changed = (value)->
        target(value)
        infos.length = 0
        infos.push able.change

      target_on = m.withAttr "value", target_changed
      attr =
        target: ->
          value:    target()
          onchange: target_on

      {cmd, infos, errors, target, attr}

    role_scan = (roleid, can_use)->
      role = Mem.roles.find roleid
      names.push role.name
      role_helps.push role.HELP

      if "grave" in role.ables
        can_use = ! can_use
      if can_use
        for ableid in role.ables
          cmd = switch ableid
              | 'vote', 'entrust' => "vote"
              | 'commit'          => "commit"
              | _                 => if "gift" in role.ables then "gift" else "role"
          able_scan cmd, Mem.ables.find ableid

    able_scan = (cmd, able)->
      able_helps.push able.HELP

      if able.text?
        if able.text in <[SAY GSAY VSAY]>
          o.form.act = text(able.text)
          o.mestype = able.text
          o.acttype = able.text
        attr = o.form[able.text] ?=
          able: able
          memo: text(able.text)
          talk: text(able.text)
        o.texts.push attr

      if able.at?
        if able.at[o.turn]
          attr =
            able: able
            input: input(cmd, able)
          o.selects.push attr

    o.format = "talk"
    o.format_on = (format)->
      choice_on = ->
        o.format = format
      onmouseup: choice_on
      ontouchend: choice_on

    names = []
    role_helps = []
    able_helps = []
    o.form = {}

    o.texts = []
    o.selects = []
    switch o.live
      case "mob"
        role_scan(o.mob, true)
      else
        can_use = "live" == o.live
        role_scan(o.live, true)
        for name in o.role
          role_scan(name, can_use)
    for able in Mem.ables.by_rolestate(o.rolestate)
      names.push able.name
      able_scan(null, able)

    o.name = m.trust names.join("、")
    o.role_help = (_.uniq _.compact role_helps).join("\n<br>\n")
    o.able_help = (_.uniq _.compact able_helps).join("\n<br>\n")

  @map_reduce (o)->

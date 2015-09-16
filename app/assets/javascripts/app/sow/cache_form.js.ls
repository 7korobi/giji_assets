new Mem.Rule("form").schema ->
  @belongs_to "face"

  @order (o)-> o.index

  @scope (all)->

  @default ->

  @deploy (o)->
    text = (mestype)->
      text = m.prop("")
      text_on = m.withAttr "value", text
      target = m.prop(-1)
      target_on = m.withAttr "value", target
      if mestype in ["SAY", "GSAY", "VSAY"]
        choice_on = ->
          o.mestype = mestype
          o.acttype = mestype
      else
        choice_on = ->
          o.mestype = mestype
          o.acttype = null

      text:  text
      target: target
      attr:
        choice: ->
          onmouseup: choice_on
          ontouchend: choice_on
        text: ->
          value:   text()
          onchange: text_on
        target: ->
          value:    target()
          onkeyup:  target_on
          onchange: target_on

    input = ->
      target = m.prop(-1)
      target_on = m.withAttr "value", target

      target: target
      attr:
        target: ->
          value:    target()
          onkeyup:  target_on
          onchange: target_on

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
          able_scan o.form[cmd], Mem.ables.find ableid

    able_scan = (attr, able)->
      able_helps.push able.HELP

      if able.text?
        attr = o.form[able.text] ?= text(able.text)
        o.texts.push able: able, attr: attr

      if able.at?
        if able.at[o.turn]
          o.selects.push able: able, attr: attr

    names = []
    role_helps = []
    able_helps = []
    o.form =
      act: text()
      role: input()
      gift: input()
      vote: input()
      commit: input()

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

    o.form[o.mestype].attr.choice().ontouchend()

  @map_reduce (o)->

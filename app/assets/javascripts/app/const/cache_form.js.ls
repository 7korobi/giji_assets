new Mem.Rule("form").schema ->
  @belongs_to "chr_job"

  @order (o)-> o.index

  @scope (all)->

  @default ->

  @deploy (o)->
    listup = (state)->
      option = (cb)->
        if Mem.potofs
          Mem.potofs.where(cb).list().map (o)->
            pno: o.pno,
            job: o.chr_job().job,
            name: o.name
        else
          []

      switch state
        when "dead"
          option (o)-> !(o.live in ["live", "mob"])
        when "gm_live"
          option (o)->   o.live in ["live", "mob"]
        when "gm_dead"
          option (o)-> o.live != "live"
        when "live"
          option (o)-> o.live == "live"
        when "cast"
          option (o)-> o.live != "mob"
        when "mob"
          option (o)-> o.live == "mob"
        when "all"
          option -> true
        when "near"
          switch o.live
            when "mob"
              switch o.mob
                when "grave"
                  listup "dead"
                when "alive"
                  listup "live"
                when "gamemaster"
                  listup "all"
                else
                  listup "mob"
            when "live"
              listup "live"
            else
              listup "dead"
        else
          []

    text = (mestype)->
      infos  = []
      errors = []
      text = m.prop("")
      text_on = m.withAttr "value", text
      target_on = m.withAttr "value", target
      targets = listup("near")
      target_hash = {}
      if mestype in <[SAY GSAY VSAY TSAY]>
        targets.push job: "―――", name: "", pno: -1
        choice_on = ->
          o.mestype = mestype
          o.acttype = mestype
      else
        choice_on = ->
          o.mestype = mestype
          o.acttype = null

      target_at = (value)->
        target_hash[value]
      for o in targets
        target_hash[o.pno] = o
      target = m.prop targets.last.pno

      attr =
        choice: ->
          onmouseup:  choice_on
          ontouchend: choice_on
        text: ->
          value:    text()
          onkeyup:  text_on
          onchange: text_on
        target: ->
          value:    target()
          onchange: target_on

      {mestype, infos, errors, target, targets, target_at, text, attr}

    input = (role, able)->
      cmd = able.cmd || role.cmd
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

      targets = listup(able.for)
      if able.sw
        targets.push name: "", pno: o.pno || 1, job: able.sw
      if able.pass
        targets.push name: "", pno: -1, job: able.pass || "（パス）"

      {cmd, infos, errors, target, targets, attr}

    role_scan = (role_id, can_use)->
      role = Mem.roles.find role_id
      role_names.push role.name
      role_helps.push role.HELP

      if "grave" in role.ables
        can_use = ! can_use
      if can_use
        for able_id in role.ables
          able = Mem.ables.find able_id
          able_scan role, able

    able_scan = (role, able)->
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
            input: input role, able
          o.selects.push attr

    o.format = "talk"
    o.format_on = (format)->
      choice_on = ->
        o.format = format
      onmouseup: choice_on
      ontouchend: choice_on

    role_names = []
    role_helps = []
    able_helps = []
    o.form = {}

    o.texts = []
    o.selects = []

    o.ext ?= []

    for role_id in o.ext
      role_scan(role_id, true)
    role_scan(o.turn, true)

    if o.live != "mob"
      can_use = "live" == o.live
      role_scan(o.live, true)
      for role_id in o.role
        role_scan(role_id, can_use)

    for able in Mem.ables.by_rolestate(o.rolestate)
      role_names.push able.name
      able_scan {}, able

    o.role_name = role_names.join("、")
    o.role_help = (_.uniq _.compact role_helps).join("\n<br>\n")
    o.able_help = (_.uniq _.compact able_helps).join("\n<br>\n")
    o.history  ?= ""
    o.point ?=
      actaddpt:  0
      saidcount: 0
      saidpoint: 0
    o.say ?=
      say_act: 10
      say:   1000
      gsay:  1000
      spsay: 1000
      tsay:  1000
      wsay:  1000
      xsay:  1000


  @map_reduce (o)->

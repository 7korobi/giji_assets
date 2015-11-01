new Mem.Rule("form").schema ->
  @belongs_to "chr_job"

  @order (o)-> o.index

  @scope (all)->

  @default ->

  @deploy (o)->
    target_onchange = (target, infos, message)->
      m.withAttr "value", (value)->
        target(value)
        infos.length = 0
        infos.push message

    listup = (state, live, mob)->
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
          switch live
            when "mob"
              switch mob
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

    text = (mestype, format, able)->
      form_id = o._id
      targets = listup("near", o.live, o.mob)
      if mestype in <[SAY GSAY VSAY TSAY]>
        targets.push job: "―――", name: "", pno: -1
      Mem.rule.form_text.merge [{form_id, mestype, format, targets, able}]

    input = (role, able)->
      cmd = able.cmd || role.cmd
      infos  = []
      errors = []
      target = m.prop(-1)
      attr =
        form: ->
          onchange: (e)->
            e.target.name
            e.target.value
            console.log [e, o]
          onreset: (e)->
          onsubmit: (e)->
            console.log [e, role, able, o]
            false

        target: ->
          value:    target()
          onchange: target_onchange(target, infos, able.change)

      targets = listup(able.for, o.live, o.mob)
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


      if mestype = able.text
        if mestype in <[SAY GSAY VSAY]>
          text mestype, "act", able
          o.mestype = mestype
        text mestype, "memo", able
        text mestype, "talk", able
        o.texts.push mestype

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

    o.mestype_on = (mestype)->
      choice_on = ->
        o.mestype = mestype
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


  @map_reduce (o)->

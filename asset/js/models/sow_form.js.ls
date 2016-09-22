new Mem.Rule("form").schema ->
  @belongs_to "chr_job"

  @order (o)-> o.index

  @scope (all)->

  class @model extends @model
    ->
      listup = (state, live, mob)->
        option = (cb)->
          Mem.Query.potofs?.where(cb).list || []

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

      target_for = (options)->
        { target } = Mem.Query.inputs.hash
        h = {}
        for { name, job, pno } in options
          h[pno] =
            _id: pno
            label: "#{job} #{name}"
        target.options = h
        console.warn target

      text_for = (format, able)->
        { _id, text } = able
        options = listup("near", o.live, o.mob)
        if _id in <[SAY GSAY VSAY TSAY]>
          options.push job: "―――", name: "", pno: -1
        if options.length
          area = Mem.Query.inputs.hash[format]
          target_for options

        tie = InputTie.form {}, [text, "target"]
        tie.inputs.target.options = options
        o.texts[_id] = { tie }

      input_for = (role, able)->
        cmd = able.cmd || role.cmd
        options = listup(able.for, o.live, o.mob)
        if able.sw
          options.push name: "", pno: o.pno || 1, job: able.sw
        if able.pass
          options.push name: "", pno: -1, job: able.pass || "（パス）"
        if options.length
          select = Mem.Query.inputs.hash.target
          target_for options

        tie = InputTie.form {}, ["target"]
        tie.inputs.target.options = options
        o.selects[_id] = { tie }


      role_scan = (role_id, can_use)->
        role = Mem.Query.roles.find role_id
        role_names.push role.name
        role_helps.push role.help

        if "grave" in role.ables
          can_use = ! can_use
        if can_use
          for able_id in role.ables
            able = Mem.Query.ables.find able_id
            able_scan role, able

      able_scan = (role, able)->
        able_helps.push able.help
        { _id } = able
        if able.text?
          text_for format, able

        if able.at?
          if able.at[o.turn]
            input_for role, able

      @tie = InputTie.form @params, ["format", "mestype"]

      role_names = []
      role_helps = []
      able_helps = []
      @form = {}

      @texts = {}
      @selects = {}

      @ext ?= []

      for role_id in @ext
        role_scan(role_id, true)
      role_scan(@turn, true)

      if @live != "mob"
        can_use = "live" == @live
        role_scan(@live, true)
        for role_id in @role
          role_scan(role_id, can_use)

      for able in Mem.Query.ables.by_rolestate(@rolestate)
        role_names.push able.name
        able_scan {}, able

      @role_name = role_names.join("、")
      @role_help = (_.uniq _.compact role_helps).join("\n<br>\n")
      @able_help = (_.uniq _.compact able_helps).join("\n<br>\n")


params = (form, type, o)->
  for key, val of form when name = Mem.conf.option[key]?.query?[type]
    o[name] = val
  o

countup = (data, list)->
  for id in list
    key = "cnt#{id}"
    data[key] ?= 0
    data[key]++

win.mount "#make_vil", (dom)->
  controller: ->
    _id: "new"
    is_loading: false
    http:
      errors: []
      infos: []
    mestype: "SSAY"
    submit: (form)->
      @is_loading = true
      data = params form, "SOW",
        cmd: "makevil"
        trsid: form.chr_npc
        hour: form.time[0..1]
        minite: form.time[3..4]
        eventcard: form.trap.join("/")
        csid: Mem.options.hash.chr_npc.options[form.chr_npc].csid
        votetype: if form.vote_sign then "sign" else "anonymity"
        starttype: if form.start_auto then "wbbs" else "manual"
        entrylimit: if form.entry_password then 'password' else 'free'

      countup data, form.extra
      countup data, form.role
      countup data, form.gift

      Submit.iframe "sow.cgi", data
      .then (o)=>
        @is_loading = false
        console.log data

        {errors} = o
        if errors
          @http =
            errors: errors.makevil
            infos: ["作成に失敗しました。"]
        unless errors
          console.log o

  view: (v)->
    doc.message.vmake_form v

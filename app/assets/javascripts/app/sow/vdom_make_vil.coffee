params = (form, type, o)->
  for key, val of form when name = Mem.conf.option[key]?.query?[type]
    o[name] = val
  o

countup = (data, list)->
  for id in list
    key = "cnt#{id}"
    data[key] ?= 0
    data[key]++

GUI.if_exist "#make_vil", (dom)->
  m.mount dom,
    controller: ->
    view: ->
      doc.message.vmake_form
        _id: "new"
        mestype: "SSAY"
        submit: (form)->
          @is_loading = true
          data = params form, "SOW",
            cmd: "makevil"
            trsid: form.chr_npc
            hour: form.time[0..1]
            minite: form.time[3..4]
            eventcard: form.trap.join("/")
            starttype: if form.start_auto then "wbbs" else "manual"
            entrylimit: if form.entry_password then 'password' else null

          countup data, form.extra
          countup data, form.role
          countup data, form.gift
          console.log data
          return

          Submit.iframe "sow.cgi", params
          .then (o)=>
            @is_loading = false
            console.log o

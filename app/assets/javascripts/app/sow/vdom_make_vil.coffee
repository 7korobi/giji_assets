GUI.if_exist "#make_vil", (dom)->
  m.mount dom,
    controller: ->
    view: ->
      doc.message.vmake_form
        _id: "new"
        mestype: "SSAY"

doc.component.chr_sets =
  controller: ->
    InputTie.btns Url.params, ["order", "search"]

  view: ({input})->
    menu.input.icon.item "th-large",
      className: "glass tooltip-right"
      menu: [input]

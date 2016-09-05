doc.component.chr_sets =
  controller: ->
    InputTie.btns Url.params, ["order", "search"]

  view: (tie)->
    tie.draw()
    menu.input.icon.item "th-large",
      className: "glass tooltip-right"
      menu: [tie.input]

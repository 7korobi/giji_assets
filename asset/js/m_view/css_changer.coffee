doc.view.css_changer = (tie)->
  { input } = tie

  tie.draw()
  m ".paragraph",
    menu.input.icon.item "cog",
      className: "pull-right tooltip-left"
    input.theme.field()
    m "hr.black"

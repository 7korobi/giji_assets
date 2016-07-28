doc.view.css_changer = ({input})->
  m ".paragraph",
    menu.input.icon.item "cog",
      className: "pull-right tooltip-left"
    input.theme.field ({caption})-> caption
    m "hr.black"

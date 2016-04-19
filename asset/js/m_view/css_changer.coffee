doc.view.css_changer = ({input})->
  m ".paragraph",
    menu.icon.item "cog",
      className: "pull-right tooltip-left"
      tag: "menuicon"
    input.theme.field ({caption})-> caption
    m "hr.black"

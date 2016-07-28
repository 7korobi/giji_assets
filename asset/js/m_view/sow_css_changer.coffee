doc.view.sow_css_changer = ({url, input})->
  m ".paragraph",
    menu.input.icon.item "cog",
      className: "pull-right menuicon tooltip-left"
    if url
      if doc.user.is_login
        {uid, pwd} = Url.prop
        m "a.btn.edge",
          href: "#{url}?ua=mb&cmd=vindex&uid=#{uid()}&pwd=#{pwd()}"
        , "携帯"
      else
        m "a.btn.edge",
          href: "#{url}?ua=mb"
        , "携帯"
    input.theme.field ({caption})-> caption
    m "hr.black"

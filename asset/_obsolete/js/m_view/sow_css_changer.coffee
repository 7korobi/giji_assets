doc.view.sow_css_changer = (c)->
  m ".paragraph",
    m "a.menuicon.pull-right.icon-cog", menu.icon.start({}, "cog"), " "
    if c.url
      if doc.user.is_login
        {uid, pwd} = Url.prop
        m "a.btn.edge[href=#{c.url}?ua=mb&cmd=vindex&uid=#{uid()}&pwd=#{pwd()}]", "携帯"
      else
        m "a.btn.edge[href=#{c.url}?ua=mb]", "携帯"
    Btns.radio {}, Url.prop.theme,
      cinema: "煉瓦"
      star:   "蒼穹"
      night:  "闇夜"
      moon:   "月夜"
      wa:     "和の国"
    m "hr.black"

ua = "javascript"

doc.component.sow_auth =
  controller: !->
    doc.user = @
    @url = gon.url
    @params = { ua }
    @g = new win.gesture do
      timeout: 5000
      check: ~>
        if doc.user.is_login
          true
        else
          validate.sow_auth @

      do: (p)~>
        p
        .then (e)~>
          if doc.user.is_login
            cmd = "logout"
            Submit.iframe @url, { cmd, ua }

          else
            @params.cmd = "login"
            Submit.iframe @url, @params

        .then (gon)!~>
          if e = gon.errors
            @errors = e.login || e[""]
          deploy gon

    @form = Mem.Query.options.form @params, <[uid pwd]>, @g

    deploy = (gon)!~>
      o = gon.sow_auth
      return unless o
      doc.user.is_login = @is_login = o.is_login > 0
      doc.user.is_admin = o.is_admin > 0

      validate.sow_auth @
      @form.by_cookie()

    deploy gon


  view: (c, {uid, pwd})->
    submit = (label)->
      className: "btn edge"
      value: label
      type: "submit"

    m "form", c.form.attr,
      if c.is_login
        m ".paragraph",
          unless c.g.timer
            m "input", submit "#{c.params.uid} がログアウト"
      else
        m ".paragraph",
          c.form.uid.head()
          c.form.uid.field()
          c.form.pwd.head()
          c.form.pwd.field()
          unless c.g.timer
            m "input", submit "ログイン"
      m ".paragraph",
        for msg in c.errors
          m ".WSAY", m ".emboss", msg
        for msg in c.infos
          m ".TSAY", m ".emboss", msg

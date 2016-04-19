ua = "javascript"

doc.component.sow_auth =
  controller: !->
    @params = { ua }
    @tie = Mem.Query.options.form @params, <[uid pwd]>
    @tie.timeout = 5000
    @tie.disable = ~>
      m.endComputation()

    @tie.check = ~>
      console.log [@params, @errors, @infos]
      if doc.user.is_login
        true
      else
        validate.sow_auth @

    @tie.action = ~>
      if doc.user.is_login
        cmd = "logout"
        params = { cmd, ua }
      else
        params = @params
        params.cmd = "login"

      Submit.iframe @url, params
      .then (gon)!~>
        if e = gon.errors
          @errors = e.login || e[""]
        deploy gon

    doc.user = @
    @url = gon.url

    deploy = (gon)!~>
      o = gon.sow_auth
      return unless o
      doc.user.is_login = @is_login = o.is_login > 0
      doc.user.is_admin = o.is_admin > 0

      validate.sow_auth @
      @tie.by_cookie()

    deploy gon


  view: (c)->
    c.tie.form {},
      if c.is_login
        m ".paragraph",
          c.tie.submit "#{c.params.uid} がログアウト"
      else
        m ".paragraph",
          c.tie.input.uid.head()
          c.tie.input.uid.field()
          c.tie.input.pwd.head()
          c.tie.input.pwd.field()
          c.tie.submit "ログイン"
      m ".paragraph",
        for msg in c.errors
          m ".WSAY", m ".emboss", msg
        for msg in c.infos
          m ".TSAY", m ".emboss", msg

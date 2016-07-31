ua = "javascript"

doc.component.sow_auth =
  controller: !->
    { url } = gon
    doc.user = {}
    deploy = ({ sow_auth })!~>
      return unless sow_auth
      doc.user.is_login = 0 < sow_auth.is_login
      doc.user.is_admin = 0 < sow_auth.is_admin
      doc.user.id       =     sow_auth.uid
      if doc.user.is_login
        WebStore.cookie.copyTo @tie
      validate.sow_auth @

    @params = { ua, cmd: "login" }
    @tie = InputTie.form @params, <[uid pwd]>
    @tie.timeout = 5000
    @tie.check = ~>
      if @is_login
        true
      else
        validate.sow_auth @
    @tie.action = ~>
      if doc.user.is_login
        cmd = "logout"
        params = { cmd, ua }
      else
        params = @params

      Submit.iframe url, params
      .then (gon)!~>
        if e = gon.errors
          @errors = e.login || e[""]
        deploy gon

    deploy gon


  view: (c)->
    c.tie.form {},
      if doc.user.is_login
        m ".paragraph",
          c.tie.submit "#{doc.user.id} がログアウト"
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

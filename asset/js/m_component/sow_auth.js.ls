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

    @params = { ua, cmd: "login" }
    @tie = InputTie.form @params, <[uid pwd]>
    @tie.timeout = 5000
    @tie.validate = (e)~>
      {uid, pwd} = @params
      is_same =
        if uid == pwd
          "パスワードとIDが同じです。"
      @tie.input.pwd.error is_same


    @tie.action = ~>
      params =
        if doc.user.is_login
          cmd = "logout"
          { cmd, ua }
        else
          @params

      Submit.iframe url, params
      .then (gon)!~>
        if e = gon.errors
          @tie.input.pwd.error e.login || e[""]
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
        c.tie.infos (msg)->
          m ".TSAY", m ".emboss", msg
        c.tie.errors (msg)->
          m ".WSAY", m ".emboss", msg

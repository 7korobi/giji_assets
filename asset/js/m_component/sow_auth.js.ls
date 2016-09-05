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
    @tie.do_draw ~>
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
          msgs = e.login || e[""]
          @tie.input.uid.error msgs
        deploy gon

    deploy gon


  view: ({ tie })->
    tie.draw()
    tie.form {},
      if doc.user.is_login
        m ".paragraph",
          tie.submit "#{doc.user.id} がログアウト"
      else
        m ".paragraph",
          tie.input.uid.head()
          tie.input.uid.field()
          tie.input.pwd.head()
          tie.input.pwd.field()
          tie.submit "ログイン"
      m ".paragraph",
        tie.infos (msg)->
          m ".TSAY", m ".emboss", msg
        tie.errors (msg)->
          m ".WSAY", m ".emboss", msg

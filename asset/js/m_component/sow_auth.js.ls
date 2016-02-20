doc.component.sow_auth =
  controller: !->
    doc.user = @
    @url = gon.url

    @params = {}
    @form = Mem.options.form @params, <[uid pwd]>,
      oninput: ~>
        validate.sow_auth @
      onchange: ~>
        validate.sow_auth @
      onsubmit: ~>
        if doc.user.is_login
          logout()
        else
          login()
        false

    error = (message)~>
      @errors = [message]
      loading false

    refresh = (gon)!~>
      if e = gon.errors
        @errors = e.login || e[""]
      else
      deploy gon
      @form.disable false

    deploy = (gon)!~>
      o = gon.sow_auth
      return unless o
      doc.user.is_login = @is_login = o.is_login > 0
      doc.user.is_admin = o.is_admin > 0

      validate.sow_auth @
      @form.by_cookie()

    logout = ~>
      cmd = "logout"
      @form.disable true
      Submit.get @url, {cmd}
      .then refresh, error

    login = ~>
      @params.cmd = "login"
      if validate.sow_auth @
        @form.disable true
        Submit.iframe @url, @params
        .then refresh, error

    deploy gon


  view: (c, {uid, pwd})->
    submit = (label)->
      className: "btn edge"
      value: label
      type: "submit"

    m "form", c.form.attr,
      if c.is_login
        m ".paragraph",
          unless c.is_loading
            m "input", submit "#{c.params.uid} がログアウト"
      else
        m ".paragraph",
          c.form.uid.head()
          c.form.uid.field()
          c.form.pwd.head()
          c.form.pwd.field()
          unless c.is_loading
            m "input", submit "ログイン"
      m ".paragraph",
        for msg in c.errors
          m ".WSAY", m ".emboss", msg
        for msg in c.infos
          m ".TSAY", m ".emboss", msg

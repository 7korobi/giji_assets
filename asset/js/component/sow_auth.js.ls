sow_auth =
  controller: ({uid, pwd})!->
    @url = gon.url

    loading = (b)~>
      @uid.disabled = @pwd.disabled = b

    error = (message)~>
      @errors = [message]
      loading false

    refresh = (gon)!~>
      if e = gon.errors
        @errors = e.login || e[""]
      else
      deploy gon
      loading false

    deploy = (gon)!~>
      o = gon.sow_auth
      return unless o
      doc.user.is_login = o.is_login > 0
      doc.user.is_admin = o.is_admin > 0

      validate.sow_auth @
      Url.popstate() # read from cookie

    deploy gon

    @logout = ~>
      loading true
      Submit.get @url,
        cmd: "logout"
      .then refresh, error

    @login = ~>
      if validate.sow_auth @
        loading true
        Submit.iframe @url,
          cmd: "login"
          uid: uid()
          pwd: pwd()
        .then refresh, error


    text = (prop)~>
      set = m.withAttr "value", (val)~>
        return if @is_loading
        prop val
        validate.sow_auth @

      disabled: false
      onblur:   set
      onchange: set
      onkeyup:  set
      value: prop()

    @form =
      onsubmit: ~>
        return false if @is_loading
        if doc.user.is_login
          @logout()
        else
          @login()
        false

    @uid = text uid
    @pwd = text pwd


  view: (c, {uid, pwd})->
    submit = (label)->
      className: "btn edge"
      value: label
      type: "submit"

    m "form", c.form,
      if doc.user.is_login
        m ".paragraph",
          unless c.is_loading
            m "input", submit "#{uid()} がログアウト"
      else
        m ".paragraph",
          m "label",
            m "span.mark", "user id : "
            m "input", c.uid
          m "label",
            m "span.mark", "password : "
            m "input[type=password]", c.pwd
          unless c.is_loading
            m "input", submit "ログイン"
      m ".paragraph",
        for msg in c.errors
          m ".WSAY", m ".emboss", msg
        for msg in c.infos
          m ".TSAY", m ".emboss", msg

doc.component.sow_auth = sow_auth

win.mount \#sow_auth, ->
  controller: ->
  view: ->
    m.component doc.component.sow_auth, Url.prop

win.mount \#sow_auth, (dom)->
    controller: (arg)!->
      @url = gon.url

      refresh = (gon)!~>
        console.log refresh
        if e = gon.errors
          @errors = e.login || e[""]
        else
        deploy gon
        @is_loading = false

      deploy = (gon)!~>
        o = gon.sow_auth
        return unless o
        doc.user.is_login = o.is_login > 0
        doc.user.is_admin = o.is_admin > 0

        validate.sow_auth @
        Url.popstate() # read from cookie

      deploy gon



      @logout = ~>
        @is_loading = true
        Submit.get @url,
          cmd: "logout"
        .then refresh

      @login = ~>
        if validate.sow_auth @
          {uid, pwd} = Url.prop
          @is_loading = true
          Submit.iframe @url,
            cmd: "login"
            uid: uid()
            pwd: pwd()
          .then refresh

      doc.user

    view: (c, args)->
      {uid, pwd} = Url.prop

      messages = (c)->
        m ".paragraph",
          for msg in c.errors
            m ".WSAY", m ".emboss", msg
          for msg in c.infos
            m ".TSAY", m ".emboss", msg

      if c.is_loading
        form = (call)->
          onsubmit: ->
            false

        submit = (label)->
          className: "btn edge active"
          value: label
          type: "submit"

        input = (prop)->
          set = m.withAttr("value", prop)
          disabled: true
          value: prop()
      else
        form = (call)->
          onsubmit: ->
            call()
            false

        submit = (label)->
          className: "btn edge"
          value: label
          type: "submit"

        input = (prop)->
          set = m.withAttr("value", prop)
          onblur:   set
          onchange: set
          onkeyup:  set
          value: prop()

      validate.sow_auth c

      if doc.user.is_login
        m "form", form(c.logout),
          m ".paragraph",
            unless c.is_loading
              m "input", submit "#{uid()} がログアウト"
          messages c
      else
        m "form", form(c.login),
          m ".paragraph",
            m "label",
              m "span.mark", "user id : "
              m "input", input uid
            m "label",
              m "span.mark", "password : "
              m "input[type=password]", input pwd
            unless c.is_loading
              m "input", submit "ログイン"
          messages c

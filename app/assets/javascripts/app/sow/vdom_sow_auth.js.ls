GUI.if_exist \#sow_auth, (dom)->
  m.mount dom,
    controller: (arg)!->
      @url = gon.url

      refresh = (gon)!~>
        if e = gon.errors
          @errors = e.login || e[""]
        else
        deploy gon
        @is_loading = false

      deploy = (gon)!~>
        o = gon.sow_auth
        return unless o
        @is_login = o.is_login > 0
        @is_admin = o.is_admin > 0

        validate.sow_auth @
        Url.popstate() # read from cookie

      deploy gon



      @logout = ~>
        @is_loading = true
        Submit.get(@url, cmd: "logout")
        .then refresh

      @login = ~>
        if validate.sow_auth @
          {uid, pwd} = Url.prop
          @is_loading = true
          Submit.iframe(@url, cmd: "login", uid: uid(), pwd: pwd())
          .then refresh

    view: (c, args)->
      {uid, pwd} = Url.prop

      messages = ->
        m ".paragraph",
          for msg in c.errors
            m ".WSAY", m ".emboss", msg
          for msg in c.infos
            m ".TSAY", m ".emboss", msg

      if c.is_loading
        form = (call)->
          onsubmit: -> false
        btn = (label)->
          className: "btn edge active"
          value: label
          type: "submit"
        input = (prop)->
          set = m.withAttr("value", prop)
          disabled: true
          onblur:   set
          onchange: set
          onkeyup:  set
          value: prop()
      else
        form = (call)->
          onsubmit: ->
            call()
            false
        btn = (label)->
          className: "btn edge"
          value: label
          type: "submit"
        input = (prop)->
          set = m.withAttr("value", prop)
          onblur:   set
          onchange: set
          onkeyup:  set
          value: prop()

      if c.is_login
        m "form", form(c.logout),
          m ".paragraph",
            unless c.is_loading
              m "input", btn "#{uid()} がログアウト"
          messages()
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
              m "input", btn "ログイン"
          messages()

GUI.if_exist \#sow_auth, (dom)->
  m.mount dom,
    controller: (arg)!->
      @url = gon.url
      @errors = []

      refresh = (gon)!~>
        if e = gon.errors
          @errors = e.login || e[""]
        deploy gon
        @is_loading = false

      deploy = (gon)!~>
        o = gon.sow_auth
        return unless o
        @is_login = o.is_login > 0
        @is_admin = o.is_admin > 0
        Url.popstate() # read from cookie

      deploy gon

      @logout = ~>
        @is_loading = true
        @errors = []

        Submit.get(@url, cmd: "logout")
        .then refresh

      @login = ~>
        if 1 < Url.prop.uid()?.length < 21 && 2 < Url.prop.pwd()?.length < 21
          @is_loading = true
          @errors = []

          Submit.iframe(@url, cmd: "login", uid: Url.prop.uid(), pwd: Url.prop.pwd())
          .then refresh
        else
          @errors = ["IDとパスワードを入力してください。( 3〜20 byte)"]


    view: (c, args)->
      if c.is_login
        [
          m "form", { onsubmit: c.logout },
            unless c.is_loading
              m "a.TSAY", Btn.call({}, c.logout), "#{Url.prop.uid()} がログアウト"
            for error in c.errors
              m ".emboss", error
          m "hr.black"
        ]
      else
        [
          m "form", { onsubmit: c.login },
            m "label",
              m ".mark", "user id : "
              m "input", Txt.input Url.prop.uid
            m "label",
              m ".mark", "password : "
              m "input[type=password]", Txt.input Url.prop.pwd
            unless c.is_loading
              m "a.TSAY", Btn.call({}, c.login), "ログイン"
            for error in c.errors
              m ".emboss", error
          m "hr.black"
        ]

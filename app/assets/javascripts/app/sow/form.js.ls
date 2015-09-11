
test =
  enemy: "evil"
  turn: "main"
  win: "WOLF"
  live: "live"
  role: <[aura decide]>
  rolestate: 0x76f
  sheep: "pixi"
  love: "hate"

sw =
  controller: (f)->
  view: (c, f)->
    m "select[name=target]",
      m "option", { value: -1 , selected }, "（パス）"
      m "option", { value: v,   selected }, able.sw + "する"
    m "input", {type: 'submit', value: '変更', disabled },

target =
  controller: (f)->
  view: (c, f)->

text =
  controller: (f)->
  view: (c, f)->

form =
  controller: (f)->
  view: (c, f)->

# menu.icon.icon "pencil",
menu =
  open: ->
  close: ->
  view: ->
    m ".SAY.paragraph",
      doc.timeline()
      m "h6", "あなたが書き込む内容です。 - 記述"
      if event = Mem.events.list().last()
        for role in Mem.roles.list()
          m.component form, role, story, event, potof



  controller_org: (arg)!->
    @url = gon.url
    @errors = []
    @infos = []

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

      if @is_login
        @infos = ["OK."]
      else
        @infos = ["IDとパスワードを入力してください。"]
      Url.popstate() # read from cookie

    deploy gon



    @logout = ~>
      @is_loading = true
      @errors = []
      @infos = []

      Submit.get(@url, cmd: "logout")
      .then refresh

    @login = ~>
      {uid, pwd} = Url.prop
      if 1 < uid()?.length < 21 && 2 < pwd()?.length < 21
        @is_loading = true
        @errors = []
        @infos = []

        Submit.iframe(@url, cmd: "login", uid: uid(), pwd: pwd())
        .then refresh
      else
        @errors = ["IDとパスワードを入力してください。( 3〜20 byte)"]
        @infos = []


  view_org: (c, args)->
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

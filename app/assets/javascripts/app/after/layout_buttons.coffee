GUI.if_exist "#buttons", (dom)->
  unless head.browser.ios
    win.on.orientation.push ->
      {alpha, beta, gamma} = win.orientation
      z = - alpha + beta + gamma
      rotate = "rotateZ(#{z}deg)"

      anime = (box)->
        box.style.webkitTransform = rotate
        box.style.mozTransform = rotate if head.browser.ff
        box.style.msTransform = rotate if head.browser.ie
        box.style.oTransform = rotate if head.browser.opera
        box.style.transform = rotate
      for box in document.querySelectorAll(".icon-cog")
        anime box

  layout = new GUI.Layout dom, 1, -1, 120
  layout.width = 5
  layout.transition()

  m.mount dom,
    controller: ->
      helps:
        "cog": "画面表示を調整します。"
        "home":     "村の設定、アナウンスを表示します。"
        "clock":    "メモの履歴を表示します。"
        "mail":     "最新のメモを表示します。"
        "chat-alt": "発言を表示します。"
        "search":   "検索機能をつかいます。"
        "resize-normal": "簡略な表記にします。"
        "resize-full":   "詳細な表記にします。"
        "th-large":      "条件で絞り込みます。"
        "pencil":        "書き込み機能"

    view: (c)->
      vdoms = []
      section = (icon)->
        return unless menu.icon.nodes[icon]

        help = c.helps[icon]
        if help?
          tag = """section.tooltip-right[data-tooltip="#{help}"]"""
        else
          tag = """section"""
        vdom =
          m tag, menu.icon.start({class:"glass"}, icon),
            m ".bigicon",
              m ".icon-#{icon}", " "
            m ".badge.pull-right", badges[icon]() if badges[icon]
        vdoms.push vdom

      badges =
        "pin": ->
          doc.messages.pins(Url.prop).list().length - Mem.events.list().length
        "home": ->
          Mem.messages.home("announce").list().length - Mem.events.list().length
        "mail": ->
          prop = _.merge {}, Url.prop,
            memo: -> "all"
            uniq: -> true
            search: -> ""
          doc.messages.memo(prop).list().length - Mem.events.list().length
        "clock": ->
          prop = _.merge {}, Url.prop,
            talk: -> "all"
            open: -> true
            search: -> ""
          doc.messages.history(prop).list().length - Mem.events.list().length
        "chat-alt": ->
          prop = _.merge {}, Url.prop,
            talk: -> "all"
            open: -> true
            search: -> ""
          doc.messages.talk(prop).list().length - Mem.events.list().length
        "th-large": ->
          Mem.map_faces.active(Url.prop.order(), Url.prop.chr_set(), Url.prop.search()).list().length

      switch menu.scope.state()
        when "pins"
          section "pin"

        when "memo", "history"
          section "home"
          section "clock"
          section "mail"
          section "chat-alt"

        when "home", "talk"
          section "home"
          section "mail"
          section "chat-alt"

        when "full"
          section "resize-normal"
        when "normal"
          section "resize-full"

      section "pencil"
      section "th-large"
      section "search" unless "pins" == menu.scope.state()
      section "cog"

      m "table", m "tr", m "td", vdoms

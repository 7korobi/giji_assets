doc.component.buttons =
  controller: ->
    tap: (icon)-> menu.icon.start({class:"glass"}, icon)
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
        m tag, c.tap(icon),
          m ".bigicon",
            m ".icon-#{icon}", " "
          m ".badge.pull-right", badges[icon]() if badges[icon]
      vdoms.push vdom

    badges =
      "pin": ->
        doc.messages.pins(Url.prop).list.length - Mem.Query.events.list.length
      "home": ->
        Mem.Query.messages.home("announce").list.length - Mem.Query.events.list.length
      "mail": ->
        prop = _.merge {}, Url.prop,
          memo: -> "all"
          uniq: -> true
          search: -> ""
        doc.messages.memo(prop).list.length - Mem.Query.events.list.length
      "clock": ->
        prop = _.merge {}, Url.prop,
          talk: -> "all"
          open: -> true
          search: -> ""
        doc.messages.history(prop).list.length - Mem.Query.events.list.length
      "chat-alt": ->
        prop = _.merge {}, Url.prop,
          talk: -> "all"
          open: -> true
          search: -> ""
        doc.messages.talk(prop).list.length - Mem.Query.events.list.length
      "th-large": ->
        Mem.Query.map_faces.active(Url.prop.order(), Url.prop.chr_set(), Url.prop.search()).list.length

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

    m "table",
      m "tr",
        m "td", vdoms

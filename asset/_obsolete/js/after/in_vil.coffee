if gon?.events? && gon.event?
  win.mount "#messages", (dom)->
    win.scroll.size = 30

    doc.delegate.tap_external = (id, uri, protocol, host, path)->
      message = """
  #{protocol}://#{host}
  #{path}

このURLを開きますか？
"""
      if window.confirm message
        window.open uri, "_giji"


    doc.delegate.tap_anchor = (turn, logid, id, by_id)->
      [folder, vid, by_turn, by_logid] = by_id.split("-")
      anker_id = Mem.Query.messages.anker_id(folder, vid, turn, logid)
      [__, __, __, logid] = anker_id.split("-")

      has_tap = Mem.Query.messages.find(anker_id)
      event = Mem.Query.events.find("#{folder}-#{vid}-#{turn}")
      doc.load.event has_tap, event, ->
        pins = Url.prop.pins()
        pins["#{by_turn}-#{by_logid}"] = true
        pins["#{turn}-#{logid}"] = true
        change_pin(by_id)

    doc.delegate.tap_identity = (turn, logid, id)->
      return
      pins = Url.prop.pins()
      pins["#{turn}-#{logid}"] = true
      change_pin(id)

    menu.scope.node "history",
      open: ->
        Url.prop.scroll ""
        win.scroll.rescroll Url.prop.memo_at
    menu.scope.node "memo",
      open: ->
        Url.prop.scroll ""
        win.scroll.rescroll Url.prop.memo_at
    menu.scope.node "talk",
      open: ->
        Url.prop.scroll ""
        win.scroll.rescroll Url.prop.talk_at
    menu.scope.node "home",
      open: ->
        Url.prop.scroll ""
        win.scroll.rescroll Url.prop.home_at
    menu.scope.node "pins",
      open: ->
        win.scroll.rescroll Url.prop.scroll

    menu.icon.icon "pin",
      open: ->
        menu.scope.change "pins"
      close: ->
        Url.prop.pins {}
        menu.scope.change Url.prop.back()
      view: ->
        [ m ".paragraph",
            doc.timeline()
        ]

    menu.icon.icon "home",
      open: ->
        menu.scope.change "home"
      view: ->
        [ doc.timeline()
        ]

    menu.icon.icon "mail",
      open: ->
        menu.scope.change "memo"
      view: ->
        [ m ".paragraph",
            doc.timeline()
            m "h6", "貼り付けたメモを表示します。 - メモ"
            doc.security_modes Url.prop.memo
          doc.potofs()
        ]

    menu.icon.icon "chat-alt",
      open: ->
        menu.scope.change "talk"
      view: ->
        [ m ".paragraph",
            doc.timeline()
            m "h6", "村内の発言を表示します。 - 発言"
            doc.security_modes Url.prop.talk
          doc.potofs()
        ]

    menu.icon.icon "clock",
      open: ->
        menu.scope.change "history"
      view: ->
        [ m ".paragraph",
            doc.timeline()
            m "h6", "メモを履歴形式で表示します。 - メモ"
            doc.security_modes Url.prop.memo
          doc.potofs()
        ]

    menu.icon.icon "search",
      view: ->
        m ".paragraph",
          doc.timeline()
          m "input.medium", Txt.input Url.prop.search
          m "span", "発言中の言葉を検索します。"
          m "hr.black"

    m.startComputation()
    window.requestAnimationFrame ->
      catch_gon.villages()
      catch_gon.messages()

      menu.scope.open()
      m.endComputation()

    controller: ->
    view: ->
      win.scroll.pager "div", doc.messages[menu.scope.state()](Url.prop).list, doc.template


(o)->
  anchor_num  = o.logid[2..] - 0 || 0
  o.anchor = RAILS.log.anchor[o.logid[0]] + anchor_num || ""
  unless o.updated_at
    o.updated_at = new Date(o.date) - 0
    delete o.date
  if o.vdom
    o.vdom(o)
  else
    m ".paragraph", JSON.stringify o

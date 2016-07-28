if gon?.events? && gon.event?
  win.mount "#messages", (dom)->
    win.scroll.size = 30
    Url.conf.messages.current = true

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
        pins = Url.params.pins
        pins["#{by_turn}-#{by_logid}"] = true
        pins["#{turn}-#{logid}"] = true
        change_pin(by_id)

    doc.delegate.tap_identity = (turn, logid, id)->
      return
      Url.params.pins["#{turn}-#{logid}"] = true
      change_pin(id)

    controller: ->
      catch_gon.villages()
      catch_gon.messages()

    view: ->
      win.scroll.pager "div", doc.messages[menu.params.scope](Url.params).list, doc.template


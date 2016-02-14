doc.component.filter =
  controller: ({talk_at, scroll, pins})!->
    @click =
      go: ({_id})->
        GUI.attrs {}, ->
          @click ->
            talk_at _id
            pins {}
            menu.icon.change ""
            menu.scope.change "talk"
            scroll ""
            win.scroll.rescroll talk_at

      pin: (list, append)->
        GUI.attrs {}, ->
          @click ->
            for o in append
              pins()["#{o.turn}-#{o.logid}"] = true
            for o in list
              pins()["#{o.turn}-#{o.logid}"] = true
            change_pin win.scroll.prop()

    @day = 24 * 60 * 60
    @seeing_top = 100
    @seeing_measure =
      config: (elem)~>
        @seeing_top = elem.offsetTo

    @line_text_height = 27
    @line_text_height_measure =
      config: (elem)~>
        @line_text_height = elem.offsetHeight


  view: ({seeing_top, seeing_measure, line_text_height, line_text_height_measure, click, day}, prop)->
    center_id = win.scroll.prop()
    filter_size = Math.floor((win.height - seeing_top) / line_text_height) - 3

    anchorview = doc.messages.anchor(prop).list
    seeingview = doc.messages.seeing(filter_size, win.scroll.center)

    star = (o)->
      if doc.seeing[o._id] >= day
        attr = GUI.attrs {}, ->
          @end (e)->
            delete doc.seeing[o._id]
        m "span.#{o.mestype}.btn.edge", attr, "★ "

      else
        attr = GUI.attrs {}, ->
          @end (e)->
            doc.seeing_add o._id, day
        m "span.#{o.mestype}.btn.edge", attr, "☆ "

    m "section.plane",
      m "h6",
        "参照されている"
        m "span.btn.edge.icon-pin", click.pin(anchorview, [win.scroll.center])
      for o in anchorview
        m ".#{o.mestype}.line_text",
          m ".badge", click.go(o), "#{o.turn}:#{o.anchor}"
          m.trust o.log.line_text
      m "h6", seeing_measure,
        "よく見ていた"
        m "span.btn.edge.icon-pin", click.pin(seeingview, [])
      for o in seeingview
        if o._id == center_id
          tag = ".line_text.attention"
        else
          tag = ".line_text"
        m tag, line_text_height_measure,
          star(o)
          m ".#{o.mestype}.badge", click.go(o), "#{o.turn}:#{o.anchor}"
          m.trust "#{o.name} #{o.log.line_text}"

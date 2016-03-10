doc.component.filter =
  controller: !->
    { talk_at, scroll, pins } = Url.prop
    @click =
      go: ({_id})->
        cb = ->
          talk_at _id
          pins {}
          menu.icon.change ""
          menu.scope.change "talk"
          scroll ""
          win.scroll.rescroll talk_at
        onclick: cb
        onmouseup: cb
        ontouchend: cb

      pin: (list, append)->
        cb = ->
          for o in append
            pins()["#{o.turn}-#{o.logid}"] = true
          for o in list
            pins()["#{o.turn}-#{o.logid}"] = true
          change_pin win.scroll.prop()
        onclick: cb
        onmouseup: cb
        ontouchend: cb

      star_off: (o)->
        cb = ->
          delete doc.seeing[o._id]
        onclick: cb
        onmouseup: cb
        ontouchend: cb

      star_on: (o)->
        cb = ->
          doc.seeing_add o._id, day
        onclick: cb
        onmouseup: cb
        ontouchend: cb

    @day = 24 * 60 * 60
    @seeing_top = 100
    @seeing_measure =
      config: (elem)~>
        @seeing_top = elem.offsetTo

    @line_text_height = 27
    @line_text_height_measure =
      config: (elem)~>
        @line_text_height = elem.offsetHeight


  view: ({seeing_top, seeing_measure, line_text_height, line_text_height_measure, click, day})->
    center_id = win.scroll.prop()
    filter_size = Math.floor((win.height - seeing_top) / line_text_height) - 3

    anchorview = doc.messages.anchor(Url.prop).list
    seeingview = doc.messages.seeing(filter_size, win.scroll.center)

    star = (o)->
      if doc.seeing[o._id] >= day
        m "span.#{o.mestype}.btn.edge", click.star_off(o), "★ "
      else
        m "span.#{o.mestype}.btn.edge", click.star_on(o), "☆ "

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

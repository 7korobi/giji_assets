if gon?.potofs?
  GUI.if_exist "#sayfilter", (dom)->
    layout = new Layout dom, -1, 1, 100
    layout.small_mode = true
    layout.large_mode = ->
      ! (menu.icon.state() || layout.small_mode)

    wide_attr = GUI.attrs {}, ->
      @click ->
        layout.small_mode = ! layout.small_mode
        unless layout.small_mode
          menu.icon.state ""
      @actioned ->
        layout.translate()

    seeing_top = 100
    seeing_measure =
      config: (elem)->
        seeing_top = elem.offsetTop

    line_text_height = 27
    line_text_height_measure =
      config: (elem)->
        line_text_height = elem.offsetHeight

    m.mount dom,
      controller: ->
      view: ->
        layout.width  = Url.prop.right_width()
        layout.width += Url.prop.content_width() if layout.large_mode()


        if layout.width < 90
          layout.width = 90
          potofs =
            m "section.table-swipe",
              m "table",
                m "tfoot",
                  m "tr.center",
                    m "th[colspan=2]"
                m "tbody.plane", {test:"test"},
                  m "tr",
                      m "th.calc", "…"
          filter = []
        else
          filter_size = Math.floor((win.height - seeing_top) / line_text_height) - 3
          center_id = win.scroll.prop()
          potofs = doc.message.potofs()

          anchorview = doc.messages.anchor(Url.prop).list()
          seeingview = doc.messages.seeing(filter_size, win.scroll.center)

          go_click = (o)->
            GUI.attrs {}, ->
              @click ->
                Url.prop.talk_at o._id
                Url.prop.pins {}
                menu.icon.change ""
                menu.scope.change "talk"
                Url.prop.scroll ""
                win.scroll.rescroll Url.prop.talk_at

          pin_click = (list, append)->
            GUI.attrs {}, ->
              @click ->
                pins = Url.prop.pins()
                for o in append
                  pins["#{o.turn}-#{o.logid}"] = true
                for o in list
                  pins["#{o.turn}-#{o.logid}"] = true
                change_pin(center_id)
                Url.prop.pins(pins)

          day = 24 * 60 * 60
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

          filter =
            m "section.plane",
              m "h6",
                "参照されている"
                m "span.btn.edge.icon-pin", pin_click(anchorview, [win.scroll.center])
              for o in anchorview
                m ".#{o.mestype}.line_text",
                  m ".badge", go_click(o), "#{o.turn}:#{o.anchor}"
                  m.trust o.log.line_text
              m "h6", seeing_measure,
                "よく見ていた"
                m "span.btn.edge.icon-pin", pin_click(seeingview, [])
              for o in seeingview
                if o._id == center_id
                  tag = ".line_text.attention"
                else
                  tag = ".line_text"
                m tag, line_text_height_measure,
                  star(o)
                  m ".#{o.mestype}.badge", go_click(o), "#{o.turn}:#{o.anchor}"
                  m.trust "#{o.name} #{o.log.line_text}"

        potofs.children[0].children[1].attrs.className = "plane fine"
        for key, val of wide_attr
          potofs.children[0].children[1].attrs[key] = val

        event = Mem.events.find Url.prop.event_id()
        m "div",
          if event?
            m ".head", event.name
          else
            m ".foot"
          m "aside",
            potofs
            filter
          m ".foot"

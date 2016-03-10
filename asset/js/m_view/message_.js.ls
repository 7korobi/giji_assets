timer = (query, o)->
  child = ""
  attr =
    config: (elem, is_continue, context)->
      at = Timer.fetch o.updated_at
      context.onunload = ->
        delete context.update
      context.update = (text)->
        child = text
        elem.innerText = text
        elem.textContent = text
      unless is_continue
        at.start context

  m query, attr, child

dom = (parent, query, cb)->
  vdom = m query
  tag = vdom.tag
  attr = Object.keys(vdom.attrs)[0]

  for elem in parent.querySelectorAll query
    data = attr && unpack.Array elem.attributes[attr]?.value
    cb.apply(elem, data)

deco_action = (by_id)->
  config: (parent, is_continue, context)->
    dom parent, "span[anchor]", (a, turn, id)->
      @onmouseup = @ontouchend = (e)->
        m.startComputation()
        doc.delegate.tap_anchor(turn, a, id, by_id)
        m.endComputation()

    dom parent, "span[random]", (cmd, val)->
      @onmouseup = @ontouchend = (e)->
        m.startComputation()
        doc.delegate.tap_random(cmd, val, by_turn, by_id)
        m.endComputation()

    dom parent, "span[external]", (id, uri, protocol, host, path)->
      @onmouseup = @ontouchend = (e)->
        m.startComputation()
        doc.delegate.tap_external(id, uri, protocol, host, path, by_id)
        m.endComputation()

identity_action = (o)->
  cb = ->
    doc.delegate.tap_identity(o.turn, o.logid, o._id)
  onmouseup: cb
  ontouchend: cb

doc.ext = ext =
  say_base: (v, ...timer)->
    m "table.#{v.mestype}.talk", {key: v._id},
      m "tr",
        m "th",
          GUI.portrate v.face_id

        m "td",
          m ".msg",
            ext.talk_name v.user_id, v.name, v.to
            ext.talk_text v._id, v.style, v.log
            m "p.mes_date", timer

  action_text: (by_id, name, style, text)->
    m "p.text.#{style}", deco_action(by_id),
      m "b", m.trust name
      "は、"
      m "span",
        m.trust text.deco_text_br

  talk_name: (user_id, name, to)->
    if to
      m "p.name.center",
        m "b.pull-left", m.trust "#{name}"
        m "b", "▷"
        m "b.pull-right", m.trust "#{to}"
    else
      m "p.name",
        m "b", m.trust name
        m ".emboss.pull-right", user_id

  talk_text: (by_id, style, text)->
    m "p.text.#{style}", deco_action(by_id),
      m.trust text.deco_text_br



doc.view.toc = (o)->

doc.view.helps = (t)->
  m ".paragraph.#{t.mestype}", {key: t._id},
    m "ul",
      for o in t.list || []
        m "li",
          m "code", m.trust o.name
          m "kbd", m.trust o.HELP

doc.view.table = (t)->
  m ".paragraph.#{t.mestype}", {key: t._id},
    m "table",
      if t.heads
        m "thead",
          m "tr",
            for header in t.heads
              m "th", m.trust header
      if t.cols
        m "tbody",
          for o in t.list || []
            m "tr",
              for key in t.cols
                m "td",
                  m "p", m.trust o[key]

doc.view.paragraph = (o)->
  m ".paragraph", {key: o._id}, m.trust o.log.deco_text_br

doc.view.head = (o)->
  m o.mestype, {key: o._id},
    m 'a', {name: o._id}
    m.trust o.log.deco_text_br

doc.view.event = (o)->
  switch menu.scope.state()
    when "home", "talk"
      switch o.logid
        when "EVENT-ASC"
          m ".#{o.mestype}", {key: o._id},
            m "h3", m.trust o.name
        when "EVENT-DESC"
          m ".#{o.mestype}", {key: o._id},
            o.event.view.btn()
    when "pins","memo", "history"
      switch o.logid
        when "EVENT-DESC"
          m ".#{o.mestype}", {key: o._id},
            m "h3", m.trust o.name
            o.event.view.btn()
        when "EVENT-ASC"
          m ".#{o.mestype}", {key: o._id}

doc.view.xxx = (v)->
  m "div", {key: v._id}, ".U.C #{v._id}"

doc.view.info = (v)->
  m ".#{v.mestype}.info", {key: v._id},
    ext.talk_text v._id, "", v.log

doc.view.guide = (v)->
  m ".#{v.mestype}.guide", {key: v._id},
    ext.talk_name v.user_id, v.name, v.to
    ext.talk_text v._id, v.style, v.log
    m "p.mes_date",
      m "span.emboss", identity_action(v), v.anchor
      timer "span", v

doc.view.action = (v)->
  m ".#{v.mestype}.action", {key: v._id},
    ext.action_text v._id, v.name, v.style, v.log
    m "p.mes_date",
      timer "span", v

doc.view.memo = (v)->
  m "table.#{v.mestype}.memo", {key: v._id},
    m "tr",
      m "th",
        GUI.portrate v.face_id
        m "div", m "b", v.name
      m "td",
        ext.talk_text v._id, v.style, v.log
        m "p.mes_date",
          timer "span", v

doc.view.talk = (v)->
  ext.say_base v,
    m "span.emboss", identity_action(v), v.anchor
    timer "span", v

doc.view.history = (v)->
  ext.say_base v,
    m "span.mark", v.anchor

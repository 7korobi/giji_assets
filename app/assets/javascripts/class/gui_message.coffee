GUI.message = (->
  deco_action = (o)->
    config: (parent, is_continue, context)->
      GUI.attrs_to parent, "span[anchor]", {}, (a, turn, id)->
        @start (e)->
          m.startComputation()
          GUI.message.delegate.tap_anchor(o, turn, a, id)
          m.endComputation()

      GUI.attrs_to parent, "span[random]", {}, (cmd, val)->
        @start (e)->
          m.startComputation()
          GUI.message.delegate.tap_random(o, cmd, val)
          m.endComputation()

      GUI.attrs_to parent, "span[external]", {}, (id, uri, protocol, host, path)->
        @start (e)->
          m.startComputation()
          GUI.message.delegate.tap_external(o, id, uri, protocol, host, path)
          m.endComputation()

  identity_action = (o)->
    attr = GUI.attrs {}, ->
      @start (e)->
        GUI.message.delegate.tap_identity(o, o.turn, o.logid, o._id)

  delegate:
    tap_identity: -> console.log arguments
    tap_anchor:   -> console.log arguments
    tap_random:   -> console.log arguments
    tap_external: -> console.log arguments

  game: (story, event)->
    roletable = RAILS.roletable[story.type.roletable]
    mob = RAILS.mob[story.type.mob]

    [ GUI.letter "", story.view.game_rule,
        m "ul.note",
          m.trust RAILS.game_rule[story.type.game].HELP
        m "ul.note",
          for option_id in story.options
            option = RAILS.options[option_id]
            continue unless option
            m "li", option.help

      GUI.letter "", "#{roletable} / #{story.view.player_length}人",
        m "div",
          m "code", "事件"
          story.view.event_cards

        m "div",
          m "code", "役職"
          story.view.role_cards

        m "div",
          m "code", mob.CAPTION
          m "kbd", "#{mob.HELP}"

    ]

  story: (story)->
    rating = RAILS.rating[story.rating]
    saycnt = RAILS.saycnt[story.type.say] || {}

    m ".ADMIN.guide", {key: story._id}, [
      GUI.letter "head", story.name,
        m "div",
          m "code", "こだわり"
          m "img.pull-left",
            src: GUI.img_head + "/icon/cd_#{story.rating}.png"
          rating.caption
        m "div",
          m "code", "発言制限"
          m.trust saycnt.CAPTION + "<br>" + saycnt.HELP
        m "div",
          m "code", "更新"
          story.view.update_at + "(" + story.view.update_interval + "ごと)"

      GUI.letter "", "設定",
        m.trust story.comment
      m "span.mes_date.pull-right",
        "managed by "
        m ".emboss", story.user_id
      m "hr.black"
    ]

  ###
  "epilogue":0,
  "event":null,
  "say":{},
  "seance":{},
  "turn":0,
  ###

  potofs: (v)->
    m "div", {key: v._id}, ".U.C #{v._id}"

  xxx: (v)->
    m "div", {key: v._id}, ".U.C #{v._id}"

  event: (v)->
    m "h3", {key: v._id}, m.trust v.name

  info: (v)->
    m ".#{v.mestype}.info", {key: v._id},
      m "p.text", deco_action(v), m.trust v.log.deco_text

  guide: (v)->
    m ".#{v.mestype}.guide", {key: v._id},
      m "p.name",
        m "b", m.trust v.name
      m "p.text.#{v.style}", deco_action(v), m.trust v.log.deco_text
      m "p.mes_date",
        m "span.mark", identity_action(v), v.anchor
        GUI.timer "span", v

  action: (v)->
    m ".#{v.mestype}.action", {key: v._id},
      m "p.text.#{v.style}", deco_action(v),
        m "b", m.trust v.name
        "は、"
        m "span",
          m.trust v.log.deco_text
      m "p.mes_date",
        GUI.timer "span", v

  memo: (v)->
    m "table.#{v.mestype}.memo", {key: v._id},
      m "tr",
          m "th",
            GUI.portrate v.face_id
            m "div", m "b", v.name

          m "td",
            m "p.text.#{v.style}", deco_action(v), m.trust v.log.deco_text
            m "p.mes_date",
              GUI.timer "span", v

  talk: (v)->
    GUI.message.say_base v,
      m "span.mark", identity_action(v), v.anchor
      GUI.timer "span", v

  history: (v)->
    GUI.message.say_base v,
      m "span.mark", v.anchor

  say_base: (v, timer...)->
    messages = []
    if v.to
      messages.push m "p.name.center",
        m "b.pull-left", m.trust "#{v.name}"
        m "b", "▷"
        m "b.pull-right", m.trust "#{v.to}"
    else
      messages.push m "p.name",
        m "b", m.trust v.name
        m ".emboss.pull-right", v.user_id

    messages.push m "p.text.#{v.style}", deco_action(v), m.trust v.log.deco_text
    messages.push m "p.mes_date", timer

    m "table.#{v.mestype}.talk", {key: v._id},
      m "tr",
        m "th",
          GUI.portrate v.face_id

        m "td",
          m ".msg", messages
)()

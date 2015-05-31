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
        GUI.message.delegate.tap_identity(o, o.event.turn, o.logid, o._id)

  delegate:
    tap_identity: -> console.log arguments
    tap_anchor:   -> console.log arguments
    tap_random:   -> console.log arguments
    tap_external: -> console.log arguments

  cmd_target: ->
    targets = for target in Cache.targets.command(o.cmd).list()
      m "option",
        { value: target.val }
        target.name
    targets.unshift(
      m "option",
        { value: "?", selected: true }
        "- 選択してください -"
    )
    
    buttons = for button in Cache.commands.target().list()
      m "option",
        button.title

    m "p.commitbutton",
      m "select", targets
      m "select", buttons
      Btn.submit {}, {}

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

    m ".MAKER.guide", {key: story._id}, [
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
    {potofs_order, potofs_desc} = Url.prop
    toggle_desc = (prop, value)->
      if prop() == value
        attr = Btn.bool {}, potofs_desc
        attr.className = "btn edge active"
        attr
      else
        Btn.set {}, prop, value
    hides = Url.prop.potofs_hide()
    m "section.table-swipe", 
      m "table",
        m "tfoot",
          m "tr.center",
            m "th[colspan=2]", m "sup", "(スクロールします。)"
            m "th", m "a", toggle_desc(potofs_order, "stat_at"),  "日程"
            m "th", m "a", toggle_desc(potofs_order, "stat_type"),"状態"
            m "th", m "a", toggle_desc(potofs_order, "said_num"), "発言"
            m "th", m "a", toggle_desc(potofs_order, "pt"),       "残り"
            m "th", m "a", toggle_desc(potofs_order, "urge"),     "促"
            m "th", m "span.icon-user", " "
            m "th", m "a", toggle_desc(potofs_order, "select"),     "希望"
            m "th", m "a", toggle_desc(potofs_order, "win_result"), "勝敗"
            m "th", m "a", toggle_desc(potofs_order, "win_side"),   "陣営"
            m "th", m "a", toggle_desc(potofs_order, "role"),       "役割"
            m "th", m "a", toggle_desc(potofs_order, "text"),       "補足"
        m "tbody.plane", {test:"test"},
          for o in Cache.potofs.view(potofs_desc(), potofs_order()).list()
            filter_class =
              if hides[o.face_id]
                "filter-hide"
              else
                ""
            m "tr", {className: filter_class},
              m "th.#{o.live}.calc", {}, o.view.job
              m "th.#{o.live}", {}, o.name
              m "td.#{o.live}.calc", {}, o.view.stat_at
              m "td.#{o.live}", {}, o.view.stat_type
              m "td.#{o.live}.calc", {}, o.view.said_num
              m "td.#{o.live}.calc", {}, o.view.pt
              m "td.#{o.live}.center", {}, o.view.urge
              m "td.#{o.live}.center", {}, o.view.user_id
              m "td.#{o.live}.center", {}, o.view.select
              m "td.WIN_#{o.view.win}.center", {}, o.view.win_result
              m "td.WIN_#{o.view.win}.calc", {}, o.view.win_side
              m "td.WIN_#{o.view.win}", {}, o.view.role
              m "td.WIN_#{o.view.win}", {}, m.trust o.view.text

  xxx: (v)->
    m "div", {key: v._id}, ".U.C #{v._id}"

  event: (v)->
    btn = v.event.view.btn()
    list = []
    list.push m "h3", m.trust v.name 
    list.push btn if btn

    m ".#{v.mestype}", {key: v._id}, list

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

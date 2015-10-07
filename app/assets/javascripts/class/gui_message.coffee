GUI.message = (->
  deco_action = (by_id)->
    config: (parent, is_continue, context)->
      GUI.dom parent, "span[anchor]", (a, turn, id)->
        @onmouseup = @ontouchend = (e)->
          m.startComputation()
          GUI.message.delegate.tap_anchor(turn, a, id, by_id)
          m.endComputation()

      GUI.dom parent, "span[random]", (cmd, val)->
        @onmouseup = @ontouchend = (e)->
          m.startComputation()
          GUI.message.delegate.tap_random(cmd, val, by_turn, by_id)
          m.endComputation()

      GUI.dom parent, "span[external]", (id, uri, protocol, host, path)->
        @onmouseup = @ontouchend = (e)->
          m.startComputation()
          GUI.message.delegate.tap_external(id, uri, protocol, host, path, by_id)
          m.endComputation()

  identity_action = (o)->
    attr = GUI.attrs {}, ->
      @end (e)->
        GUI.message.delegate.tap_identity(o.turn, o.logid, o._id)

  delegate:
    tap_identity: -> console.log arguments
    tap_anchor:   -> console.log arguments
    tap_random:   -> console.log arguments
    tap_external: -> console.log arguments

  toc: (o)->

  helps: (t)->
    m ".paragraph.#{t.mestype}", {key: t._id},
      m "ul",
        for o in t.list() || []
          m "li",
            m "code", m.trust o.name
            m "kbd", m.trust o.HELP

  table: (t)->
    m ".paragraph.#{t.mestype}", {key: t._id},
      m "table",
        if t.heads
          m "thead",
            m "tr",
              for header in t.heads
                m "th", m.trust header
        if t.cols
          m "tbody",
            for o in t.list() || []
              m "tr",
                for key in t.cols
                  m "td",
                    m "p", m.trust o[key]

  paragraph: (o)->
    m ".paragraph", {key: o._id}, m.trust o.log.deco_text

  head: (o)->
    m o.mestype, {key: o._id},
      m 'a', {name: o._id}
      m.trust o.log.deco_text

  event: (o)->
    btn = o.event().view.btn()
    list = []
    list.push m "h3", m.trust o.name
    list.push btn if btn

    m ".#{o.mestype}", {key: o._id}, list

  ###
  "epilogue":0,
  "event":null,
  "say":{},
  "seance":{},
  "turn":0,
  ###
  story_game: (o)->
    event = o.event()
    story = o.story()
    return [] unless event && story

    roletable = RAILS.roletable[story.type.roletable]
    mob = Mem.roles.find(story.type.mob)
    trap_card = Mem.traps.find(event.event)
    texts = []
    texts.push Mem.winners.find(event.winner).name + "の勝利です。" if event.winner && "WIN_NONE" != event.winner
    texts.push m "kbd", trap_card if trap_card
    texts.push RAILS.event_state.grudge    if event.turn == event.grudge
    texts.push RAILS.event_state.riot      if event.turn == event.riot
    texts.push RAILS.event_state.scapegoat if event.turn == event.scapegoat
    texts.push RAILS.event_state.eclipse   if _.find event.eclipse, event.turn

    m ".MAKER.#{event.winner}.guide", {key: "STORY-GAME"},
      for text in texts
        m "p.text", text

      [
        m "p.name",
          m "b", story.view.game_rule
        m "p.text",
          m "ul.note",
            m.trust RAILS.game_rule[story.type.game].HELP
          m "ul.note",
            for option_id in story.options
              option = RAILS.options[option_id]
              continue unless option
              m "li", option.help

        m "p.name",
          m "b", "#{roletable} / #{story.view.player_length}人"
        m "p.text",
          m "div",
            m "code", "事件"
            story.view.trap_cards

          m "div",
            m "code", "役職"
            story.view.role_cards

          m "div",
            m "code", mob.name
            m "kbd", "#{mob.HELP}"

        m "span.mes_date.pull-right",
          "managed by "
          m ".emboss", story.user_id
        m "hr.black"
      ]

  story_rule: (o)->
    event = o.event()
    story = o.story()
    return [] unless event && story

    rating = RAILS.rating[story.rating]
    saycnt = RAILS.saycnt[story.type.say] || {}

    m ".MAKER.#{event.winner}.guide", {key: "STORY-RULE"},
      m "p.name",
        m "b", "設定"
      m "p.text",
        m "div",
          m "code", "こだわり"
          m "img",
            src: GUI.img_head + "/icon/cd_#{story.rating}.png"
          m.trust rating.caption
        m "div",
          m "code", "発言制限"
          m.trust saycnt.CAPTION + "<br>" + saycnt.HELP
        m "div",
          m "code", "更新"
          story.view.update_at + "(" + story.view.update_interval + "ごと)"

      m "span.mes_date.pull-right",
        "managed by "
        m ".emboss", story.user_id
      m "hr.black"


  story_text: (o)->
    story = o.story()

    m ".MAKER.guide", {key: "STORY-TEXT"},
      m "p.name", m "b", story.name
      GUI.message.talk_text o._id, "head", story.comment

      m "span.mes_date.pull-right",
        "managed by "
        m ".emboss", story.user_id
      m "hr.black"

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
          for o in Mem.potofs.view(potofs_desc(), potofs_order()).list()
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


  form: (v)->
    formats =
      talk: "発言"
      memo: "メモ"
    format_btn = (format, text)->
      m "span.btn.edge", v.format_on(format), text

    text_btn = (able, attr)->
      m "span.btn.edge", attr.attr.choice(), able.name

    select = (input, able)->
      selected = (prop, val)->
        if val == prop()
          "[selected]"
        else
          ""

      if input.targets
        options =
          m "optgroup[label=選択肢]",
            for {pno, job, name} in input.targets
              selected = ""
              selected = "[selected]" if input.target() == pno
              m "option[value=#{pno}]#{selected}", "#{job} #{name}"

      vdoms = []
      if able.action
        act_attrs =
          onchange: m.withAttr "value", (index)->
            input.text Mem.actions.find(index).text
        vdoms.push m "fieldset.text",
          m "select.label", input.attr.target(), options
          m "select.input", act_attrs,
            for act in Mem.actions.list()
              m "option[value=#{act.index}]", "#{act.text}"
          m "input.input[type=text]", input.attr.text()
          m "input.btn.edge[type=button][value=#{ able.action }]"

      if able.targets
        vdoms.push m "p.text",
          m "select.roster", input.attr.target(), options
          "と"
          m "select.roster", input.attr.target(), options
          m "input.btn.edge[type=button][value=#{ able.targets }]"

      if able.target
        vdoms.push m "p.text",
          m "select.roster", input.attr.target(), options
          m "input.btn.edge[type=button][value=#{ able.target }]"

      if able.sw
        vdoms.push m "p.text",
          m "select.roster", input.attr.target(), options
          m "input.btn.edge[type=button][value=#{ able.sw }？]"

      if able.btn
        vdoms.push m "p.text",
          m "input.btn.edge[type=button][value=#{ able.btn }]"
          m "span.TSAY.emboss", able.change

      for msg in input.errors
        vdoms.push m ".WSAY", m ".emboss", msg
      for msg in input.infos
        vdoms.push m ".TSAY", m ".emboss", msg

      vdoms

    act = (acttype, o)->
      target = o.target_at o.target()
      m ".#{acttype}.action",
        m "p.text",
          m "b", face.name
          "は、"
          target.name
          o.text()
        m "p.text"
          select o, action: "ACT"

    chr_job = Mem.chr_jobs.find(v.chr_job_id)
    face = chr_job.face()

    m "div", {key: v._id},
      m "h6", m.trust v.role_name
      if v.mestype?
        m "table.#{v.mestype}.#{v.format}",
          m "tr",
            m "th",
              GUI.portrate face._id

            m "td",
              m ".msg",
                GUI.message.talk_name v.name, "#{chr_job.job} #{face.name}", v.to
                m "textarea[rows=5]", v.form[v.mestype][v.format].attr.text()
                for format, text of formats
                  format_btn format, text
                for o in v.texts
                  text_btn o.able, o[v.format]
                m "p.mes_date"


      if v.acttype? && "talk" == v.format
        act v.acttype, v.form.act

      m ".WIN_#{v.win}.info",
        m ".emboss.pull-right", m.trust v.role_name
        for {able, input} in v.selects
          select input, able
        m "p.text",
          m.trust v.role_help
        m "p.text",
          m.trust v.history
      m ".caution.info",
        m "p.text",
          m.trust v.able_help
      m "hr.black"


  xxx: (v)->
    m "div", {key: v._id}, ".U.C #{v._id}"

  info: (v)->
    m ".#{v.mestype}.info", {key: v._id},
      GUI.message.talk_text v._id, "", v.log

  guide: (v)->
    m ".#{v.mestype}.guide", {key: v._id},
      GUI.message.talk_name v.user_id, v.name, v.to
      GUI.message.talk_text v._id, v.style, v.log
      m "p.mes_date",
        m "span.emboss", identity_action(v), v.anchor
        GUI.timer "span", v

  action: (v)->
    m ".#{v.mestype}.action", {key: v._id},
      GUI.message.action_text v._id, v.name, v.style, v.log
      m "p.mes_date",
        GUI.timer "span", v

  memo: (v)->
    m "table.#{v.mestype}.memo", {key: v._id},
      m "tr",
        m "th",
          GUI.portrate v.face_id
          m "div", m "b", v.name
        m "td",
          GUI.message.talk_text v._id, v.style, v.log
          m "p.mes_date",
            GUI.timer "span", v

  talk: (v)->
    GUI.message.say_base v,
      m "span.emboss", identity_action(v), v.anchor
      GUI.timer "span", v

  history: (v)->
    GUI.message.say_base v,
      m "span.mark", v.anchor

  say_base: (v, timer...)->
    m "table.#{v.mestype}.talk", {key: v._id},
      m "tr",
        m "th",
          GUI.portrate v.face_id

        m "td",
          m ".msg",
            GUI.message.talk_name v.user_id, v.name, v.to
            GUI.message.talk_text v._id, v.style, v.log
            m "p.mes_date", timer

  action_text: (by_id, name, style, text)->
    m "p.text.#{style}", deco_action(by_id),
      m "b", m.trust name
      "は、"
      m "span",
        m.trust text.deco_text

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
      m.trust text.deco_text

)()

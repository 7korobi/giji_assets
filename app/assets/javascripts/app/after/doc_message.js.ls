deco_action = (by_id)->
  config: (parent, is_continue, context)->
    GUI.dom parent, "span[anchor]", (a, turn, id)->
      @onmouseup = @ontouchend = (e)->
        m.startComputation()
        doc.delegate.tap_anchor(turn, a, id, by_id)
        m.endComputation()

    GUI.dom parent, "span[random]", (cmd, val)->
      @onmouseup = @ontouchend = (e)->
        m.startComputation()
        doc.delegate.tap_random(cmd, val, by_turn, by_id)
        m.endComputation()

    GUI.dom parent, "span[external]", (id, uri, protocol, host, path)->
      @onmouseup = @ontouchend = (e)->
        m.startComputation()
        doc.delegate.tap_external(id, uri, protocol, host, path, by_id)
        m.endComputation()

identity_action = (o)->
  attr = GUI.attrs {}, ->
    @end (e)->
      doc.delegate.tap_identity(o.turn, o.logid, o._id)


ext =
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



doc.message =
  ext: ext

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

  /*
  "epilogue":0,
  "event":null,
  "say":{},
  "seance":{},
  "turn":0,
  */
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
      ext.talk_text o._id, "head", story.comment

      m "span.mes_date.pull-right",
        "managed by "
        m ".emboss", story.user_id
      m "hr.black"

  story_spines: (v)->
    header = m "div",
      m "a",
        href: "http://giji.check.jp#{v.link}"
      , m "code.icon-download"
      m "a",
        href: "http://7korobi.gehirn.ne.jp/stories/#{v._id}.html"
      , m "code.icon-download"
      m "kbd.note",
        v._id
      m "a",
        href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/#{v._id}"
      , m.trust v.name
      m "kbd",
        v.view.rating

    m "tr", {key: v._id },
      if menu.icon.state() == "resize-full"
        m "td",
          header
          m "table.detail",
            m "tbody",
              m "tr",
                m "th", "更新"
                m "td", "#{v.view.update_at} #{v.view.update_interval}"
              m "tr",
                m "th", "規模"
                m "td", "#{v.view.player_length}人 #{v.view.say_limit}"
              m "tr",
                m "th", "ルール"
                m "td", "#{v.view.game_rule}"
          m ".list", v.view.role_cards
          m ".list", v.view.trap_cards

      else
        m "td",
          header

  xxx: (v)->
    m "div", {key: v._id}, ".U.C #{v._id}"

  info: (v)->
    m ".#{v.mestype}.info", {key: v._id},
      ext.talk_text v._id, "", v.log

  guide: (v)->
    m ".#{v.mestype}.guide", {key: v._id},
      ext.talk_name v.user_id, v.name, v.to
      ext.talk_text v._id, v.style, v.log
      m "p.mes_date",
        m "span.emboss", identity_action(v), v.anchor
        GUI.timer "span", v

  action: (v)->
    m ".#{v.mestype}.action", {key: v._id},
      ext.action_text v._id, v.name, v.style, v.log
      m "p.mes_date",
        GUI.timer "span", v

  memo: (v)->
    m "table.#{v.mestype}.memo", {key: v._id},
      m "tr",
        m "th",
          GUI.portrate v.face_id
          m "div", m "b", v.name
        m "td",
          ext.talk_text v._id, v.style, v.log
          m "p.mes_date",
            GUI.timer "span", v

  talk: (v)->
    ext.say_base v,
      m "span.emboss", identity_action(v), v.anchor
      GUI.timer "span", v

  history: (v)->
    ext.say_base v,
      m "span.mark", v.anchor

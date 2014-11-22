GUI.message = (->
  deco_action = 
    config: (parent, is_continue, context)->
      GUI.attrs_to parent, "a[anchor]", (a, turn, id)->
        @start (e)->
          console.log [a, turn, id]
      GUI.attrs_to parent, "a[random]", (cmd, val)->
        @start (e)->
          console.log [cmd, val]
      GUI.attrs_to parent, "span[external]", (id, uri, protocol, host, path)->
        @start (e)->
          console.log [id, uri, protocol, host, path]

  story: (story)->
    mob = RAILS.mob[story.type.mob]
    rating = RAILS.rating[story.rating]
    saycnt = RAILS.saycnt[story.type.say] || {}
    roletable = RAILS.roletable[story.type.roletable]

    m ".ADMIN.guide", [
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


      GUI.letter "", story.view.game_rule,
        m "ul.note", 
          m.trust RAILS.game_rule[story.type.game].HELP
        m "ul.note",
          for option_id in story.options
            option = RAILS.options[option_id]
            continue unless option
            m "li", option.help

      GUI.letter "head", "#{story.view.player_length}人の配役設定",
        m "div", roletable
        m "div",
          m "code", "事件"
          story.view.event_cards

        m "div",
          m "code", "役職"
          story.view.role_cards

        m "div",
          m "code", "見物人"
          m "kbd", mob.caption
          #{mob.HELP}"

      m "span.mes_date.pull-right", 
        "managed by "
        m "kbd", story.sow_auth_id

      GUI.letter "", "設定",
        m.trust story.comment

      JSON.stringify story
    ]

  ###
  "epilogue":0,
  "event":null,
  "say":{},
  "seance":{},
  "turn":0,
  ###
  event: (event, story)->
    delete event.messages
    event_card = RAILS.events[event.event]
    modes = []
    modes.push RAILS.event_state.grudge    if event.turn == event.grudge 
    modes.push RAILS.event_state.riot      if event.turn == event.riot 
    modes.push RAILS.event_state.scapegoat if event.turn == event.scapegoat 
    modes.push RAILS.event_state.eclipse   if _.find event.eclipse, event.turn

    m ".MAKER.guide",    
      GUI.letter event.winner + ".head", event.name,
        RAILS.winner[event.winner] + "の勝利です。"
        m "br"
        m "kbd", event_card if event_card

  potofs: (v)->
    m "div", ".U.C"


  xxx: (v)->
    m "div", ".U.C"

  memo: (v)->
    m "div", ".U.C"

  info: (v)->
    m "p.text.#{v.mestype}", deco_action, m.trust v.log.deco_text

  admin: (v)->
    m ".guide.#{v.mestype}",
      m "h3.mesname",
        m "b", m.trust v.name
      m "p.text.#{v.style}", deco_action, m.trust v.log.deco_text
      m "p.mes_date",
        m "span.mark", v.anchor
        GUI.timer "span", v.updated_timer

  action: (v)->
    m ".#{v.mestype}",
      m ".action",
        m "p.text.#{v.style}", deco_action 
          m "b", m.trust v.name
          "は、"
          m "span",
            m.trust v.log.deco_text
        GUI.timer "p.mes_date", v.updated_timer

  talk: (v)->
    GUI.message.say_base v,
      m "span.mark", v.anchor
      GUI.timer "span", v.updated_timer

  history: (v)->
    GUI.message.say_base v, 
      m "span.mark", v.anchor

  say_base: (v, timer...)->
    m "table.say.#{v.mestype}",
      m "tbody",
        m "tr",
          m "td.img",
            GUI.portrate v.face_id

          m "td.field",
            m ".msg",
              m "h3.mesname",
                m "b", m.trust v.name
              m "p.text.#{v.style}", deco_action, m.trust v.log.deco_text
              m "p.mes_date", timer
)()


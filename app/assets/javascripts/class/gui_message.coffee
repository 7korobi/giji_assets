GUI.message =
  story: (story)->
    m ".ADMIN.guide",
      GUI.letter "head", story.name,
        JSON.stringify story

  ###
  "eclipse":[],
  "epilogue":0,
  "event":null,
  "grudge":-1,
  "riot":-1,
  "say":{},
  "scapegoat":-1,
  "seance":{},
  "turn":0,
  ###
  event: (event)->
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
    m "p.text.#{v.mestype}", m.trust v.log

  admin: (v)->
#      v.updated_timer ||= new Timer v.updated_at,
#        prop: m.prop()
    m ".guide.#{v.mestype}",
      m "h3.mesname",
        m "b", m.trust v.name
      m "p.text.#{v.style}", m.trust v.log
      m "p.mes_date",
        m "span.mark", v.anchor
        Timer.date_time_stamp v.updated_at
#          v.updated_timer.prop()

  action: (v)->
#      v.updated_timer ||= new Timer v.updated_at,
#        prop: m.prop()
    m ".#{v.mestype}",
      m ".action",
        m "p.text.#{v.style}",
          m "b", m.trust v.name
          m.trust "は、" + v.log
        m "p.mes_date", 
          Timer.date_time_stamp v.updated_at
#            v.updated_timer.prop()

  talk: (v)->
#      v.updated_timer ||= new Timer v.updated_at,
#        prop: m.prop()
    GUI.message.say_base v,
      m "span.mark", v.anchor
      Timer.date_time_stamp v.updated_at
#        v.updated_timer.prop()

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
              m "p.text.#{v.style}", m.trust v.log
              m "p.mes_date", timer



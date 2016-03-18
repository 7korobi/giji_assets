doc.view.story_game = ({event, story})->
  return [] unless event && story

  roletable = Mem.conf.role_table[story.type.roletable]
  mob = Mem.Query.roles.find(story.type.mob)
  trap_card = Mem.Query.traps.find(event.event)
  texts = []
  texts.push Mem.Query.winners.find(event.winner).name + "の勝利です。" if event.winner && "WIN_NONE" != event.winner
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
          m.trust Mem.conf.rule[story.type.game].HELP
        m "ul.note",
          for option_id in story.options
            option = Mem.conf.option[option_id]
            continue unless option
            m "li", option.help

      m "p.name",
        m "b", "#{roletable.name} / #{story.view.player_length}人"
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

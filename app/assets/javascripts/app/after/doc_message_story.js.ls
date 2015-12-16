ext = doc.ext

/*
"epilogue":0,
"event":null,
"say":{},
"seance":{},
"turn":0,
*/
doc.message.story_game = (o)->
  event = o.event
  story = o.story
  return [] unless event && story

  roletable = Mem.conf.role_table[story.type.roletable]
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

doc.message.story_rule = (o)->
  event = o.event
  story = o.story
  return [] unless event && story

  rating = Mem.conf.rating[story.rating]
  saycnt = Mem.conf.say[story.type.say] || {}

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


doc.message.story_text = (o)->
  story = o.story
  nindex = 0

  m ".MAKER.guide", {key: "STORY-TEXT"},
    m "p.name", m "b", story.name
    ext.talk_text o._id, "head", story.comment

    m "p", "■国のルール"
    RULE.nation.list.map (o)-> m "p", "#{++nindex}.#{o.head}"

    m ".emboss",
      "以上の項目が、人狼議事の"
      m 'a[href="http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=nation~~"]', "ルール"
      "と"
      m 'a[href="http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=player~~"]', "心構え"
      "なんだ。"

    m "span.mes_date.pull-right",
      "managed by "
      m ".emboss", story.user_id
    m "hr.black"

doc.message.story_spines = (v)->
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

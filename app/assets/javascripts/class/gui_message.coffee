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
    m "h3", {key: v._id}, v.name

  info: (v)->
    m ".#{v.mestype}.info", {key: v._id},
      m "p.text", deco_action, m.trust v.log.deco_text

  guide: (v)->
    m ".#{v.mestype}.guide", {key: v._id},
      m "p.name",
        m "b", m.trust v.name
      m "p.text.#{v.style}", deco_action, m.trust v.log.deco_text
      m "p.mes_date",
        m "span.mark", v.anchor
        GUI.timer "span", v.updated_timer

  action: (v)->
    m ".#{v.mestype}.action", {key: v._id},
      m "p.text.#{v.style}", deco_action,
        m "b", m.trust v.name
        "は、"
        m "span",
          m.trust v.log.deco_text
      GUI.timer "p.mes_date", v.updated_timer

  memo: (v)->
    m "table.#{v.mestype}.memo", {key: v._id},
      m "tr",
          m "th",
            m "div", GUI.portrate v.face_id
            m "div", m "h5", v.name

          m "td",
            m "p.text.#{v.style}", deco_action, m.trust v.log.deco_text
            m "p.mes_date",
              GUI.timer "span", v.updated_timer

  talk: (v)->
    GUI.message.say_base v,
      m "span.mark", v.anchor
      GUI.timer "span", v.updated_timer

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
            m "p.name",
              m "b", m.trust v.name
              m ".emboss.pull-right", v.user_id
            m "p.text.#{v.style}", deco_action, m.trust v.log.deco_text
            m "p.mes_date", timer
)()


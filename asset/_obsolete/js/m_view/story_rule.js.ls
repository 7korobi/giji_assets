doc.view.story_rule = ({event, story})->
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

stories =
  controller: (v)->
    v
  view: (v)->
    m "tbody",
      if v.error
        m "tr",
          m "td[colspan=6]", v.error
      else
        Mem.storys[v.mestype]().list().map (v)->
          chr_set = Mem.chr_sets.find(v.csid)
          m "tr",
            m "td",
              v.vid
              m 'a[href="#{v.link}"]', v.name
              m "span.note",
                m "br"
                "〈"
                m 'a[href="#{v.link}"]', "最新"
                "〉"
                if v.entry_limit == "password"
                  m 'img[src="#{GUI.img_head}/icon/key.png"][alt="[鍵]"]'
              v.view.rating
              m "span.note",
                m "br"
                "　　人物 ： #{chr_set.caption}"
                m "br"
                "　　更新 ： #{v.view.updated_at} #{v.view.update_interval}毎"
                m "br"
                "　 "
            m "td.small",
              v.player_count
              m "span.note", m "br"
              "#{v.status}"
            m "td"
              m "span.note",
                v.view.say_limit_help
              v.view.game_rule
              m "span.note",
                m "br"
                v.trs


doc.message.stories = (v)->
  m ".paragraph",
    m "table.vindex",
      m "thead",
        m "tr",
          m "td", "id"
          m "td", "村の名前"
          m "td", "人数"
          m "td", "進行"
          m "td", "ルール"
          m "td", "制限"
      m.component stories, v

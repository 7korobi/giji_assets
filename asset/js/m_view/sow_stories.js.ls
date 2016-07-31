doc.view.sow_stories = (v)->
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
      m "tbody",
        if v.error
          m "tr",
            m "td[colspan=6]", v.error
        else
          Mem.Query.storys[v.mestype]().list.map (v)->
            chr_set = Mem.Query.chr_sets.hash[v.csid] || Mem.Query.chr_sets.where(csid: v.csid).list.first
            m "tr",
              m "td",
                v.vid
              m "td",
                m 'a', {href: v.link}, v.name
                m "span.note",
                  m "br"
                  "〈"
                  m 'a', {href: v.link}, "最新"
                  "〉"
                  if v.entry_limit == "password"
                    m 'img[src="#{GUI.img_head}/icon/key.png"][alt="[鍵]"]'
                v.view.rating
                m "span.note",
                  m "br"
                  "　　人物 ： #{chr_set.label}"
                  m "br"
                  "　　更新 ： #{v.view.update_at} #{v.view.update_interval}毎"
                  m "br"
                  "　 "
              m "td",
                v.player_count
              m "td",
                "#{v.status}"
              m "td",
                v.trs
                m "br"
                v.view.game_rule
              m "td",
                m "span.note",
                  v.view.say_limit_help

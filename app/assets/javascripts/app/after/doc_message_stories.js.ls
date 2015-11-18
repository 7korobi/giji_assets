stories =
  controller: (v)->
    v
  view: (v)->
    m "tbody",
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
  m "table.vindex",
    m.component stories, v

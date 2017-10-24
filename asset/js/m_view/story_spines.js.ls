doc.view.story_spines = ({_id, link, name, view})->
  header = m "div",
    m "a",
      href: "http://giji.f5.si#{link}"
    , m "code.icon-download"
    m "a",
      href: "http://7korobi.gehirn.ne.jp/stories/#{_id}.html"
    , m "code.icon-download"
    m "kbd.note",
      _id
    m "a",
      href: "http://s3-ap-northeast-1.amazonaws.com/giji-assets/stories/#{_id}"
    , m.trust name
    m "kbd",
      view.rating

  m "tr", {key: _id },
    if menu.icon.state() == "resize-full"
      m "td",
        header
        m "table.detail",
          m "tbody",
            m "tr",
              m "th", "更新"
              m "td", "#{view.update_at} #{view.update_interval}"
            m "tr",
              m "th", "規模"
              m "td", "#{view.player_length}人 #{view.say_limit}"
            m "tr",
              m "th", "ルール"
              m "td", "#{view.game_rule}"
        m ".list", view.role_cards
        m ".list", view.trap_cards

    else
      m "td",
        header

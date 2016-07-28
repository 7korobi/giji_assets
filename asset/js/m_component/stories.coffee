doc.component.stories =
  controller: ->
  view: ->
    query = Mem.Query.storys.menu(Url.params.folder, Url.conf.stories.values()...)
    m ".paragraph",
      menu.input.icon.item "search",
        className: "glass tooltip-right"
      m "table.vindex",
        m "thead",
          m "tr",
            m "th"
        win.scroll.pager "tbody", query.list, (o)->
          header = m "div",
            m "a",
              href: "http://giji.check.jp#{o.link}"
            , m "code.icon-download"
            m "a",
              href: "http://7korobi.gehirn.ne.jp/stories/#{o._id}.html"
            , m "code.icon-download"
            m "kbd.note",
              o._id
            m "a",
              href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/#{o._id}"
            , m.trust o.name
            m "kbd",
              o.view.rating

          m "tr", {key: o._id },
            if menu.params.icon == "resize-full"
              m "td",
                header
                m "table.detail",
                  m "tbody",
                    m "tr",
                      m "th", "更新"
                      m "td", "#{o.view.update_at} #{o.view.update_interval}"
                    m "tr",
                      m "th", "規模"
                      m "td", "#{o.view.player_length}人 #{o.view.say_limit}"
                    m "tr",
                      m "th", "ルール"
                      m "td", "#{o.view.game_rule}"
                m ".list", o.view.role_cards
                m ".list", o.view.trap_cards

            else
              m "td",
                header

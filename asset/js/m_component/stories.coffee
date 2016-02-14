doc.component.stories =
  controller: ->
  view: ->
    query = Mem.storys.menu(Url.prop.folder(), Url.routes.search.stories.values()...)
    m ".paragraph",
      menu.icon.icon "search",
        deploy: (main_menu)->
          main_menu.drill "rating",
            caption: "こだわり"
            view: (sub_menu)->
              reduce = Mem.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(rating: "all")...).reduce
              m ".paragraph",
                sub_menu.radio {class:"edge rating"}, Url.prop.rating, reduce, "rating", (key, o)->
                  m "span",
                    m "img.pull-left",
                      src: GUI.img_head + "/icon/cd_#{o.min_is.rating}.png"
                    Mem.conf.rating[key].caption
          main_menu.drill "game",
            caption: "ルール"
            view: (sub_menu)->
              reduce = Mem.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(game: "all")...).reduce
              m ".paragraph",
                sub_menu.radio {class:"edge game"}, Url.prop.game, reduce, "game", (key, o)->
                  o.min_is.view.game_rule
          main_menu.drill "folder",
            caption: "州"
            view: (sub_menu)->
              reduce = Mem.storys.menu("all", Url.routes.search.stories.values()...).reduce
              m ".paragraph",
                sub_menu.radio {class:"edge folder"}, Url.prop.folder, reduce, "folder", (key, o)->
                  CONF_FOLDER[key]?.nation
          main_menu.drill "say_limit",
            caption: "発言制限"
            view: (sub_menu)->
              reduce = Mem.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(say_limit: "all")...).reduce
              m ".paragraph",
                sub_menu.radio {class:"edge say_limit"}, Url.prop.say_limit, reduce, "say_limit", (key, o)->
                  o.min_is.view.say_limit
          main_menu.drill "update_at",
            caption: "更新時刻"
            view: (sub_menu)->
              reduce = Mem.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(update_at: "all")...).reduce
              m ".paragraph",
                sub_menu.radio {class:"edge update_at"}, Url.prop.update_at, reduce, "update_at", (key, o)->
                  o.min_is.view.update_at
          main_menu.drill "update_interval",
            caption: "更新間隔"
            view: (sub_menu)->
              reduce = Mem.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(update_interval: "all")...).reduce
              m ".paragraph",
                sub_menu.radio {class:"edge update_interval"}, Url.prop.update_interval, reduce, "update_interval", (key, o)->
                  o.min_is.view.update_interval
          main_menu.drill "event_type",
            caption: "事件"
            view: (sub_menu)->
              reduce = Mem.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(event_type: "all")...).reduce
              m ".paragraph",
                sub_menu.radio {class:"edge event_type"}, Url.prop.event_type, reduce, "event_type", (key, o)->
                  key
          main_menu.drill "role_type",
            caption: "役職"
            view: (sub_menu)->
              reduce = Mem.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(role_type: "all")...).reduce
              m ".paragraph",
                sub_menu.radio {class:"edge role_type"}, Url.prop.role_type, reduce, "role_type", (key, o)->
                  key
          main_menu.drill "player_length",
            caption: "人数"
            view: (sub_menu)->
              reduce = Mem.storys.menu(Url.prop.folder(), Url.routes.search.stories.values(player_length: "all")...).reduce
              m ".paragraph",
                sub_menu.radio {class:"edge player_length"}, Url.prop.player_length, reduce, "player_length", (key, o)->
                  o.min_is.view.player_length + "人"

        view: (main_menu)->
          m ".paragraph",
            m "h6", "検索する。"
            m "input.mini", Txt.input(Url.prop.search)
            main_menu.drills {}, ["folder", "game", "event_type", "role_type", "rating", "say_limit", "player_length", "update_at", "update_interval"]

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
            if menu.icon.state() == "resize-full"
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

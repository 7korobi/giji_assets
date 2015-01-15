GUI.if_exist "#headline", (dom)->
  touch = new GUI.TouchMenu()
  touch.state "finish"

  m.module dom,
    controller: ->
    view: ->
      max_vage    = GAME.PERJURY.config.cfg.MAX_VILLAGES
      max_crazy   = GAME.CRAZY  .config.cfg.MAX_VILLAGES
      max_xebec   = GAME.XEBEC  .config.cfg.MAX_VILLAGES
      max_ciel    = GAME.CIEL   .config.cfg.MAX_VILLAGES
      max_cafe    = GAME.CABALA .config.cfg.MAX_VILLAGES
      max_pan     = GAME.PAN    .config.cfg.MAX_VILLAGES
      max_morphe  = GAME.MORPHE .config.cfg.MAX_VILLAGES
      max_all     = ( max_vage + max_crazy + max_xebec + max_ciel )
      max_all    += ( max_cafe + max_morphe )

      m ".choice",
        m "table.board",
          if "progress" == touch.state()
            m "tr",
              m "th.choice[colspan=2]", {key: "p"},
                m "strong", "進行中の村"
              m "th.no_choice[colspan=2]", {key: "f"},
                m "a", touch.start("finish"), "終了した村を見る"
          if "finish" == touch.state()
            m "tr",
              m "th.no_choice[colspan=2]", {key: "p"},
                m "a", touch.start("progress"), "進行中の村を見る"
              m "th.choice[colspan=2]", {key: "f"},
                m "strong", "終了した村"
          m "tr",
            m "th.choice", "ロビー"
            m "th.choice", "夢の形"
            m "th.choice", "陰謀"
            m "th.choice", "ＲＰ"
          if "progress" == touch.state()
            m "tr",
              m "td.no_choice", {key: "L"},
                m "a",
                  href: GAME.LOBBY.config.cfg.URL_SW + "/sow.cgi"
                , "lobby"
                m "br"
                "offparty"
                m "br"
                m "br"
                m "br"
                m "br"
                m "br"
              m "td.no_choice", {key: "D"},
                "#{max_morphe}村:"
                m "a",
                  href: GAME.MORPHE.config.cfg.URL_SW + "/sow.cgi"
                , "morphe"
                m "br"
                "#{max_cafe}村:"
                m "a",
                  href: GAME.CABALA.config.cfg.URL_SW + "/sow.cgi"
                , "cafe"
                m "br"
                m "br"
                m "br"
                m "br"
                m "br"
              m "td.no_choice", {key: "C"},
                "wolf"
                m "br"
                "ultimate"
                m "br"
                "allstar"
                m "br"
                m "br"
                m "br"
                m "br"
              m "td.no_choice", {key: "R"},
                "role-play"
                m "br"
                "RP-advance"
                m "br"
                "#{max_vage}村:"
                m "a",
                  href: GAME.PERJURY.config.cfg.URL_SW + "/sow.cgi"
                , "perjury"
                m "br"
                "#{max_xebec}村:"
                m "a",
                  href: GAME.XEBEC.config.cfg.URL_SW + "/sow.cgi"
                , "xebec"
                m "br"
                "#{max_crazy}村:"
                m "a",
                  href: GAME.CRAZY.config.cfg.URL_SW + "/sow.cgi"
                , "crazy"
                m "br"
                "#{max_ciel}村:"
                m "a",
                  href: GAME.CIEL.config.cfg.URL_SW + "/sow.cgi"
                , "ciel"
          if "finish" == touch.state()
            m "tr",
              m "td.no_choice", {key: "P"},
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=LOBBY"
                , "lobby"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=OFFPARTY"
                ,"offparty"
                m "br"
                m "br"
                m "br"
                m "br"
                m "br"
              m "td.no_choice", {key: "D"},
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=MORPHE"
                , "morphe"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=CABALA"
                , "cafe"
                m "br"
                m "br"
                m "br"
                m "br"
                m "br"
              m "td.no_choice", {key: "C"},
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=WOLF"
                , "wolf"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=ULTIMATE"
                , "ultimate"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=ALLSTAR"
                , "allstar"
                m "br"
                m "br"
                m "br"
                m "br"
              m "td.no_choice", {key: "R"},
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=RP"
                , "role-play"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=PRETENSE"
                , "advance"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=PERJURY"
                , "perjury"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=XEBEC"
                , "xebec"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=CRAZY"
                , "crazy"
                m "br"
                m "a",
                  href: "http://7korobi.gehirn.ne.jp/stories/all?folder=CIEL"
                , "ciel"

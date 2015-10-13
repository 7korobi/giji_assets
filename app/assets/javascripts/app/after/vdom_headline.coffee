head_menu = (state)->
  max_vage    = GAME.PERJURY.config.cfg.MAX_VILLAGES
  max_crazy   = GAME.CRAZY  .config.cfg.MAX_VILLAGES
  max_xebec   = GAME.XEBEC  .config.cfg.MAX_VILLAGES
  max_ciel    = GAME.CIEL   .config.cfg.MAX_VILLAGES
  max_cafe    = GAME.CABALA .config.cfg.MAX_VILLAGES
  max_pan     = GAME.PAN    .config.cfg.MAX_VILLAGES
  max_morphe  = GAME.MORPHE .config.cfg.MAX_VILLAGES
  max_all     = ( max_vage + max_crazy + max_xebec + max_ciel )
  max_all    += ( max_cafe + max_morphe )

  top_line_attr =
    style: "height: 4em; vertical-align: bottom;"

  m "table.board#headline",
    m "thead",
      if "progress" == state()
        m "tr", top_line_attr,
          m "th.choice[colspan=2]", {key: "p"},
            m "strong", "進行中の村"
          m "th[colspan=2]", {key: "f"},
            m "a", Btn.set({}, state, "finish"), "終了した村を見る"
      if "finish" == state()
        m "tr", top_line_attr,
          m "th[colspan=2]", {key: "p"},
            m "a", Btn.set({}, state, "progress"), "進行中の村を見る"
          m "th.choice[colspan=2]", {key: "f"},
            m "strong", "終了した村"
      m "tr",
        m "th.choice", "ロビー"
        m "th.choice", "夢の形"
        m "th.choice", "陰謀"
        m "th.choice", "ＲＰ"
    if "progress" == state()
      m "tbody",
        m "tr",
          m "td",
            m "a",
              href: GAME.LOBBY.config.cfg.URL_SW + "/sow.cgi"
            , "lobby"
            m "br"
            "offparty"

          m "td",
            "#{max_morphe}村:"
            m "a",
              href: GAME.MORPHE.config.cfg.URL_SW + "/sow.cgi"
            , "morphe"
            m "br"
            "#{max_cafe}村:"
            m "a",
              href: GAME.CABALA.config.cfg.URL_SW + "/sow.cgi"
            , "cafe"

          m "td",
            "wolf"
            m "br"
            "ultimate"
            m "br"
            "allstar"

          m "td",
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
    if "finish" == state()
      m "tbody",
        m "tr",
          m "td",
            m "a",
              href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=LOBBY"
            , "lobby"
            m "br"
            m "a",
              href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=OFFPARTY"
            ,"offparty"

          m "td",
            m "a",
              href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=MORPHE"
            , "morphe"
            m "br"
            m "a",
              href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=CABALA"
            , "cafe"

          m "td",
            m "a",
              href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=WOLF"
            , "wolf"
            m "br"
            m "a",
              href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=ULTIMATE"
            , "ultimate"
            m "br"
            m "a",
              href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=ALLSTAR"
            , "allstar"

          m "td",
            m "a",
              href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=RP"
            , "role-play"
            m "br"
            m "a",
              href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=PRETENSE"
            , "advance"
            m "br"
            m "a",
              href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=PERJURY"
            , "perjury"
            m "br"
            m "a",
              href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=XEBEC"
            , "xebec"
            m "br"
            m "a",
              href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=CRAZY"
            , "crazy"
            m "br"
            m "a",
              href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=CIEL"
            , "ciel"

GUI.if_exist "#head_navi", (dom)->
  state = m.prop "finish"
  m.mount dom,
    controller: ->
    view: ->
      m ".paragraph",
        m ".left_image"
        m ".right_image"
        head_menu state

GUI.if_exist "#headline", (dom)->
  state = m.prop "finish"
  m.mount dom,
    controller: ->
    view: ->
      m ".choice",
        head_menu state


GUI.if_exist "#to_root", (dom)->
  m.mount dom,
    controller: ->
      hour = 1000 * 60 * 60

      GUI.do_tick (now)=>
        zone = now + 3*hour # means - 6hours base. (GMT is - 9 hours)
        @day_or_night = Math.floor(zone / (12*hour)) % 2

        m.redraw()
        12*hour - zone % (12*hour)
      return

    view: (c)->
      width = Url.prop.h1_width?()
      width?= 458
      m "a",
        href: "//giji.check.jp/"
        GUI.title width, Url.prop.theme(), c.day_or_night

doc.component.header =
  controller: ->
    @params = {}
    @g = new win.gesture {}
    @form = Mem.Query.options.form @params, ["header_state"], @g
    return

  view: ({form, params})->
    max_vage    = Mem.conf.folder.PERJURY.config.cfg.MAX_VILLAGES
    max_crazy   = Mem.conf.folder.CRAZY  .config.cfg.MAX_VILLAGES
    max_xebec   = Mem.conf.folder.XEBEC  .config.cfg.MAX_VILLAGES
    max_ciel    = Mem.conf.folder.CIEL   .config.cfg.MAX_VILLAGES
    max_cafe    = Mem.conf.folder.CABALA .config.cfg.MAX_VILLAGES
    max_morphe  = Mem.conf.folder.MORPHE .config.cfg.MAX_VILLAGES
    max_all     = ( max_vage + max_crazy + max_xebec + max_ciel ) + ( max_cafe + max_morphe )
    max_pan     = Mem.conf.folder.PAN    .config.cfg.MAX_VILLAGES

    top_line_attr =
      style: "height: 4em; vertical-align: bottom;"

    m "table.board#headline",
      m "thead",
        switch params.header_state
          when "progress"
            m "tr", top_line_attr,
              m "th.choice[colspan=2]", {key: "p"},
                m "strong", "進行中の村"
              m "th[colspan=2]", {key: "f"},
                m "label.btn.edge",
                  form.header_state.field "finish"
                  "終了した村を見る"
          when "finish"
            m "tr", top_line_attr,
              m "th[colspan=2]", {key: "p"},
                m "label.btn.edge",
                  form.header_state.field "progress"
                  "進行中の村を見る"
              m "th.choice[colspan=2]", {key: "f"},
                m "strong", "終了した村"
        m "tr",
          m "th.choice", "ロビー"
          m "th.choice", "夢の形"
          m "th.choice", "陰謀"
          m "th.choice", "ＲＰ"
      switch params.header_state
        when "progress"
          m "tbody",
            m "tr",
              m "td",
                m "a",
                  href: Mem.conf.folder.LOBBY.config.cfg.URL_SW + "/sow.cgi"
                , "lobby"
                m "br"
                "offparty"

              m "td",
                "#{max_morphe}村:"
                m "a",
                  href: Mem.conf.folder.MORPHE.config.cfg.URL_SW + "/sow.cgi"
                , "morphe"
                m "br"
                "#{max_cafe}村:"
                m "a",
                  href: Mem.conf.folder.CABALA.config.cfg.URL_SW + "/sow.cgi"
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
                  href: Mem.conf.folder.PERJURY.config.cfg.URL_SW + "/sow.cgi"
                , "perjury"
                m "br"
                "#{max_xebec}村:"
                m "a",
                  href: Mem.conf.folder.XEBEC.config.cfg.URL_SW + "/sow.cgi"
                , "xebec"
                m "br"
                "#{max_crazy}村:"
                m "a",
                  href: Mem.conf.folder.CRAZY.config.cfg.URL_SW + "/sow.cgi"
                , "crazy"
                m "br"
                "#{max_ciel}村:"
                m "a",
                  href: Mem.conf.folder.CIEL.config.cfg.URL_SW + "/sow.cgi"
                , "ciel"
        when "finish"
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

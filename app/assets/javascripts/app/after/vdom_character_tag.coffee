
GUI.if_exist "#character_tag", (dom)->
  vdom = (name, val)->
    [ m "span", name
      m "span.emboss.pull-right", val
    ]
  tag_dom = (type)->
    vdom Mem.conf.tag[type].name, Mem.faces.reduce.tag[type].count

  m.mount dom,
    controller: ->
    view: ->
      {tag} = Url.prop
      chrs = Mem.faces.tag(tag()).list
      set = Mem.conf.tag[tag()]

      [ menu.icon.icon "th-large",
          view: (main_menu)->
            m ".paragraph",
              m "h6", "タグを選んでみよう"
              Btns.radio {class: "edge"}, tag,
                all:       vdom "- 全体 -", Mem.faces.reduce.all.all.count
                giji:      tag_dom "giji"
                shoji:     tag_dom "shoji"
                travel:    tag_dom "travel"
                stratos:   tag_dom "stratos"
                myth:      tag_dom "myth"
                asia:      tag_dom "asia"
                marchen:   tag_dom "marchen"

                kid:       tag_dom "kid"
                young:     tag_dom "young"
                middle:    tag_dom "middle"
                elder:     tag_dom "elder"

                river:     tag_dom "river"
                road:      tag_dom "road"
                immoral:   tag_dom "immoral"

                guild:     tag_dom "guild"
                elegant:   tag_dom "elegant"
                ecclesia:  tag_dom "ecclesia"

                medical:   tag_dom "medical"
                market:    tag_dom "market"

                apartment: tag_dom "apartment"
                servant:   tag_dom "servant"
                farm:      tag_dom "farm"
                government:tag_dom "government"

                god:       tag_dom "god"

        m ".chrlist",
          m "div",
            m "h6",
              set.long
            m ".GSAY.badge",
              set.name
            "の#{chrs.length}人を表示しています。"
          m "hr.black"
          for o in chrs
            chr_job = Mem.chr_jobs.find("#{set.chr_set_ids.last}_#{o._id}") || Mem.chr_jobs.find("all_#{o._id}")
            job_name = chr_job.job

            attr = GUI.attrs {}, ->
              @click ->


            m ".chrbox", {key: o._id},
              GUI.portrate o._id, attr
              m ".chrblank.line2",
                m "div", job_name
                m "div", o.name
          m "hr.black"
      ]

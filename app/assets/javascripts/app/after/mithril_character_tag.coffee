
GUI.if_exist "#character_tag", (dom)->
  tag = m.prop()
  tag "all"

  vdom = (name, val)->
    [ m "span", name
      m "span.emboss.pull-right", val
    ]

  m.mount dom,
    controller: ->
    view: ->
      chrs = Cache.faces.tag(tag()).list()
      set = RAILS.tag[tag()]

      [ menu.icon.icon "th-large",
          view: (main_menu)->
            m ".paragraph.guide",
              m "h6", "タグを選んでみよう"
              Btns.radio {class: "edge"}, tag,
                all:       vdom "- 全体 -",               Cache.faces.reduce().all.all.count
                giji:      vdom RAILS.tag.giji.name,      Cache.faces.reduce().tag.giji.count
                shoji:     vdom RAILS.tag.shoji.name,     Cache.faces.reduce().tag.shoji.count
                travel:    vdom RAILS.tag.travel.name,    Cache.faces.reduce().tag.travel.count
                stratos:   vdom RAILS.tag.stratos.name,   Cache.faces.reduce().tag.stratos.count
                myth:      vdom RAILS.tag.myth.name,      Cache.faces.reduce().tag.myth.count
                asia:      vdom RAILS.tag.asia.name,      Cache.faces.reduce().tag.asia.count
                marchen:   vdom RAILS.tag.marchen.name,   Cache.faces.reduce().tag.marchen.count

                kid:       vdom RAILS.tag.kid.name,       Cache.faces.reduce().tag.kid.count
                young:     vdom RAILS.tag.young.name,     Cache.faces.reduce().tag.young.count
                middle:    vdom RAILS.tag.middle.name,    Cache.faces.reduce().tag.middle.count
                elder:     vdom RAILS.tag.elder.name,     Cache.faces.reduce().tag.elder.count

                river:     vdom RAILS.tag.river.name,     Cache.faces.reduce().tag.river.count
                road:      vdom RAILS.tag.road.name,      Cache.faces.reduce().tag.road.count
                immoral:   vdom RAILS.tag.immoral.name,   Cache.faces.reduce().tag.immoral.count

                guild:     vdom RAILS.tag.guild.name,     Cache.faces.reduce().tag.guild.count
                elegant:   vdom RAILS.tag.elegant.name,   Cache.faces.reduce().tag.elegant.count
                ecclesia:  vdom RAILS.tag.ecclesia.name,  Cache.faces.reduce().tag.ecclesia.count

                medical:   vdom RAILS.tag.medical.name,   Cache.faces.reduce().tag.medical.count
                market:    vdom RAILS.tag.market.name,    Cache.faces.reduce().tag.market.count

                apartment: vdom RAILS.tag.apartment.name, Cache.faces.reduce().tag.apartment.count
                servant:   vdom RAILS.tag.servant.name,   Cache.faces.reduce().tag.servant.count
                farm:      vdom RAILS.tag.farm.name,      Cache.faces.reduce().tag.farm.count
                government:vdom RAILS.tag.government.name,Cache.faces.reduce().tag.government.count

                god:       vdom RAILS.tag.god.name,       Cache.faces.reduce().tag.god.count

        m ".chrlist",
          m "div",
            m "h6", 
              set.long
            m ".GSAY.badge",
              set.name
            "の#{chrs.length}人を表示しています。"
          m "hr.black"
          for o in chrs
            chr_job = Cache.chr_jobs.find("#{set.chr_set_ids.last}_#{o._id}") || Cache.chr_jobs.find("all_#{o._id}")
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
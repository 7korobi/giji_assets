
GUI.if_exist "#character_tag", (dom)->
  vdom = (name, val)->
    [ m "span", name
      m "span.emboss.pull-right", val
    ]

  m.mount dom,
    controller: ->
    view: ->
      {tag} = Url.prop
      chrs = Mem.faces.tag(tag()).list()
      set = RAILS.tag[tag()]

      [ menu.icon.icon "th-large",
          view: (main_menu)->
            m ".paragraph",
              m "h6", "タグを選んでみよう"
              Btns.radio {class: "edge"}, tag,
                all:       vdom "- 全体 -",               Mem.faces.reduce().all.all.count
                giji:      vdom RAILS.tag.giji.name,      Mem.faces.reduce().tag.giji.count
                shoji:     vdom RAILS.tag.shoji.name,     Mem.faces.reduce().tag.shoji.count
                travel:    vdom RAILS.tag.travel.name,    Mem.faces.reduce().tag.travel.count
                stratos:   vdom RAILS.tag.stratos.name,   Mem.faces.reduce().tag.stratos.count
                myth:      vdom RAILS.tag.myth.name,      Mem.faces.reduce().tag.myth.count
                asia:      vdom RAILS.tag.asia.name,      Mem.faces.reduce().tag.asia.count
                marchen:   vdom RAILS.tag.marchen.name,   Mem.faces.reduce().tag.marchen.count

                kid:       vdom RAILS.tag.kid.name,       Mem.faces.reduce().tag.kid.count
                young:     vdom RAILS.tag.young.name,     Mem.faces.reduce().tag.young.count
                middle:    vdom RAILS.tag.middle.name,    Mem.faces.reduce().tag.middle.count
                elder:     vdom RAILS.tag.elder.name,     Mem.faces.reduce().tag.elder.count

                river:     vdom RAILS.tag.river.name,     Mem.faces.reduce().tag.river.count
                road:      vdom RAILS.tag.road.name,      Mem.faces.reduce().tag.road.count
                immoral:   vdom RAILS.tag.immoral.name,   Mem.faces.reduce().tag.immoral.count

                guild:     vdom RAILS.tag.guild.name,     Mem.faces.reduce().tag.guild.count
                elegant:   vdom RAILS.tag.elegant.name,   Mem.faces.reduce().tag.elegant.count
                ecclesia:  vdom RAILS.tag.ecclesia.name,  Mem.faces.reduce().tag.ecclesia.count

                medical:   vdom RAILS.tag.medical.name,   Mem.faces.reduce().tag.medical.count
                market:    vdom RAILS.tag.market.name,    Mem.faces.reduce().tag.market.count

                apartment: vdom RAILS.tag.apartment.name, Mem.faces.reduce().tag.apartment.count
                servant:   vdom RAILS.tag.servant.name,   Mem.faces.reduce().tag.servant.count
                farm:      vdom RAILS.tag.farm.name,      Mem.faces.reduce().tag.farm.count
                government:vdom RAILS.tag.government.name,Mem.faces.reduce().tag.government.count

                god:       vdom RAILS.tag.god.name,       Mem.faces.reduce().tag.god.count

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


GUI.if_exist "#character_tag", (dom)->
  tag = m.prop()
  tag "all"

  vdom = (name, val)->
    [ m "span", name
      m "span.emboss.pull-right", val
    ]

  m.module dom,
    controller: ->
    view: ->
      chrs = Cache.faces.tag(tag()).list()

      [ icon_menu.icon "th-large",
          view: (main_menu)->
            m ".paragraph.guide",
              m "h6", "タグを選んでみよう"
              Btns.radio {class: "edge"}, tag,
                all:       vdom "- 全体 -",               Cache.faces.reduce().all.all.count
                shoji:     vdom RAILS.tag.shoji.name,     Cache.faces.reduce().tag.shoji.count
                travel:    vdom RAILS.tag.travel.name,    Cache.faces.reduce().tag.travel.count
                stratos:   vdom RAILS.tag.stratos.name,   Cache.faces.reduce().tag.stratos.count
                myth:      vdom RAILS.tag.myth.name,      Cache.faces.reduce().tag.myth.count
                asia:      vdom RAILS.tag.asia.name,      Cache.faces.reduce().tag.asia.count
                marchen:   vdom RAILS.tag.marchen.name,   Cache.faces.reduce().tag.marchen.count

                apartment: vdom RAILS.tag.apartment.name, Cache.faces.reduce().tag.apartment.count
                elegant:   vdom RAILS.tag.elegant.name,   Cache.faces.reduce().tag.elegant.count
                guild:     vdom RAILS.tag.guild.name,     Cache.faces.reduce().tag.guild.count
                servant:   vdom RAILS.tag.servant.name,   Cache.faces.reduce().tag.servant.count
                market:    vdom RAILS.tag.market.name,    Cache.faces.reduce().tag.market.count
                immoral:   vdom RAILS.tag.immoral.name,   Cache.faces.reduce().tag.immoral.count
                medical:   vdom RAILS.tag.medical.name,   Cache.faces.reduce().tag.medical.count
                river:     vdom RAILS.tag.river.name,     Cache.faces.reduce().tag.river.count
                road:      vdom RAILS.tag.road.name,      Cache.faces.reduce().tag.road.count
                farm:      vdom RAILS.tag.farm.name,      Cache.faces.reduce().tag.farm.count
                ecclesia:  vdom RAILS.tag.ecclesia.name,  Cache.faces.reduce().tag.ecclesia.count
                government:vdom RAILS.tag.government.name,Cache.faces.reduce().tag.government.count
                god:       vdom RAILS.tag.god.name,       Cache.faces.reduce().tag.god.count

        m ".chrlist",
          m "div",
            m "h6", 
              RAILS.tag[tag()].long
            m ".GSAY.badge",
              RAILS.tag[tag()].name
            "の#{chrs.length}人を表示しています。"
          m "hr.black"
          for o in chrs
            chr_job = Cache.chr_jobs.find("all_#{o._id}")
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
doc.component.characters =
  controller: ->
    Url.tie.bundle Mem.conf.input.tag
    Url.conf.tag.current = true

    menu.input.icon.with "th-large", ->
      m ".paragraph",
        m "h6", "タグを選んでみよう"
        Url.tie.input.tag.field()
    return


  view: ->
    { input, params } = Url.tie
    { tag } = params
    chrs = Mem.Query.faces.tag(tag).list
    set = Mem.conf.tag[tag]

    [ menu.input.icon.with "th-large", false
      m ".chrlist",
        m "div",
          m "h6",
            set.long
          m ".GSAY.badge",
            set.label
          "の#{chrs.length}人を表示しています。"
        m "hr.black"
        for o in chrs
          chr_job = Mem.Query.chr_jobs.find("#{set.chr_set_ids.last}_#{o._id}") || Mem.Query.chr_jobs.find("all_#{o._id}")
          job_name = chr_job.job

          cb = ->
          attr =
            onmouseup: cb
            ontouchend: cb

          m ".chrbox", {key: o._id},
            GUI.portrate o._id, attr
            m ".chrblank.line2",
              m "div", job_name
              m "div", o.name
        m "hr.black"
    ]

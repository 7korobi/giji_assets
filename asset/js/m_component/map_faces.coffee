doc.component.map_faces =
  controller: ->
  view: ->
    {order, chr_set, search} = Url.prop
    map_order_set = Mem.conf.map_faces_order[order()]
    chrs = Mem.map_faces.active(order(), chr_set(), search()).list
    headline = ""

    if chrs?.length
      headline = [
        m ".GSAY.badge", Mem.chr_sets.find(chr_set()).caption
        "の#{chrs.length}人を、"
        m ".GSAY.badge", map_order_set.headline
        "回数で並べています"
      ]

    [ m "div", headline
      m "hr.black"
      for o in chrs
        chr_job = Mem.chr_jobs.find("#{chr_set()}_#{o.face_id}")
        job_name = chr_job.job

        attr = null
        attr_main = ->
          elem = null
          over = -> GUI.Animate.jelly.up elem
          out = -> GUI.Animate.jelly.down elem

          attr =
            onmouseover: over
            ontouchmove: over
            onmouseup:  out
            onmouseout: out

          config: (_elem)-> elem = _elem
          onmouseover: over
          ontouchmove: over
          onmouseup:  out
          onmouseout: out
          ontouchend: out

        m ".chrbox", {key: o._id},
          GUI.portrate o.face_id, attr_main()
          m ".chrblank.line4", attr,
            m "div", job_name
            m "div", o.face.name
            m "div",
              m "a.mark",
                href: "/map_reduce/faces/#{o.face_id}"
              , "#{map_order_set.caption} #{o.win.value[map_order_set.order]}回"
            m "div", "♥#{o.sow_auth_id.max_is}"
      m "hr.black"
    ]

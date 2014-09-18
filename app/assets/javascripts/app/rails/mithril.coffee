if gon?.map_reduce?.faces?
  Cache.rule.map_face.set gon.map_reduce.faces
  win.on.load.push ->
    chr_set = m.prop("all")
    map_order = m.prop("all")
    map_orders = (prop)->
      order = RAILS.map_faces_orders[prop]
      order.func = (o)-> o.win.value[order.caption] ||= 0
      Cache.rule.map_face.schema ->
        @order (o)-> - order.func(o)
      order

    m.module document.getElementById("map_faces"), 
      controller: ->
      view: ->
        map_order_set = map_orders(map_order())
        chrs = Cache.map_faces.chr_set[chr_set()]
        headline =
          if chrs
            "人気の #{chrs.length}キャラクター"
          else
            ""

        [ m "hr",
            style: "border-color:black;"
          m ".mark", headline
          _.map chrs, (o)->
            chr_job = Cache.chr_jobs.find["#{chr_set()}_#{o.face_id}"]
            job_name = chr_job.job
            face_name = o.face.name

            m ".chrbox", [
              m "img", 
                src: "http://7korobi.gehirn.ne.jp/images/portrate/#{o.face_id}.jpg"
              m ".chrblank", [
                m "div", job_name
                m "div", face_name
                m "div", 
                  m "a.mark",
                    href: "/map_reduce/faces/#{o.face_id}"
                  , "#{map_order_set.title} #{map_order_set.func(o)}回"
                m "div", "♥#{o.sow_auth_id.max_is}"
              ]
            ]
          m "hr",
            style: "border-color:black;"
        ]

    m.module document.getElementById("chr_sets"),
      controller: ->
      view: ->
        chr_sets = Cache.chr_sets.all
        [ m "label.input-block-level", "キャラセットを選んでみよう ☆ミ"
          m "select.form-control",
            onchange: m.withAttr "value", chr_set
            value: chr_set()
          , _.map chr_sets, (o)->
            m "option",
              value: o._id
            , o.caption
          m "div", _.map RAILS.map_faces_orders, (o, key)->
            m "a.mark",
              onclick: -> map_order key
            , o.caption
          m "select.form-control",
            onchange: m.withAttr "value", map_order
            value: map_order()
          , _.map RAILS.map_faces_orders, (o, key)->
            m "option",
              value: key
            , o.caption
        ]

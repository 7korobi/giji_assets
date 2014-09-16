if gon?.map_reduce?.faces?
  Cache.rule.map_face.set gon.map_reduce.faces
  $ ->
    chr_set = m.prop("all")
    map_order = m.prop("all")
    map_orders = (prop)->
      Cache.rule.map_face.schema ->
        @order (o)-> - map_order_hash[prop].func(o)
      map_order_hash[prop]

    map_order_hash =
      all:
        caption: "合計"
        title: "登場"
        func: (o)-> o.win.all 
      human:
        caption: "村人陣営"
        title: "村側"
        func: (o)-> o.win.value.村人陣営 || 0
      wolf:
        caption: "人狼陣営"
        title: "狼側"
        func: (o)-> o.win.value.人狼陣営 || 0
      enemy:
        caption: "敵側の人間"
        title: "敵側"
        func: (o)-> o.win.value.敵側の人間 || 0
      pixi:
        caption: "妖精"
        title: "妖精"
        func: (o)-> o.win.value.妖精 || 0
      other:
        caption: "その他"
        title: "その他"
        func: (o)-> o.win.value.その他 || 0

    m.module document.getElementById("map_faces"), 
      controller: ->
      view: (c)->
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
      view: (c)->
        chr_sets = Cache.chr_sets.all
        [ m "label.input-block-level", "キャラセットを選んでみよう ☆ミ"
          m "select.form-control",
            onchange: m.withAttr "value", chr_set
            value: chr_set()
          , _.map chr_sets, (o)->
            m "option",
              value: o._id
            , o.caption
          m "select.form-control",
            onchange: m.withAttr "value", map_order
            value: map_order()
          , _.map map_order_hash, (o, key)->
            m "option",
              value: key
            , o.caption
        ]

if gon?.map_reduce?.faces?
  Cache.rule.map_face.set gon.map_reduce.faces
  $ ->
    chr_set = m.prop("all")

    m.module document.getElementById("map_faces"), 
      controller: ->
      view: (c)->
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
                    href: "faces/#{o.face_id}"
                  , "登場 #{o.sow_auth_id.all}回"
                m "div", "♥#{o.sow_auth_id.max_is}"
              ]
            ]
          m "hr",
            style: "border-color:black;"
        ]

    m.module document.getElementById("chr_sets"),
      controller: ->
      view: (c)->
        sets = Cache.chr_sets.all
        [ m "label.input-block-level", "キャラセットを選んでみよう ☆ミ"
          m "select.form-control",
            onchange: m.withAttr "value", chr_set
            value: chr_set()
          , _.map sets, (o)->
            m "option",
              value: o._id
            , o.caption
        ]

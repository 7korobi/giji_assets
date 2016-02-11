if gon?.map_reduce?.faces?
  catch_gon.map_reduce_faces()

  win.mount "#map_faces", (dom)->
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
            attr_main = GUI.attrs {}, ->
              elem = null
              config = (_elem)-> elem = _elem
              over = -> GUI.Animate.jelly.up elem
              out = -> GUI.Animate.jelly.down elem
              @config config
              @over over
              @out out

              attr = GUI.attrs {}, ->
                @over over
                @out out

            m ".chrbox", {key: o._id},
              GUI.portrate o.face_id, attr_main
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

  win.mount "#chr_sets", (dom)->
      controller: ->
      view: ->
        menu.icon.icon "th-large",
          deploy: (main_menu)->
            main_menu.drill "order",
              caption: "並び順"
              view: ->
                for key, o of Mem.conf.map_faces_order
                  m "span", Btn.set({}, Url.prop.order, key), o.caption

            main_menu.drill "chr_set",
              caption: "キャラセット"
              view: (sub_menu)->
                sub_menu.radio {class: "chr_set"}, Url.prop.chr_set, Mem.map_faces.reduce, "chr_set", (key)->
                  Mem.chr_sets.find(key).caption

          view: (main_menu)->
            m ".paragraph",
              m "h6", "詳しく検索してみよう"
              m "input.small", Txt.input(Url.prop.search)
              m "span", "検索条件：キャラクター名 / 肩書き / プレイヤー "
              m "h6", "キャラセットを選んでみよう"
              main_menu.drills {}, ["order", "chr_set"]

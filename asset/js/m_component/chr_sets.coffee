doc.component.chr_sets =
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

doc.component.chr_sets =
  controller: ->
    tie = Mem.Query.options.btns Url.params, ["order", "search"]
    input = tie.input
    params = Url.params
    { params, input }

  view: ({params, input})->
    menu.icon.icon "th-large",
      deploy: (main_menu)->
        main_menu.drill "order",
          caption: "並び順"
          view: ->
            for key, o of Mem.conf.map_faces_order
              attr = g.menu key, params.order, {}
              m "span", attr, o.caption

        main_menu.drill "chr_set",
          caption: "キャラセット"
          view: (sub_menu)->
            sub_menu.radio {class: "chr_set"}, params.chr_set, Mem.Query.map_faces.reduce, "chr_set", (key)->
              Mem.Query.chr_sets.find(key).caption

      view: (main_menu)->
        m ".paragraph",
          m "h6", "詳しく検索してみよう"
          m "input.small", input.search.field()
          m "span", "検索条件：キャラクター名 / 肩書き / プレイヤー "
          m "h6", "キャラセットを選んでみよう"
          main_menu.drills {}, ["order", "chr_set"]

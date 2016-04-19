doc.component.potof_modes =
  controller: ->
    params = {}
    face = new win.gesture
      check: ({value})->
        params = Mem.unpack.Keys value
        Url.prop.potofs_hide params

    keys = new win.gesture
      check: ({value})->
        params[value] = ! params[value]
        Url.prop.potofs_hide params
    { face, keys, params }

  view: ({face, keys, params})->
    {potofs_desc, potofs_order, potofs_hide} = Url.prop
    potofs = Mem.Query.potofs.view(potofs_desc(), potofs_order()).list
    turn = win.scroll.center?.event?.turn || 0

    reset_key = (value)->
      now = Mem.pack.Keys params
      set = Mem.pack.Keys value
      keys.tap value,
        className:
          if now == set
            "active"
          else
            ""

    m ".minilist",
      m "h6", "キャラクターフィルタ"
      m "p",
        m "a", reset_key([]                        ), "全員表示"
        m "a", reset_key(Mem.Query.potofs.others() ), "参加者表示"
        m "a", reset_key(Mem.Query.potofs.potofs() ), "その他を表示"
        m "a", reset_key(Mem.Query.potofs.full()   ), "全員隠す"
      m "hr.black"

      for o in potofs
        m ".chrbox", {key: o._id},
          GUI.portrate o.face_id, face.tap o.face_id,
            className:
              if params[o.face_id]
                "filter-hide"
              else
                ""
          m ".bar.#{o.live}",
      m "hr.black"

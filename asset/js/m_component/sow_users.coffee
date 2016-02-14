doc.component.sow_users = 
  controller: ->
  view: ->
    face = Mem.map_face_detail
    letters = [
      m "p.name",
        m "b", face.name
      m "p.text",
        "全部で"
        m "span.mark", "#{face.sow_auth_ids.length}人"
        "が、"
        m "span.mark", "#{face.sow_auth_id.all}回"
        "登場しました。"
      for sow_auth_id in face.sow_auth_ids
        length = sow_auth_id[0].sjis_length
        width =
          switch
            when 17 < length
              14.45 # 16.45 = 3.8 * 4 + 1.25
            when 11 < length
              10.25 # 12.25 = 3.8 * 3 + 0.85
            else
               6.0  #  8.0  = 3.8 * 2 + 0.20
                    #  5.8  = 3.8 * 1 + 2.00
        GUI.inline_item -> [
          @right width, sow_auth_id[0]
          @right 2.0, "x" + sow_auth_id[1]
        ]
    ]
    m ".ADMIN.guide", win.scroll.mark("sow_users"), letters

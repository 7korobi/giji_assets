doc.component.villages =
  controller: ->
  view: ->
    face = Mem.map_face_detail
    letters = [
      m "p.name",
        m "b", face.name
      m "p.text",
        "全部で"
        m "span.mark", "#{face.folder.all}回"
        "登場しました。"
      for folder in face.folder.keys
        [ m "p.name",
            m "b", "#{folder} x#{face.folder.value[folder]}回"
          m "p.text",
            for story_id in face.story_id_of_folders[folder]
              GUI.inline_item ->
                @left 2.8 + folder.length * 0.65,
                  m "a",
                    href: "http://s3-ap-northeast-1.amazonaws.com/giji-assets/stories/#{story_id[0]}"
                  , story_id[0]
        ]
    ]
    m ".MAKER.guide", win.scroll.mark("villages"), letters

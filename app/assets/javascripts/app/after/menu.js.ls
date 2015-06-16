export menu =
  icon:  new GUI.MenuTree.Icon
  scope: new GUI.MenuTree

menu.icon.icon "cog",
  view: ->
    m ".paragraph.guide",
      m "h6", "スタイル"
      Btns.radio {}, Url.prop.theme,
        cinema: "煉瓦"
        star:   "蒼穹"
        night:  "闇夜"
        moon:   "月夜"
        wa:     "和の国"
      m "h6", "幅の広さ"
      Btns.radio {}, Url.prop.width,
        full: "最大"
        wide: "広域"
        std:  "普通"
      m "h6", "位置"
      Btns.radio {}, Url.prop.layout,
        left:   "左詰"
        center: "中央"
        right:  "右詰"
      m "h6", "位置"
      Btns.radio {}, Url.prop.font,
        large: "大判"
        novel: "明朝"
        std:   "ゴシック"
        small: "繊細"

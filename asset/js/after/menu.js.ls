export menu =
  icon:  new MenuTree.Icon
  scope: new MenuTree

menu.icon.state  = Url.prop.icon
menu.scope.state = Url.prop.scope

menu.icon.icon "cog",
  view: ->
    m ".paragraph",
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
        std:  "狭域"
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

/*
map_reduce
  menu.tree
  menu.tree
    icon th-large:
      drill order:
        radio all:
        radio human:
        radio wolf:
        radio enemy:
        radio pixi:
        radio other:
      drill chr_set:
        radio Mem.Query.map_faces.reduce
    icon cog:


character_tag
  menu.tree
  menu.tree
    icon th-large:
      drill ***:
    icon cog:

in_story
  menu.tree
    node full:
    node normal:
  menu.tree
    icon resie-full:
    icon resize-normal:
    icon search:
    icon resie-full:
    icon resize-normal:
    icon search:
      drill rating:
      drill game:
      drill folder:
      drill say_limit:
      drill update_at:
      drill update_interval:
      drill event_type:
      drill role_type:
      drill player_length:
    icon cog:

in_vil
  menu.tree
    node home:
    node talk:
    node memo:
    node history:
    node pins:
  menu.tree
    icon pin:
    icon home:
    icon mail:
    icon chat-alt:
    icon clock:
    icon search:
    icon pencil:
    icon cog:
*/

export menu =
  icon:  new MenuTree.Icon
  scope: new MenuTree

menu.icon.state  = Url.prop.icon
menu.scope.state = Url.prop.scope


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

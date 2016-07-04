btn_data = (type)->
  _id: type
  name:  Mem.conf.tag[type].name
  badge: Mem.Query.faces.reduce.tag[type].count


h = Mem.Query.inputs.hash
h.role_table.options = Mem.Query.role_tables.enable().hash
h.game_rule.options = Mem.Query.rules.enable().hash
h.say_count.options = Mem.Query.says.enable().hash
h.mob_type.options = Mem.Query.roles.mob().hash
h.chr_npc.group_by = (o)-> o.chr_npcs().hash
h.chr_npc.options = Mem.Query.chr_npcs.hash
h.chr_set.options = h.chr_npc.groups = Mem.Query.chr_sets.hash
h.rating.options = Mem.Query.ratings.enable().hash
h.trs_type.options = Mem.Query.trss.enable().hash


h.tag.options =
  all:
    _id: "all"
    name: "- 全体 -"
    badge: Mem.Query.faces.reduce.all.all.count
  giji:      btn_data "giji"
  shoji:     btn_data "shoji"
  travel:    btn_data "travel"
  stratos:   btn_data "stratos"
  myth:      btn_data "myth"
  asia:      btn_data "asia"
  marchen:   btn_data "marchen"

  kid:       btn_data "kid"
  young:     btn_data "young"
  middle:    btn_data "middle"
  elder:     btn_data "elder"

  river:     btn_data "river"
  road:      btn_data "road"
  immoral:   btn_data "immoral"

  guild:     btn_data "guild"
  elegant:   btn_data "elegant"
  ecclesia:  btn_data "ecclesia"

  medical:   btn_data "medical"
  market:    btn_data "market"

  apartment: btn_data "apartment"
  servant:   btn_data "servant"
  farm:      btn_data "farm"
  government:btn_data "government"

  god:       btn_data "god"

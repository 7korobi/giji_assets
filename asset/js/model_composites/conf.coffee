field = Mem.Query.options.hash
field.role_table.options = Mem.Query.role_tables.enable().hash
field.game_rule.options = Mem.Query.rules.enable().hash
field.say_count.options = Mem.Query.says.enable().hash
field.mob_type.options = Mem.Query.roles.mob().hash
field.chr_npc.group_by = (o)-> o.chr_npcs().hash
field.chr_npc.options = Mem.Query.chr_npcs.hash
field.chr_set.options = field.chr_npc.groups = Mem.Query.chr_sets.hash
field.rating.options = Mem.Query.ratings.enable().hash
field.trs_type.options = Mem.Query.trss.enable().hash

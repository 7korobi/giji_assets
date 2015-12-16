field = Mem.options.hash
field.role_table.options = Mem.role_tables.enable().hash
field.game_rule.options = Mem.rules.enable().hash
field.say_count.options = Mem.says.enable().hash
field.mob_type.options = Mem.roles.mob().hash
field.chr_npc.group_by = (o)-> o.chr_npcs().hash
field.chr_npc.options = Mem.chr_npcs.hash
field.chr_set.options = field.chr_npc.groups = Mem.chr_sets.hash
field.rating.options = Mem.ratings.enable().hash

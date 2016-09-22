
win.mount "#new_chrs_2015_04", (dom)->
  controller: ->
    chrs = Mem.Query.chr_jobs.where(chr_set_id:"time").sort("face.order").list
    @old_chrs = chrs[0..23]
    @new_chrs = chrs[24..-1]
    return

  view: doc.component.map_faces_new.view


win.mount "#new_chrs_2016_05", (dom)->
  controller: ->
    chrs = Mem.Query.chr_jobs.where(chr_set_id:"sf").sort("face.order").list
    @old_chrs = chrs[0..31]
    @new_chrs = chrs[32..]
    return

  view: doc.component.map_faces_new.view


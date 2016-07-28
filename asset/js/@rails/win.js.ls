win.mount "#css_changer", (dom)->
  controller: -> Url.tie
  view: doc.view.css_changer

win.mount \#chr_name_lists, -> doc.component.chr_name_lists

if gon?.face?
  catch_gon.face()
  win.mount "#summary", -> doc.component.summary
  win.mount "#calc", -> doc.component.calc
  win.mount "#village", -> doc.component.villages
  win.mount "#sow_user", -> doc.component.sow_users

if gon?.map_reduce?.faces?
  catch_gon.map_reduce_faces()
  win.mount "#map_faces", -> doc.component.map_faces
  win.mount "#chr_sets", -> doc.component.chr_sets

if gon?.new_chr_faces? && gon?.new_chr_jobs?
  catch_gon.new_chrs()
  win.mount "#map_faces", (dom)-> doc.component.map_faces_new

chr_box = (o)->
  attr = GUI.attrs {}, ->
    elem = null
    @over -> GUI.Animate.jelly.up elem
    @out ->  GUI.Animate.jelly.down elem
    @config (_elem)-> elem = _elem

  m ".chrbox", { key: o._id },
    GUI.portrate o.face_id, attr
    m ".chrblank",
      m "div", m.trust o.job
      m "div", m.trust o.face.name


doc.component.map_faces_new =
  controller: ->
    chrs = Mem.chr_jobs.where(chr_set_id:"time").sort(false, (o)-> o.face.order ).list
    @old_chrs = chrs[0..23]
    @new_chrs = chrs[24..-1]
    return

  view: ({old_chrs, new_chrs})->
    [
      m "h6", "参考文献"
      m "hr.black"
      m ".mark", "〜 新人さん歓迎パーティー 〜"
      m "h6", "いま記述のある新人さんの肩書、名前は仮のものです。"
      chr_box(o) for o in new_chrs
      m "h6", "歓迎する人達"
      chr_box(o) for o in old_chrs
      m "hr.black"
    ]
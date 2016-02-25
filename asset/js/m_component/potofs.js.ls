toggle_desc = (prop, desc, value)->
  reset = ->
    if prop() == value
      attr.className = "btn edge active"
    else
      attr.className = "btn edge"

  change = ->
    if prop() == value
      desc( ! desc() )
    prop value

  attr =
    className: ""
    onmouseup: change
    ontouchend: change

  ->
    reset()
    attr


doc.component.potofs =
  controller: !->
    { potofs_order, potofs_desc } = Url.prop
    @stat_at    = toggle_desc potofs_order, potofs_desc, "stat_at"
    @stat_type  = toggle_desc potofs_order, potofs_desc, "stat_type"
    @said_num   = toggle_desc potofs_order, potofs_desc, "said_num"
    @pt         = toggle_desc potofs_order, potofs_desc, "pt"
    @urge       = toggle_desc potofs_order, potofs_desc, "urge"
    @select     = toggle_desc potofs_order, potofs_desc, "select"
    @win_result = toggle_desc potofs_order, potofs_desc, "win_result"
    @win_side   = toggle_desc potofs_order, potofs_desc, "win_side"
    @role       = toggle_desc potofs_order, potofs_desc, "role"
    @text       = toggle_desc potofs_order, potofs_desc, "text"

  view: (c, wide_attr)->
    { potofs_order, potofs_desc, potofs_hide } = Url.prop
    m "section.table-swipe",
      m "table",
        m "tfoot",
          m "tr.center",
            m "th[colspan=2]", m "sup", "(スクロールします。)"
            m "th", m "a", c.stat_at(), "日程"
            m "th", m "a", c.stat_type(), "状態"
            m "th", m "a", c.said_num(), "発言"
            m "th", m "a", c.pt(), "残り"
            m "th", m "a", c.urge(), "促"
            m "th", m "span.icon-user", " "
            m "th", m "a", c.select(), "希望"
            m "th", m "a", c.win_result(), "勝敗"
            m "th", m "a", c.win_side(), "陣営"
            m "th", m "a", c.role(), "役割"
            m "th", m "a", c.text(), "補足"
        m "tbody.plane", wide_attr,
          for o in Mem.potofs.view(potofs_desc(), potofs_order()).list
            className =
              if potofs_hide()[o.face_id]
                "filter-hide"
              else
                ""
            m "tr", {className},
              m "th.#{o.live}.calc", {}, o.view.job
              m "th.#{o.live}", {}, o.name
              m "td.#{o.live}.calc", {}, o.view.stat_at
              m "td.#{o.live}", {}, o.view.stat_type
              m "td.#{o.live}.calc", {}, o.view.said_num
              m "td.#{o.live}.calc", {}, o.view.pt
              m "td.#{o.live}.center", {}, o.view.urge
              m "td.#{o.live}.center", {}, o.view.user_id
              m "td.#{o.live}.center", {}, o.view.select
              m "td.WIN_#{o.view.win}.center", {}, o.view.win_result
              m "td.WIN_#{o.view.win}.calc", {}, o.view.win_side
              m "td.WIN_#{o.view.win}", {}, o.view.role
              m "td.WIN_#{o.view.win}", {}, m.trust o.view.text

toggle_desc = (prop, desc, value)->
  if prop() == value
    attr = Btn.bool {}, desc
    attr.className = "btn edge active"
    attr
  else
    Btn.set {}, prop, value

doc.message.potofs = (v)->
  {potofs_order, potofs_desc} = Url.prop
  hides = Url.prop.potofs_hide()
  m "section.table-swipe",
    m "table",
      m "tfoot",
        m "tr.center",
          m "th[colspan=2]", m "sup", "(スクロールします。)"
          m "th", m "a", toggle_desc(potofs_order, potofs_desc, "stat_at"),  "日程"
          m "th", m "a", toggle_desc(potofs_order, potofs_desc, "stat_type"),"状態"
          m "th", m "a", toggle_desc(potofs_order, potofs_desc, "said_num"), "発言"
          m "th", m "a", toggle_desc(potofs_order, potofs_desc, "pt"),       "残り"
          m "th", m "a", toggle_desc(potofs_order, potofs_desc, "urge"),     "促"
          m "th", m "span.icon-user", " "
          m "th", m "a", toggle_desc(potofs_order, potofs_desc, "select"),     "希望"
          m "th", m "a", toggle_desc(potofs_order, potofs_desc, "win_result"), "勝敗"
          m "th", m "a", toggle_desc(potofs_order, potofs_desc, "win_side"),   "陣営"
          m "th", m "a", toggle_desc(potofs_order, potofs_desc, "role"),       "役割"
          m "th", m "a", toggle_desc(potofs_order, potofs_desc, "text"),       "補足"
      m "tbody.plane", {test:"test"},
        for o in Mem.potofs.view(potofs_desc(), potofs_order()).list
          filter_class =
            if hides[o.face_id]
              "filter-hide"
            else
              ""
          m "tr", {className: filter_class},
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

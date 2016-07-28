doc.component.potofs =
  controller: ->
    tie = InputTie.btns Url.params, ["potofs_order"]
    tie.change = (id, value, old_value)->
      Url.params.potofs_desc = false
    tie.stay = (id, value)->
      Url.prop.potofs_desc ! Url.params.potofs_desc

    tie.input.potofs_order

  view: (c, wide_attr)->
    { potofs_order, potofs_desc, potofs_hide } = Url.params
    m "section.table-swipe",
      m "table",
        m "tfoot",
          m "tr.center",
            m "th[colspan=2]", m "sup", "(スクロールします。)"
            m "th", m "a", c.item "stat_at"
            m "th", m "a", c.item "stat_type"
            m "th", m "a", c.item "said_num"
            m "th", m "a", c.item "pt"
            m "th", m "a", c.item "urge"
            m "th", m "span.icon-user", " "
            m "th", m "a", c.item "select"
            m "th", m "a", c.item "win_result"
            m "th", m "a", c.item "win_side"
            m "th", m "a", c.item "role"
            m "th", m "a", c.item "text"
        m "tbody.plane", wide_attr,
          for o in Mem.Query.potofs.view(potofs_desc, potofs_order).list
            className =
              if potofs_hide[o.face_id]
                "filter-hide"
              else
                ""
            m "tr", { className },
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

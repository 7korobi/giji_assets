doc.component.potofs_hide =
  controller: ->
  view: (c, wide_attr)->
    m "section.table-swipe",
      m "table",
        m "tfoot",
          m "tr.center",
            m "th[colspan=2]"
        m "tbody.plane", wide_attr,
          m "tr",
              m "th.calc", "…"

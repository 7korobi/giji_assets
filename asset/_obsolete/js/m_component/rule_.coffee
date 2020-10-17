rule_accordion = (type)->
  key = "rule_#{type}"
  win.mount "#rule-#{type}", -> doc.component[key]

  doc.component[key] =
    controller: ->
      cb = ->
        list.tap = null

      @list = RULE[type].list
      @cancel =
        onmouseup: cb
        ontouchend: cb
      return

    view: ({list, cancel})->
      items = []
      items.push m "dt", cancel, m "span.mark", m.trust "&#x2718"

      cb = ({head, text}, idx)->
        cb = (e)->
          list.tap = idx
        tap = 
          onmouseup: cb
          ontouchend: cb

        items.push m "dt", tap,
          m "strong", m.trust head
          m ".allow", "↨"
        if list.tap == idx
          items.push m "dd", m.trust text

      for o, i in list
        cb o, i

      m "dl.accordion", win.scroll.mark(type), items


rule_accordion "nation"
rule_accordion "village"
rule_accordion "maker"
rule_accordion "player"

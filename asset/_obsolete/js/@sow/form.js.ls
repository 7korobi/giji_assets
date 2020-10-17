

sw =
  controller: (f)->
  view: (c, f)->
    m "select[name=target]",
      m "option", { value: -1 , selected }, "（パス）"
      m "option", { value: v,   selected }, able.sw + "する"
    m "input", {type: 'submit', value: '変更', disabled },

target =
  controller: (f)->
  view: (c, f)->

text =
  controller: (f)->
  view: (c, f)->

form =
  controller: (f)->
  view: (c, f)->

# menu.icon.icon "pencil",
menu =
  open: ->
  close: ->
  view: ->
    m ".SAY.paragraph",
      doc.timeline()
      m "h6", "あなたが書き込む内容です。 - 記述"
      if event = Mem.Query.events.list.last()
        for role in Mem.Query.roles.list
          m.component form, role, story, event, potof

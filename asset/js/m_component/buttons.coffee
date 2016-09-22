doc.component.buttons =
  controller: ->
    badges =
      "pin": ->
        doc.messages.pins(Url.params).list.length - Mem.Query.events.list.length
      "home": ->
        Mem.Query.messages.home("announce").list.length - Mem.Query.events.list.length
      "mail": ->
        params = _.merge {}, Url.params,
          memo: "all"
          uniq: true
          search: ""
        doc.messages.memo(params).list.length - Mem.Query.events.list.length
      "clock": ->
        params = _.merge {}, Url.params,
          talk: "all"
          open: true
          search: ""
        doc.messages.history(params).list.length - Mem.Query.events.list.length
      "chat-alt": ->
        params = _.merge {}, Url.params,
          talk: "all"
          open: true
          search: ""
        doc.messages.talk(params).list.length - Mem.Query.events.list.length
      "th-large": ->
        # Mem.Query.map_faces.active(Url.params.order, Url.params.chr_set, Url.params.search).list.length


    for icon, option of Mem.Query.inputs.hash.icon.options
      option.badge = badges[icon]

    vdom = []
    section = (icon)->
      vdom.push menu.input.icon.item icon,
        className: "glass tooltip-right"
        tag: "bigicon"

    { vdom, section }

  view: ({section, vdom})->
    vdom.length = 0
    menu.draw()
    switch Url.params.scope
      when "pins"
        section "pin"

      when "memo", "history"
        section "home"
        section "clock"
        section "mail"
        section "chat-alt"

      when "home", "talk"
        section "home"
        section "mail"
        section "chat-alt"

      when "full"
        section "resize-normal"
      when "normal"
        section "resize-full"

    section "pencil"
    section "th-large"
    section "search" unless "pins" == menu.params.scope
    section "cog"

    m "table",
      m "tr",
        m "td", vdom

doc.component.security_modes =
  controller: (prop)->
    tie = Mem.Query.options.btns Url.params, [
      "show"
      "open"
      "human"
    ]
    tie.check ->
      prop Url.params.show
      Url.replacestate()

    options = Mem.Query.options.hash.show.options
    refresh = ->
      { has } = Mem.Query.messages
      story = Mem.Query.storys.list.first
      mob = Mem.Query.roles.find(story?.type.mob)

      grave_caption = []
      grave_caption.push "墓下" if has.grave
      grave_caption.push mob.CAPTION if has.vsay && mob.CAPTION
      options.grave.caption = grave_caption.join("/") + "つき"

      think_caption = []
      think_caption.push "独り言" if has.think
      think_caption.push "内緒話" if has.to
      options.think.caption = think_caption.join("/") + "つき"

      options.clan._id = if has.clan then "clan" else null

    input = tie.input
    { input, refresh }

  view: ({input, refresh}, prop)->
    refresh()
    m "p",
      input.show.field ({caption})-> caption
      m.trust "&nbsp;"
      input.open.field()
      input.open.label()
      input.human.field()
      input.human.label()

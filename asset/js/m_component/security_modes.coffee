doc.component.security_modes =
  controller: (prop)->
    tie = InputTie.btns Url.params, [
      "show"
      "open"
      "human"
    ]
    tie.check ->
      prop Url.params.show
      Url.replacestate()

    options = Mem.Query.inputs.hash.show.options
    tie.do_draw ->
      { has } = Mem.Query.messages
      story = Mem.Query.storys.list.first
      mob = Mem.Query.roles.find(story?.type.mob)

      grave_label = []
      grave_label.push "墓下" if has.grave
      grave_label.push mob.label if has.vsay && mob.label
      options.grave.label = grave_label.join("/") + "つき"

      think_label = []
      think_label.push "独り言" if has.think
      think_label.push "内緒話" if has.to
      options.think.label = think_label.join("/") + "つき"

      options.clan._id = if has.clan then "clan" else null

    tie

  view: (tie, prop)->
    { input } = tie
    tie.draw()

    m "p",
      input.show.field()
      m.trust "&nbsp;"
      input.open.field()
      input.open.label()
      input.human.field()
      input.human.label()

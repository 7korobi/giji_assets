tie = InputTie.btns Url.params, ["icon", "scope"]
tie.change = (key, val, old)->
  console.log [key, val, old]
  switch key
    when "icon"
      switch val
        when "cog"
          null
        else
          null
    when "scope"
      null
    else
      null

export menu = tie.input


btns = ({head, field})->
  [head(), field (o)-> o.caption ]

menu.scope.change_pin = (id)->
  target = menu.scope.state()
  target_at =
    switch target
      when "history"
        "memo_at"
      when "memo", "talk", "home"
        "#{target}_at"
      else
        null

  if target_at
    Url.params.back = target
    Url.params[target_at] = id
  Url.params.scroll = id
  Url.replacestate()
  menu.icon.change "pin"


menu.icon.icon "cog",
  controller: ->
    { tie } = Url
    tie

  view: ({ input })->
    m ".paragraph",
      btns input.theme
      btns input.width
      btns input.layout
      btns input.font

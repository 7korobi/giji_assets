@menu = menu = InputTie.btns Url.params, ["icon", "scope"]
menu.change = (id, value, old_value)->
  switch id
    when "scope"
      switch value
        when "history", "memo"
          Url.params.scroll = ""
          ScrollSpy.go Url.params.memo_at
        when "talk"
          Url.params.scroll = ""
          ScrollSpy.go Url.params.talk_at
        when "home"
          Url.params.scroll = ""
          ScrollSpy.go Url.params.home_at
        when "pins"
          Url.params.scroll = ""
          ScrollSpy.go Url.params.scroll

    when "icon"
      switch value
        when "pin"
          menu.do_change "scope", "pins"
        when "home"
          menu.do_change "scope", "home"
        when "mail"
          menu.do_change "scope", "memo"
        when "chat-alt"
          menu.do_change "scope", "talk"
        when "clock"
          menu.do_change "scope", "history"

        when "resize-full"
          win.scroll.size = 30
          menu.do_change "scope", "full"
        when "resize-normal"
          win.scroll.size = 120
          menu.do_change "scope", "normal"

      switch old_value
        when "pin"
          Url.params.pins = {}
          menu.do_change "scope", Url.params.back

menu.input.scope.change_pin = (id)->
  target = Url.params.scope
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
  menu.do_change "icon", "pin"

vmake =
  controller: (v)!->
    @is_check = m.prop false
    @mosaic =
      type: "checkbox"
      onchange: m.withAttr "checked", @is_check

  view: ({is_check, mosaic},{_id, mestype, style})->
    m ".#{mestype}.action", {key: _id},
      m "p.text.#{style}",
        "便利な"
        m 'a.btn.edge', {href: "http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD"}, "企画村予定表"
        "はもう見た？建てた村に人が集まりそうかどうか、予想できるかもしれないよ。"
        m "br"

      if doc.user.is_login
        if is_check()
          m 'a.btn.edge[href="./sow.cgi?cmd=makevilform"]', "村の作成"
        else
          m "h6",
            "見たよ！今から、村を立てるよ！"
            m "input", mosaic
      else
        m "h6", "村を作成する場合はログインして下さい。"

doc.component.vmake = vmake

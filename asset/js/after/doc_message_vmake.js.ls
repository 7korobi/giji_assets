vmake =
  controller: (v)->
    v.is_check = m.prop false
    v.mosaic =
      type: "checkbox"
      onchange: m.withAttr "checked", v.is_check
    v

  view: (v)->
    m ".#{v.mestype}.action", {key: v._id},
      m "p.text.#{v.style}",
        "便利な"
        m 'a.btn.edge[href="http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD"]', "企画村予定表"
        "はもう見た？建てた村に人が集まりそうかどうか、予想できるかもしれないよ。"
        m "br"

      if doc.user.is_login
        if v.is_check()
          m 'a.btn.edge[href="./sow.cgi?cmd=makevilform"]', "村の作成"
        else
          m "h6",
            "見たよ！今から、村を立てるよ！"
            m "input", v.mosaic
      else
        m "h6", "村を作成する場合はログインして下さい。"

doc.message.vmake = (v)->
  m "div", m.component vmake, v

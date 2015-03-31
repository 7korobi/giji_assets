GUI.form = (->

  submit = (props, f)->
    GUI.attrs {}, ()->
      @start (e)->
        GUI.message.delegate.submit(props, f)

  delegate:
    submit: -> console.log arguments

  action: (f, props)->
    m "form[name=action_form]",
      m ".#{f.mestype}.action", {key: f._id},
        m "p.text.#{f.style}", deco_action(f),
          m "b", m.trust f.name
          "は、"
          m "span",
            m.trust props.log().deco_preview
        m "h6", "#{f.count} #{f.title}"
        m ".mark", f.errors
        m ".formpl_content",
          m "select.mini", Txt.input(props.target), f.targets
          m "select.mini", Txt.input(props.action), f.actions
        m "input[type=text]", Txt.input(props.log)
      m "p",
        m "a.btn", submit(props, f), "アクション"
      m "p",
        m "span#{f.error}", f.valid_text

  entry: (f, props)->
    m "form[name=entry_form]",
      m "table.#{f.mestype}.talk", {key: f._id},
        m "tr",
          m "th",
            GUI.portrate f.face_id

          m "td",
            m ".msg",
              m "p",
                m "label.medium[for=entry_pwd]", "参加パスワード"
                m "input#entry_pwd[type=password][maxlength=8][size=8]", Txt.input(props.password)
              m "p",
                m "label.medium[for=entry_csid]", "希望する配役"
                m "select#entry_csid", Txt.input(props.csid_cid), f.csid_cids
              m "p",
                m "label.medium[for=entry_role]", "希望する役職"
                m "select#entry_role", Txt.input(props.role), f.roles
              m "div", 
                if is_preview()
                  m "h3.mesname",
                    m "a", "#{f.face.job} #{f.face.name}"
                  m "p.text.#{props.style()}", m.trust props.log().deco_preview
                  m "h6", "参加する時のセリフ"
                else
                  m "textarea[cols=30][rows=#{f.lines}]", Txt.input(props.log)
                  m "h6", "参加する時のセリフ"
                  m ".mark", f.errors

              m "p", 
                if is_preview()
                  m "a.btn", Btn.bool(f.is_preview), "戻る"
                  m "a.btn", submit(props, f), f.title
                  f.count
                  m "select.small", Txt.input(props.style), f.styles
                else
                  m "a.btn", Btn.bool(f.is_preview), f.title
                  f.count
                  m "select.small", Txt.input(props.style), f.styles
              m "p",
                f.caption
                m "span.#{f.error}", f.valid_text
                unless is_preview()
                  m "span", f.diary

  memo: (f)->

    m "form[name=memo_form]",
      m "table.#{f.mestype}.memo", {key: f._id},
        m "tr",
          m "th",
            GUI.portrate f.face.id
            m "div", m "b", "#{f.face.job} #{f.face.name}"

          m "td",
            if is_preview()
              m "p.text.#{props.style()}", m.trust props.log().deco_preview
              m "h6", "参加する時のセリフ"
            else
              m "textarea[cols=30][rows=#{f.lines}]", Txt.input(props.log)
              m "h6", "参加する時のセリフ"
              m ".mark", f.errors

            m "p", 
              if is_preview()
                m "a.btn", Btn.bool(f.is_preview), "戻る"
                m "a.btn", submit(props, f), f.title
                f.count
                m "select.small", Txt.input(props.style), f.styles
              else
                m "a.btn", Btn.bool(f.is_preview), f.title
                f.count
                m "select.small", Txt.input(props.style), f.styles
            m "p",
              f.caption
              m "span.#{f.error}", f.valid_text
              unless is_preview()
                m "span", f.diary

  open: (f)->
  secret: (f)->
  silent: (f)->
  version: (f)->
  votes: (f)->
  story: (f)->
)()

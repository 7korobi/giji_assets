doc.message.form = (v)->
  error_and_info = (o)->
    m "p.mes_date",
      for msg in o.errors
        m ".WSAY", m ".emboss", msg
      for msg in o.infos
        m ".TSAY", m ".emboss", msg

  act = (mestype, o)->
    target = o.target_at o.target()
    vdom = []
    vdom.push m ".#{mestype}.action",
      m "p.text",
        m "b", face.name
        "は、"
        target.name
        o.text()
      m "p.mes_date",
        o.summary
    vdom.push m ".#{mestype}.action",
      m "p.text",
        select o, action: "ACT"
      error_and_info o
    vdom

  select = (input, able)->
    selected = (prop, val)->
      if val == prop()
        "[selected]"
      else
        ""

    if input.targets
      options =
        m "optgroup[label=選択肢]",
          for {pno, job, name} in input.targets
            selected = ""
            selected = "[selected]" if input.target() == pno
            m "option[value=#{pno}]#{selected}", {key: pno}, "#{job} #{name}"

    vdoms = []
    if able.action
      actions = Mem.actions.for_form(v.mestype, v.format).list().map (act)->
        m "option[value=#{act.index}]", {key: act.index}, "#{act.text}"
      actions.unshift m "option[value=0]", {key: 0}, "↓ 自由入力、または選択してください。"

      vdoms.push m "fieldset.text",
        m "form", input.attr.form(),
          m "select.label", input.attr.target(), options
          m "select.wrapper", input.attr.action(), actions
          m "input.wrapper[type=text]", input.attr.text()
          m "input.btn.edge[type=submit][value=#{ able.action }]"

    if able.targets
      vdoms.push m "form", input.attr.form(),
        m "p.text",
          m "select.roster", input.attr.target(), options
          "と"
          m "select.roster", input.attr.target(), options
          m "input.label.btn.edge[type=submit][value=#{ able.targets }]"

    if able.target
      vdoms.push m "form", input.attr.form(),
        m "p.text",
          m "select.roster", input.attr.target(), options
          m "input.label.btn.edge[type=submit][value=#{ able.target }]"

    if able.sw
      vdoms.push m "form", input.attr.form(),
        m "p.text",
          m "select.roster", input.attr.target(), options
          m "input.label.btn.edge[type=submit][value=#{ able.sw }？]"

    if able.btn
      vdoms.push m "form", input.attr.form(),
        m "p.text",
          m "input.label.btn.edge[type=submit][value=#{ able.btn }]"
          m "span.TSAY.emboss", able.change
    vdoms

  chr_job = Mem.chr_jobs.find(v.chr_job_id)
  face = chr_job.face()
  m "div", {key: v._id},
    m "h6", m.trust v.role_name
    m "table.#{v.mestype}.talk",
      m "tr",
        m "th"
        m "td",
          m ".msg",
            for vv in Mem.form_texts.formats(v._id, v.mestype).list()
              m "span.btn.edge", v.format_on(vv.format), vv.format_name
            for vv in Mem.form_texts.mestypes(v._id, v.format).list()
              m "span.btn.edge", v.mestype_on(vv.mestype), vv.mestype_name

    if form_text = Mem.form_texts.find("#{v._id}-#{v.mestype}-#{v.format}")
      m "table.#{v.mestype}.#{v.format}",
        m "tr",
          m "th",
            GUI.portrate face._id

          m "td",
            m ".msg",
              doc.message.talk_name v.name, "#{chr_job.job} #{face.name}", v.to
              m "form", form_text.attr.form(),
                m "textarea[rows=5]", form_text.attr.text()
              m "p.mes_date",
                form_text.summary
            m ".msg",
              error_and_info form_text


    if "talk" == v.format && form_text = Mem.form_texts.find("#{v._id}-#{v.mestype}-act")
      act v.mestype, form_text

    m ".WIN_#{v.win}.info",
      m ".emboss.pull-right", m.trust v.role_name
      for {able, input} in v.selects
        select input, able
        error_and_info input
      m "p.text",
        m.trust v.role_help
      if v.history
        m "p.text",
          m.trust v.history
    m ".caution.info",
      m "p.text",
        m.trust v.able_help
    m "hr.black"

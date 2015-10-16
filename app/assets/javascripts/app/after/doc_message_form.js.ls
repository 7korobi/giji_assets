doc.message.form = (v)->
  formats =
    talk: "発言"
    memo: "メモ"
  format_btn = (format, text)->
    m "span.btn.edge", v.format_on(format), text

  text_btn = (able, attr)->
    m "span.btn.edge", attr.attr.choice(), able.name

  act = (acttype, o)->
    target = o.target_at o.target()
    m ".#{acttype}.action",
      m "p.text",
        m "b", face.name
        "は、"
        target.name
        o.text()
      m "p.text"
        select o, action: "ACT"

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
            m "option[value=#{pno}]#{selected}", "#{job} #{name}"

    vdoms = []
    if able.action
      act_attrs =
        onchange: m.withAttr "value", (index)->
          input.text Mem.actions.find(index).text
      vdoms.push m "fieldset.text",
        m "select.label", input.attr.target(), options
        m "select.wrapper", act_attrs,
          for act in Mem.actions.list()
            m "option[value=#{act.index}]", "#{act.text}"
        m "input.wrapper[type=text]", input.attr.text()
        m "input.btn.edge[type=button][value=#{ able.action }]"

    if able.targets
      vdoms.push m "p.text",
        m "select.roster", input.attr.target(), options
        "と"
        m "select.roster", input.attr.target(), options
        m "input.label.btn.edge[type=button][value=#{ able.targets }]"

    if able.target
      vdoms.push m "p.text",
        m "select.roster", input.attr.target(), options
        m "input.label.btn.edge[type=button][value=#{ able.target }]"

    if able.sw
      vdoms.push m "p.text",
        m "select.roster", input.attr.target(), options
        m "input.label.btn.edge[type=button][value=#{ able.sw }？]"

    if able.btn
      vdoms.push m "p.text",
        m "input.label.btn.edge[type=button][value=#{ able.btn }]"
        m "span.TSAY.emboss", able.change

    for msg in input.errors
      vdoms.push m ".WSAY", m ".emboss", msg
    for msg in input.infos
      vdoms.push m ".TSAY", m ".emboss", msg

    vdoms

  chr_job = Mem.chr_jobs.find(v.chr_job_id)
  face = chr_job.face()

  m "div", {key: v._id},
    m "h6", m.trust v.role_name
    if v.mestype?
      m "table.#{v.mestype}.#{v.format}",
        m "tr",
          m "th",
            GUI.portrate face._id

          m "td",
            m ".msg",
              doc.message.talk_name v.name, "#{chr_job.job} #{face.name}", v.to
              m "textarea[rows=5]", v.form[v.mestype][v.format].attr.text()
              for format, text of formats
                format_btn format, text
              for o in v.texts
                text_btn o.able, o[v.format]
              m "p.mes_date"


    if v.acttype? && "talk" == v.format
      act v.acttype, v.form.act

    m ".WIN_#{v.win}.info",
      m ".emboss.pull-right", m.trust v.role_name
      for {able, input} in v.selects
        select input, able
      m "p.text",
        m.trust v.role_help
      m "p.text",
        m.trust v.history
    m ".caution.info",
      m "p.text",
        m.trust v.able_help
    m "hr.black"

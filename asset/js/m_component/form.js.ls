doc.component.form =
  controller: (v)->
    console.warn v
    return

  view: (c, v)->
    { params, tie } = v
    error_and_info = (o)->
      list = []
      for msg in o.errors
        list.push m ".WSAY", m ".emboss", msg
      for msg in o.infos
        list.push m ".TSAY", m ".emboss", msg
      m "p.mes_date", list

    select = (input, able)->
      if input.targets
        options =
          m "optgroup[label=選択肢]",
            for {pno, job, name} in input.targets
              key = value = pno
              selected = ""
              selected = "selected" if input.target() == pno
              m "option", {key, value, selected}, "#{job} #{name}"

      vdoms = []
      if able.action
        actions = Mem.Query.actions.for_form(v.mestype, v.format).list.map (act)->
            key = value = act.index
            m "option", {value, key}, "#{act.text}"
        actions.unshift m "option", {value: 0, key: 0}, "↓ 自由入力、または選択してください。"

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

    chr_job = Mem.Query.chr_jobs.find(v.chr_job_id)
    { face } = chr_job
    m "div", {key: v._id},
      m "h6", m.trust v.role_name
      m "table.#{v.mestype}.talk",
        m "tr",
          m "th"
          m "td",
            m ".msg",
              tie.input.format.field()
              tie.input.mestype.field()

      if form_text = Mem.Query.form_texts.find("#{v._id}-#{v.mestype}-#{v.format}")
        switch v.format
        when "act"
          target = form_text.target_at form_text.target()
          m ".#{v.mestype}.action",
            m "p.text",
              m "b", face.name
              "は、"
              target.name
              form_text.text()
            m "p.mes_date",
              form_text.summary
            m "p.text",
              select form_text, action: "ACT"
            error_and_info form_text
        else
          m "table.#{v.mestype}.#{v.format}",
            m "tr",
              m "th",
                GUI.portrate face._id
              m "td",
                m ".msg",
                  doc.ext.talk_name v.name, "#{chr_job.job} #{face.name}", v.to
                  m "form", form_text.attr.form(),
                    m "textarea[rows=5]", form_text.attr.text()
                  m "p.mes_date",
                    form_text.summary
                m ".msg",
                  error_and_info form_text

      m ".WIN_#{v.win}.info",
        m ".emboss.pull-right", m.trust v.role_name
        for {able, input} in v.selects
          [select(input, able), error_and_info(input)]
        m "p.text",
          m.trust v.role_help
        if v.history
          m "p.text",
            m.trust v.history
      m ".caution.info",
        m "p.text",
          m.trust v.able_help
      m "hr.black"

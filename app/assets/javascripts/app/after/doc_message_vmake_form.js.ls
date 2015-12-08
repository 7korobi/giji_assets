vmake_form =
  controller: (v)->
    v.form =
      role:  []
      gift:  []
      trap:  []
      extra: []
    v

  view: (v)->
    npc_says = (csid)->
      if csid
        {face_id, say_0, say_1} = csid
        chr_set = v.form.chr_set()
        chr_job = chr_set.chr_jobs().find "#{chr_set._id}_#{face_id}"
        if chr_job
          updated_at = _.now()
          mestype = "SAY"
          face = Mem.faces.find face_id
          name = "#{chr_job.job} #{face.name}"

          [ doc.message.talk {face_id, name, mestype, updated_at, log: say_0}
            doc.message.talk {face_id, name, mestype, updated_at, log: say_1}
          ]

    btn = (tap)->
      attr =
        onmouseup: tap
        ontouchend: tap

    add_btn = (o)->
      tap = ->
        v.form[o.cmd].push o._id
      m "a.WIN_#{o.win}.btn.edge", btn(tap), o.name

    sets = (method, list)->
      tap = -> list.pop()
      m "div",
        m "a.btn.edge.icon-cancel-alt", btn(tap), ""
        m "span", "#{list.length}人"
        GUI.names[method] list, (name, size, style)->
          if size > 1
            m "span.#{style}.emboss", "#{name}x#{size}"
          else
            m "span.#{style}.emboss", "#{name}"

    add_btns = (query)->
      for o in query.list()
        add_btn o

    base = (key)->
      v.form[key] ?= m.prop(null)
      v.form[key]

    option = (o)->
      prop = base o._id
      o.attr.onchange ?= m.withAttr o.attr_value, prop
      m "div",
        m "input", o.attr
        m "label", {for: o.attr.name},
          if prop()
            o.help_on
          else
            o.help_off

    select = (key, hash, data, help)->
      prop = base key
      select_attr =
        id: key
        name: key
        onchange: m.withAttr "value", (value)->
          prop hash[value]

      label_attr =
        for: key

      m 'div',
        m 'select', select_attr,
          m 'option', {value: ""}, "- 選択してください -"
          for value, o of hash
            m 'option', {value}, data o
        if help && prop()
          m "label", label_attr, m.trust help prop()

    vindex = 0
    nindex = 0
    vtext = [
      "（村のルールは、自由に編集できるよ！）"
      "■村のルール"
    ].concat RULE.village.list.map (o)-> "#{++vindex}.#{o.head}"

    m ".vmake.paragraph", {key: v._id},
      m "fieldset.#{v.mestype}",
        m "p", "
          村建てマニュアルや同村者の意見を参考に、魅力的な村を作っていきましょう。
          募集期限は作成した日から#{Mem.conf.folder.MORPHE.config.cfg.TIMEOUT_SCRAP}日間です。
          期限内に村が開始しなかった場合、廃村となります。
        "
      m "fieldset.#{v.mestype}",
        m "legend", "村の名前と説明"
        m "input", Mem.options.find("vil-name").attr
        m "textarea", Mem.options.find("vil-comment").attr, vtext.join("\r\n")

      m "fieldset.#{v.mestype}",
        m "p", "■国のルール"
        RULE.nation.list.map (o)-> m "p", "#{++nindex}.#{o.head}"

      m "fieldset.#{v.mestype}",
        m "p.tips",
          "以上の項目が、"
          m 'a[href="./sow.cgi?cmd=rule"]', "人狼議事のルール"
          "なんだ。編集していい部分は、自由に変更してかまわない。"

      m "fieldset.#{v.mestype}",
        m "legend", "設定"
        option Mem.options.find("entry-password")
        for o in Mem.options.checkbox().list()
          option o

      m "h6", "ゲームルール"
      select "game",
        Mem.conf.rule
        (o)-> o.CAPTION
        (o)-> o.HELP

      m "h6", "こだわり"
      select "rating",
        Mem.conf.rating
        (o)-> o.caption
        (o)-> m "img", src: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_#{o._id}.png"

      m "h6", "登場人物"
      select "chr_set",
        Mem.chr_sets.hash()
        (o)-> o.caption

      if v.form.chr_set()
        select "csid",
          v.form.chr_set().chr_npcs().hash()
          (o)-> o.caption

      if v.form.chr_set() && v.form.csid()
        npc_says v.form.csid()

      m "h6", "発言制限"
      select "saycnttype",
        Mem.says.finds Mem.conf.folder.MORPHE.config.saycnt
        (o)-> o.CAPTION
        (o)-> o.HELP

      m "h6", "開始方法"
      select "starttype",
        Mem.conf.start_type
        (o)-> o.caption
        (o)-> o.help

      m "fieldset",
        m "h6", "見物人"
        select "mob",
          Mem.roles.mob().hash()
          (o)-> o.name
          (o)-> o.HELP

        m "h6", "編成"
        sets "config", v.form.mob
        sets "config", v.form.role
        sets "config", v.form.gift
        if v.form.seqevent && v.form.seqevent()
          sets "order", v.form.trap
        else
          sets "config", v.form.trap

        m "h6", "村側"
        add_btns Mem.roles.is "human"

        m "h6", "敵方の人間"
        add_btns Mem.roles.is "evil"

        m "h6", "人狼"
        add_btns Mem.roles.is "wolf"

        m "h6", "妖精"
        add_btns Mem.roles.is "pixi"

        m "h6", "その他"
        add_btn
          _id: "mob"
          cmd: "extra"
          win: "NONE"
          name: "見物人"

        add_btns Mem.roles.is "other"

        m "h6", "恩恵"
        add_btns Mem.roles.is "gift"

        m "h6", "事件"
        add_btns Mem.traps.show()

      m "fieldset",
        m "input", {name:"cmd", value: v.cmd, type: "hidden"}
        m "input", {type:"submit", value: "村の作成"}

doc.message.vmake_form = (v)->
  m "div", m.component vmake_form, v
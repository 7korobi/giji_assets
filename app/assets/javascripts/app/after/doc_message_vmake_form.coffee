vmake_form =
  controller: (v)->
    v.form =
      extra: []
      role:  []
      gift:  []
      trap:  []

    v.reset = ->
      player_count = v.form["player-count"]?()
      cards_set = v.form.roletable?()?.cards
      console.log [v.form]
      if cards_set
        v.form.role = []
        v.form.gift = []
        cards = cards_set[player_count]
        if cards
          for o in Mem.roles.finds cards
            v.form[o.cmd].push o._id

    v.player_summary = ({role, gift, extra})->
      full = [role..., gift...]
      minus = 0
      minus += 2 * Mem.roles.minus2(role).length
      minus += 1 * Mem.roles.minus1(full).length

      wolf_size = Mem.roles.wolfs(full).length
      human_size = Mem.roles.humans(role).length - minus
      extra_size = extra.length
      player_size = Mem.roles.players(role).length
      can_play = 0 < wolf_size < human_size

      if can_play
        m "div",
          "最大 "
          m "span.mark.SSAY",
            player_size
            "人"
          if extra_size
            m "span.mark.VSAY",
              "+"
              extra_size
              "人"
          " が参加できます。"
          if human_size
            m "span",
              m "span.mark.TSAY",
                human_size
                "人"
              "以上" if minus
              "は人間です。"
      else
        m "div",
          "この編成ではゲームが成立しません。"

    v.npc_says = (csid)->
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

    v

  view: (v)->
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
          m "label", label_attr, help prop()

    console.log [v.form["entry-password"]?(), Mem.options.find("entry-password")]
    v.reset()
    vindex = 0
    nindex = 0
    vtext = [
      "（村のルールは、自由に編集できるよ！）"
      "■村のルール"
    ].concat RULE.village.list.map (o)-> "#{++vindex}.#{o.head}"

    m ".vmake.paragraph", {key: v._id},
      m "fieldset.#{v.mestype}",
        m "p",
          "村建てマニュアルや同村者の意見を参考に、魅力的な村を作っていきましょう。"
          m "br"
          "村作成から"
          m "span.mark", "#{Mem.conf.folder.MORPHE.config.cfg.TIMEOUT_SCRAP}日間"
          "が、募集の期限となります。期限内に村が開始しなかった場合、廃村となります。"
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
        (o)-> m.trust o.HELP

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
        v.npc_says v.form.csid()

      m "h6", "発言制限"
      select "saycnttype",
        Mem.says.finds Mem.conf.folder.MORPHE.config.saycnt
        (o)-> o.CAPTION
        (o)-> m.trust o.HELP

      m "h6", "開始方法"
      select "starttype",
        Mem.conf.start_type
        (o)-> o.caption
        (o)-> m.trust o.help

      m "fieldset",
        m "legend", "編成"

        select "mob",
          Mem.roles.mob().hash()
          (o)-> o.name
          (o)-> m.trust o.HELP

        select "roletable",
          Mem.role_tables.enable().hash()
          (o)-> o.name

        v.player_summary v.form

      switch v.form.roletable()?._id
        when undefined
          m "fieldset",
            m "p", "まずは、役職配分を選択してください。"
        when "custom"
          m "fieldset",
            m "legend", "編成自由設定"
            option Mem.options.find("player-count")
            if "wbbs" == v.form.starttype?._id
              option Mem.options.find("player-count-start")
            sets "config", v.form.extra
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
            add_btns Mem.roles.is "other"
            add_btn(
              _id: "mob"
              cmd: "extra"
              win: "NONE"
              name: "見物人"
            )

            m "h6", "恩恵"
            add_btns Mem.roles.is "gift"

            m "h6", "事件"
            add_btns Mem.traps.show()

        else
          m "fieldset",
            m "legend", "編成詳細"
            option Mem.options.find("player-count")
            if "wbbs" == v.form.starttype?._id
              option Mem.options.find("player-count-start")
            sets "config", v.form.extra
            sets "config", v.form.role
            sets "config", v.form.gift
            if v.form.seqevent && v.form.seqevent()
              sets "order", v.form.trap
            else
              sets "config", v.form.trap

            add_btn(
              _id: "mob"
              cmd: "extra"
              win: "NONE"
              name: "見物人"
            )


      m "fieldset",
        m "input", {name:"cmd", value: v.cmd, type: "hidden"}
        m "input", {type:"submit", value: "村の作成"}

doc.message.vmake_form = (v)->
  m "div", m.component vmake_form, v

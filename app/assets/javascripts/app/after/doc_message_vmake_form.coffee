vmake_form =
  controller: (v)->
    v.form =
      extra: []
      role:  []
      gift:  []
      trap:  []

    for o in Mem.options.list()
      v.form[o._id] = m.prop(null)


    v.reset = ->
      player_count = v.form.player_count?()
      cards_set = v.form.role_table?()?.cards
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
              "は村人です。"
      else
        m ".emboss",
          "この編成ではゲームが成立しません。"

    v.npc_says = (csid)->
      if csid
        {face_id, say_0, say_1} = csid
        chr_set = v.form.chr_set()
        chr_job = chr_set.chr_jobs().find "#{chr_set._id}_#{face_id}"
        if chr_job
          updated_at = _.now()
          mestype = "SAY"
          user_id = "master"
          anchor = "0"
          face = Mem.faces.find face_id
          name = "#{chr_job.job} #{face.name}"

          [ m "h3", "プロローグ"
            doc.message.talk {face_id, user_id, anchor, name, mestype, updated_at, log: say_0.replace(/\n/g,"<br>")}
            m "h3", "１日目"
            doc.message.talk {face_id, user_id, anchor, name, mestype, updated_at, log: say_1.replace(/\n/g,"<br>")}
            m "h3", "２日目"
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

    v.reset()
    vindex = 0
    nindex = 0
    vtext = [
      "（村のルールは、自由に編集できるよ！）"
      "■村のルール"
    ].concat RULE.village.list.map (o)-> "#{++vindex}.#{o.head}"

    m ".vmake", {key: v._id},
      m ".INFOSP.info",
        m "p.text",
          "村建てマニュアルや同村者の意見を参考に、魅力的な村を作っていきましょう。"
          m "br"
          "村作成から"
          m "span.mark", "#{Mem.conf.folder.MORPHE.config.cfg.TIMEOUT_SCRAP}日間"
          "が、募集の期限となります。期限内に村が開始しなかった場合、廃村となります。"

      m ".MAKER.plane",
        m "fieldset.msg",
          m "legend.emboss", "村の名前、説明、ルール"
          Mem.options.find("vil_name").view(v.form)
          m "textarea", Mem.options.find("vil_comment").attr, vtext.join("\r\n")

          m "p", "■国のルール"
          RULE.nation.list.map (o)-> m "p", "#{++nindex}.#{o.head}"

          m ".emboss",
            "以上の項目が、"
            m 'a[href="./sow.cgi?cmd=rule"]', "人狼議事のルール"
            "なんだ。編集していい部分は、自由に変更してかまわない。"

      m ".SSAY.plane",
        m "fieldset.msg",
          m "legend.emboss", "設定"

          Mem.options.find("rating").view v.form,
            Mem.ratings.enable().hash()
            (o)-> o.caption
            (o)-> m "img", src: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_#{o._id}.png"

          Mem.options.find("say_count").view v.form,
            Mem.says.finds Mem.conf.folder.MORPHE.config.saycnt
            (o)-> o.CAPTION
            (o)-> m.trust o.HELP

          Mem.options.find("start_type").view v.form,
            Mem.conf.start_type
            (o)-> o.caption
            (o)-> m.trust o.help

          "更新時間 hour minute"
          "更新間隔 updinterval"

          Mem.options.find("entry_password").view(v.form)

      m ".SSAY.plane",
        m "fieldset.msg",
          m "legend.emboss", "ゲームルール"
          Mem.options.find("game_rule").view v.form,
            Mem.conf.rule
            (o)-> o.CAPTION
            (o)->
              m "ul",
                m.trust o.HELP
                for chk in Mem.options.checkbox().list()
                  chk.view(v.form)
                m "li",
                  Mem.options.find("vote_type").view v.form,
                    Mem.conf.vote_type
                    (o)-> o.caption
                    (o)-> m.trust o.help

      m ".VSAY.plane",
        m "fieldset.msg",
          m "legend.emboss", "編成"

          Mem.options.find("mob_type").view v.form,
            Mem.roles.mob().hash()
            (o)-> o.name
            (o)-> m.trust o.HELP

          Mem.options.find("role_table").view v.form,
            Mem.role_tables.enable().hash()
            (o)-> o.name

          v.player_summary v.form

      switch v.form.role_table()?._id
        when undefined
          m ".WSAY.plane",
            m "fieldset.msg",
              m "legend.emboss", "編成詳細"
              m "p", "まずは、役職配分を選択してください。"
        when "custom"
          m ".VSAY.plane",
            m "fieldset.msg",
              m "legend.emboss", "編成自由設定"
              Mem.options.find("player_count").view(v.form)
              if "wbbs" == v.form.start_type?()?._id
                Mem.options.find("player_count_start").view(v.form)
              sets "config", v.form.extra
              sets "config", v.form.role
              sets "config", v.form.gift
              if v.form.seq_event?()
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
          m ".VSAY.plane",
            m "fieldset.msg",
              m "legend.emboss", "編成詳細"
              Mem.options.find("player_count").view(v.form)
              if "wbbs" == v.form.start_type?()?._id
                Mem.options.find("player_count_start").view(v.form)
              sets "config", v.form.extra
              sets "config", v.form.role
              sets "config", v.form.gift
              if v.form.seq_event?()
                sets "order", v.form.trap
              else
                sets "config", v.form.trap

              add_btn(
                _id: "mob"
                cmd: "extra"
                win: "NONE"
                name: "見物人"
              )

      m ".SSAY.plane",
        m "fieldset.msg",
          m "legend.emboss", "登場人物"
          Mem.options.find("chr_set").view v.form,
            Mem.chr_sets.hash()
            (o)-> o.caption

          if v.form.chr_set()
            Mem.options.find("csid").view v.form,
              v.form.chr_set().chr_npcs().hash()
              (o)-> o.caption

      if v.form.chr_set() && v.form.csid()
        v.npc_says v.form.csid()

      m ".VSAY.plane",
        m "fieldset.msg",
          m "legend.emboss", "決定"
          m "input", {name:"cmd", value: v.cmd, type: "hidden"}
          m "input", {type:"submit", value: "村の作成"}

doc.message.vmake_form = (v)->
  m "div", m.component vmake_form, v

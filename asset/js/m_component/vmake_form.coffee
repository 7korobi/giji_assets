field = Mem.options.hash

error_and_info = (o)->
  m "p.mes_date",
    for msg in o.errors
      m ".WSAY", m ".emboss", msg
    for msg in o.infos
      m ".TSAY", m ".emboss", msg

doc.component.vmake_form =
  controller: (v)->
    v.params =
      extra: []
      role:  []
      gift:  []
      trap:  []

    fields = [
      "vil_name"
      "vil_comment"

      "rating"
      "trs_type"
      "say_count"

      "time"
      "interval"
      "entry_password"

      "chr_npc"
      "mob_type"
      "game_rule"
      "role_table"

      "player_count"
      "player_count_start"
    ]
    v.form = Mem.options.form v.params, fields,
      oninput: ->
        validate.cards v
      onchange: ->
        validate.cards v
      onsubmit: ->
        if validate.cards v
          v.submit(v.params)

    v.form.checkboxes =
      for chk in Mem.options.checkbox().list
        v.params[chk._id] = unpack[chk.type] chk.init
        chk.vdom v.params


    vindex = 0
    v.params.vil_comment = [
      "（村のルールは、自由に編集できるよ！）"
      " "
      "■村のルール"
    ].concat(RULE.village.list.map (o)-> "#{++vindex}.#{o.head}").join("\r\n")

    v.reset = ->
      {player_count} = v.params
      role_table = Mem.role_tables.find v.params.role_table

      return null unless role_table
      cards_set = role_table.cards

      return null unless cards_set
      v.params.role = []
      v.params.gift = []
      cards = cards_set[player_count]

      return null unless cards
      for o in Mem.roles.finds cards
        v.params[o.cmd].push o._id

    v.player_summary = (form)->
      vdoms = []
      if validate.cards v
        {player, extra, human, minus} = v.size
        vdoms.push "最大 "
        vdoms.push m "span.mark.SSAY", "#{player}人"
        if extra
          vdoms.push m "span.mark.VSAY", "+#{extra}人"

        vdoms.push " が参加できます。"
        if human
          vdoms.push m "span",
            m "span.mark.TSAY", "#{human}人"
            "以上" if minus
            "は村人です。"

      m "div",
        vdoms
        error_and_info v

    v.npc_says = (chr_npc)->
      return null unless chr_npc
      chr_set = chr_npc.chr_set

      return null unless chr_set
      {face_id, say_0, say_1} = chr_npc
      chr_job = chr_set.chr_jobs.find "#{chr_set._id}_#{face_id}"

      return null unless chr_job
      updated_at = _.now()
      mestype = "SAY"
      user_id = "master"
      anchor = "0"
      face = Mem.faces.find face_id
      name = "#{chr_job.job} #{face.name}"

      [ m "h3", "プロローグ"
        doc.view.talk {face_id, user_id, anchor, name, mestype, updated_at, log: say_0.deco_text_lf}
        m "h3", "１日目"
        doc.view.talk {face_id, user_id, anchor, name, mestype, updated_at, log: say_1.deco_text_lf}
        m "h3", "参加キャラクター"
      ]

    add_btn = ({_id, cmd, win, name})->
      tap = ->
        v.params[cmd].push _id
      attr =
        onmouseup: tap
        ontouchend: tap
      m "a.WIN_#{win}.btn.edge", attr, name

    pop_btn = (cmd)->
      tap = ->
        v.params[cmd].pop()
      attr =
        onmouseup: tap
        ontouchend: tap
      {attr, cmd}

    v.sets =
      extra: pop_btn "extra"
      role:  pop_btn "role"
      gift:  pop_btn "gift"
      trap:  pop_btn "trap"

    v.adds =
      human: Mem.roles.is("human").list.map add_btn
      evil:  Mem.roles.is("evil").list.map add_btn
      wolf:  Mem.roles.is("wolf").list.map add_btn
      pixi:  Mem.roles.is("pixi").list.map add_btn
      other: Mem.roles.is("other").list.map add_btn
      gift:  Mem.roles.is("gift").list.map add_btn
      trap:  Mem.traps.show().list.map add_btn
      mob: [
        _id: "mob"
        cmd: "extra"
        win: "NONE"
        name: "見物人"
      ].map add_btn
    v

  view: (v)->
    sets = (method, {attr, cmd})->
      m "div",
        m "a.btn.edge.icon-cancel-alt", attr, ""
        GUI.names[method] v.params[cmd], (size, {name, win})->
          if size > 1
            m "span.WIN_#{win}.emboss", "#{name}x#{size}"
          else
            m "span.WIN_#{win}.emboss", "#{name}"

    v.reset()
    nindex = 0
    if npc = Mem.chr_npcs.find v.params.chr_npc
      jobs = npc.chr_set.chr_jobs.list
    else
      jobs = []

    m "form", v.form.attr,
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
            v.form.vil_name.field()
            v.form.vil_comment.field()

            m "p", "■国のルール"
            RULE.nation.list.map (o)-> m "p", "#{++nindex}.#{o.head}"

            m ".emboss",
              "以上の項目が、人狼議事の"
              m 'a', {href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=nation~~"}, "ルール"
              "と"
              m 'a', {href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=player~~"}, "心構え"
              "なんだ。編集していい部分は、自由に変更してかまわない。"

        m ".SSAY.plane",
          m "fieldset.msg",
            m "legend.emboss", "設定"
            m "p",
              v.form.trs_type.field (o)-> o.CAPTION
              v.form.trs_type.label (o)->
                m "div",
                  m.trust o.HELP

            m "p",
              v.form.rating.field (o)-> o.caption
              v.form.rating.label (o)-> m "img", src: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_#{o._id}.png"

            m "p",
              v.form.say_count.field (o)-> o.CAPTION
              v.form.say_count.label (o)-> m.trust o.HELP

            v.form.time.field()
            v.form.time.label()
            m "p",
              v.form.interval.field (o)-> o.caption
              v.form.interval.label()
            m "p",
              v.form.entry_password.field()
              v.form.entry_password.label()

        m ".SSAY.plane",
          m "fieldset.msg",
            m "legend.emboss", "ゲームルール"
            v.form.game_rule.field (o)-> o.CAPTION
            v.form.game_rule.label (o)->
              m "ul",
                m.trust o.HELP
            for chk in v.form.checkboxes
              m "p",
                chk.field()
                chk.label()

        m ".VSAY.plane",
          m "fieldset.msg",
            m "legend.emboss", "編成"
            m "p",
              v.form.mob_type.field (o)-> o.name
              v.form.mob_type.label (o)-> m.trust o.HELP

            m "p",
              v.form.role_table.field (o)-> o.name

            v.player_summary v.params

        switch v.params.role_table
          when undefined
            m ".WSAY.plane",
              m "fieldset.msg",
                m "legend.emboss", "編成詳細"
                m "p", "まずは、役職配分を選択してください。"
          when "custom"
            m ".VSAY.plane",
              m "fieldset.msg",
                m "legend.emboss", "編成自由設定"
                m "p",
                  v.form.player_count.field()
                  v.form.player_count.label()
                if v.params.start_auto
                  m "p",
                    v.form.player_count_start.field()
                    v.form.player_count_start.label()

                sets "config", v.sets.extra
                sets "config", v.sets.role
                sets "config", v.sets.gift
                if v.params.seq_event
                  sets "order", v.sets.trap
                else
                  sets "config", v.sets.trap


                m "h6", "村側"
                btn for btn in v.adds.human

                m "h6", "敵方の人間"
                btn for btn in v.adds.evil

                m "h6", "人狼"
                btn for btn in v.adds.wolf

                m "h6", "妖精"
                btn for btn in v.adds.pixi

                m "h6", "その他"
                btn for btn in v.adds.other
                btn for btn in v.adds.mob

                m "h6", "恩恵"
                btn for btn in v.adds.gift

                m "h6", "事件"
                btn for btn in v.adds.trap

          else
            m ".VSAY.plane",
              m "fieldset.msg",
                m "legend.emboss", "編成詳細"
                m "p",
                  v.form.player_count.field()
                  v.form.player_count.label()
                if v.params.start_auto
                  m "p",
                    v.form.player_count_start.field()
                    v.form.player_count_start.label()
                sets "config", v.sets.extra
                sets "config", v.sets.role
                sets "config", v.sets.gift
                if v.params.seq_event
                  sets "order", v.sets.trap
                else
                  sets "config", v.sets.trap

                btn for btn in v.adds.mob

        m ".SSAY.plane",
          m "fieldset.msg",
            m "legend.emboss", "登場人物"
            m "p",
              v.form.chr_npc.field (o)-> o.caption
              v.form.chr_npc.label()

        v.npc_says npc
        m ".minilist",
          m "hr.black"
          for o in jobs
            m ".chrbox", {key: o.face_id},
              GUI.portrate o.face_id
              m ".bar.live",
          m "hr.black"

        m ".VSAY.plane",
          m "fieldset.msg",
            m "legend.emboss", "決定"
            m "input", {type:"submit", value: "村の作成"}
            error_and_info v.http

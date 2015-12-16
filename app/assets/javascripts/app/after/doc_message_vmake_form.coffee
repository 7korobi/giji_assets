field = Mem.options.hash

vmake_form =
  controller: (v)->
    v.form =
      extra: []
      role:  []
      gift:  []
      trap:  []

    for o in Mem.options.list
      v.form[o._id] = o.default || null

    vindex = 0
    v.form.vil_comment = [
      "（村のルールは、自由に編集できるよ！）"
      " "
      "■村のルール"
    ].concat(RULE.village.list.map (o)-> "#{++vindex}.#{o.head}").join("\r\n")

    v.reset = ->
      player_count = v.form.player_count
      cards_set = v.form.role_table?.cards
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

    v.npc_says = (chr_npc)->
      chr_set = chr_npc.chr_set
      if chr_set
        {face_id, say_0, say_1} = chr_npc
        chr_job = chr_set.chr_jobs.find "#{chr_set._id}_#{face_id}"
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
        GUI.names[method] list, (size, {name, win})->
          if size > 1
            m "span.WIN_#{win}.emboss", "#{name}x#{size}"
          else
            m "span.WIN_#{win}.emboss", "#{name}"

    add_btns = (query)->
      for o in query.list
        add_btn o

    v.reset()
    nindex = 0

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
          field.vil_name.view(v.form)
          field.vil_comment.view(v.form)

          m "p", "■国のルール"
          RULE.nation.list.map (o)-> m "p", "#{++nindex}.#{o.head}"

          m ".emboss",
            "以上の項目が、人狼議事の"
            m 'a[href="http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=nation~~"]', "ルール"
            "と"
            m 'a[href="http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=player~~"]', "心構え"
            "なんだ。編集していい部分は、自由に変更してかまわない。"

      m ".SSAY.plane",
        m "fieldset.msg",
          m "legend.emboss", "設定"

          field.rating.view v.form,
            (o)-> o.caption
            (o)-> m "img", src: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_#{o._id}.png"

          field.say_count.view v.form,
            (o)-> o.CAPTION
            (o)-> m.trust o.HELP

          field.time.view v.form
          field.interval.view v.form,
            (o)-> o.caption
          field.entry_password.view(v.form)

      m ".SSAY.plane",
        m "fieldset.msg",
          m "legend.emboss", "ゲームルール"
          field.game_rule.view v.form,
            (o)-> o.CAPTION
            (o)->
              m "ul",
                m.trust o.HELP
          for chk in Mem.options.checkbox().list
            chk.view(v.form)

      m ".VSAY.plane",
        m "fieldset.msg",
          m "legend.emboss", "編成"

          field.mob_type.view v.form,
            (o)-> o.name
            (o)-> m.trust o.HELP

          field.role_table.view v.form,
            (o)-> o.name

          v.player_summary v.form

      switch v.form.role_table?._id
        when undefined
          m ".WSAY.plane",
            m "fieldset.msg",
              m "legend.emboss", "編成詳細"
              m "p", "まずは、役職配分を選択してください。"
        when "custom"
          m ".VSAY.plane",
            m "fieldset.msg",
              m "legend.emboss", "編成自由設定"
              field.player_count.view(v.form)
              if v.form.start_auto
                field.player_count_start.view(v.form)
              sets "config", v.form.extra
              sets "config", v.form.role
              sets "config", v.form.gift
              if v.form.seq_event
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
              field.player_count.view(v.form)
              if v.form.start_auto
                field.player_count_start.view(v.form)
              sets "config", v.form.extra
              sets "config", v.form.role
              sets "config", v.form.gift
              if v.form.seq_event
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
          field.chr_npc.view v.form,
            (o)-> o.caption

      if v.form.chr_npc
        v.npc_says v.form.chr_npc

      m ".VSAY.plane",
        m "fieldset.msg",
          m "legend.emboss", "決定"
          m "input", {name:"cmd", value: v.cmd, type: "hidden"}
          m "input", {type:"submit", value: "村の作成"}

doc.message.vmake_form = (v)->
  m "div", m.component vmake_form, v

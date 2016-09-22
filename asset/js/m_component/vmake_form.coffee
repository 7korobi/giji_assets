field = Mem.Query.inputs.hash

error_and_info = (v)->
  m "p.mes_date",
    v.tie.errors (msg)->
      m ".WSAY", m ".emboss", msg
    v.tie.infos (msg)->
      m ".TSAY", m ".emboss", msg

doc.component.vmake_form =
  controller: (v)->
    vindex = 0
    vil_comment = [
      "（村のルールは、自由に編集できるよ！）"
      " "
      "■村のルール"
    ].concat(RULE.village.list.map (o)-> "#{++vindex}.#{o.head}").join("\r\n")

    v.params = { vil_comment }

    v.tie = InputTie.form v.params, [
      "extra"
      "role"
      "gift"
      "trap"

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
    v.tie.input.say_count.label_for = (o)-> m.trust o.help
    v.tie.input.mob_type.label_for = (o)-> m.trust o.help
    v.tie.input.game_rule.label_for = (o)->
      m "ul",
        m.trust o.help
    v.tie.input.trs_type.label_for = (o)->
      m "div",
        m.trust o.help
    v.tie.input.rating.label_for = (o)-> m "img", src: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_#{o._id}.png"


    v.tie.action = ->
      v.submit v.params

    v.tie.input.checkboxes =
      for chk in Mem.Query.inputs.checkbox("vil").list
        v.tie.bundle chk
    console.warn v.tie

    ###
    v.tie.validate =
      extra:
      role:
      gift:
      trap:
      player_count:
      role_table:
      game_rule:
    ###

    v.tie.do_draw ->
      role_table = Mem.Query.role_tables.find v.params.role_table

      return unless role_table
      cards_set = role_table.cards

      return unless cards_set
      v.params.role.length = 0
      v.params.gift.length = 0
      cards = cards_set[v.params.player_count]

      return unless cards
      for o in Mem.Query.roles.finds cards
        v.params[o.cmd].push o._id

    v.tie.do_draw ->
      if chr_npc = Mem.Query.chr_npcs.find v.params.chr_npc
        v.jobs = chr_npc.chr_set.chr_jobs.list
      else
        v.jobs = []

      return null unless chr_npc
      chr_set = chr_npc.chr_set

      return null unless chr_set
      {face_id, say_0, say_1} = chr_npc
      chr_job = chr_set.chr_jobs.find "#{chr_set._id}_#{face_id}"

      return null unless chr_job
      updated_at = Date.now()
      mestype = "SAY"
      user_id = "master"
      anchor = "0"
      face = Mem.Query.faces.find face_id
      name = "#{chr_job.job} #{face.name}"

      v.npc_says =
        [ m "h3", "プロローグ"
          doc.view.talk {face_id, user_id, anchor, name, mestype, updated_at, log: say_0.deco_text_lf}
          m "h3", "１日目"
          doc.view.talk {face_id, user_id, anchor, name, mestype, updated_at, log: say_1.deco_text_lf}
          m "h3", "参加キャラクター"
        ]

    v.tie.do_draw ->
      { role, gift, extra, mob_type, game_rule, start_auto, player_count, player_count_start } = v.params
      full = [role..., gift...]

      extra = extra.length
      minus = 0
      minus += 2 * Mem.Query.roles.minus2(role).length
      minus += 1 * Mem.Query.roles.minus1(full).length

      wolf = Mem.Query.roles.wolfs(full).length
      human = Mem.Query.roles.humans(role).length - minus
      player = Mem.Query.roles.players(role).length
      robber = Mem.Query.roles.robbers(role).length
      villager = Mem.Query.roles.villagers(role).length
      gift_sides = Mem.Query.roles.gift_sides(gift).length
      gift_items = Mem.Query.roles.gift_items(gift).length
      gift_appends = Mem.Query.roles.gift_appends(gift).length

      drop = player - player_count

      vdoms = []
      vdoms.push "最大 "
      vdoms.push m "span.mark.SSAY", "#{player}人"
      if extra
        vdoms.push m "span.mark.VSAY", "+#{extra}人"

      vdoms.push " が参加できます。"

      v.player_summary = m "div",
        vdoms
        error_and_info v

      switch mob_type
        when "juror"
          role_table_error = "投票する人物が必要です。見物人（陪審）または、決定者を割り当てましょう。" unless extra || ("decide" in gift)

        when "gamemaster"
          mob_type_info = "見物人（黒幕）を割り当てましょう。" unless extra

      switch game_rule
        when "TABULA", "LIVE_TABULA", "TROUBLE"
          role_table_error = "人間(#{human}人)は人狼(#{wolf}人)より多く必要です。" unless 0 < wolf < human

        when "MILLERHOLLOW", "LIVE_MILLERHOLLOW", "MISTERY"
          role_table_error = "村人(#{villager}人)が足りません。" unless 1 < villager
          role_table_error = "人狼(#{wolf}人)が足りません。"     unless 0 < wolf

      if start_auto
        player_count_start_error = "ゲームが開始できません。"     unless     player_count_start <= player_count
        player_count_start_error = "最少催行人数が少なすぎます。" unless 3 < player_count_start

      if game_rule in ["LIVE_TABULA", "LIVE_MILLERHOLLOW"]
        role_table_error = "鱗魚人が勝利できません。" if "dish" in role

      if robber
        role_table_error = "役職(#{player}人)が足りません。盗賊(#{robber}人)には余り札が必要です。"                               if player < player_count
        role_table_error = "人狼(#{wolf}人)が足りません。盗賊(#{robber}人)より多くないと、人狼がいない村になる可能性があります。" if wolf <= robber

      else
        role_table_error = "役職(#{player}人)が足りません。定員以上にしましょう。" if drop < 0

      role_table_error = "光の輪や魔鏡と、能力や勝利条件を付与する恩恵は共存できません。" if (gift_sides + gift_appends) && gift_items
      role_table_error = "能力を加える恩恵と、勝利条件が変わる恩恵は共存できません。"     if gift_sides && gift_appends
      role_table_error = "NPCのために、村人をひとつ入れてください。"                  unless "villager" in role

      role_table_info =
        if 0 < drop
          "役職配布時、余り札（#{drop}枚）は捨て去ります。"

      if human
        human_count =
          if minus
            "#{human}人以上は村人です。"
          else
            "#{human}人は村人です。"

      v.tie.input.player_count_start.error player_count_start_error
      v.tie.input.player_count.info human_count
      v.tie.input.role_table.error role_table_error
      v.tie.input.role_table.info role_table_info
      v.tie.input.mob_type.info mob_type_info


    v.tie.draw()
    add_btn = ({_id, cmd, win, label})->
      v.tie.input[cmd].options[_id] = { _id, label }
      v.tie.input[cmd].item _id,
        className: "WIN_#{win}"

    v.adds =
      human: Mem.Query.roles.is("human").list.map add_btn
      evil:  Mem.Query.roles.is("evil").list.map add_btn
      wolf:  Mem.Query.roles.is("wolf").list.map add_btn
      pixi:  Mem.Query.roles.is("pixi").list.map add_btn
      other: Mem.Query.roles.is("other").list.map add_btn
      gift:  Mem.Query.roles.is("gift").list.map add_btn
      trap:  Mem.Query.traps.show().list.map add_btn
      mob: [
        _id: "mob"
        cmd: "extra"
        win: "NONE"
        label: "見物人"
      ].map add_btn
    v

  view: (v)->
    sets = (method, cmd)->
      m "div",
        v.tie.input[cmd].back()
        GUI.names[method] v.params[cmd], (size, {label, win})->
          if size > 1
            m "span.WIN_#{win}.emboss", "#{label}x#{size}"
          else
            m "span.WIN_#{win}.emboss", "#{label}"

    nindex = 0
    v.tie.draw()
    v.tie.form {},
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
            v.tie.input.vil_name.field()
            v.tie.input.vil_comment.field()
            m "p.mes_date",
              v.tie.input.vil_comment.foot()

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
              v.tie.input.trs_type.field()
              v.tie.input.trs_type.label()

            m "p",
              v.tie.input.rating.field()
              v.tie.input.rating.label()

            m "p",
              v.tie.input.say_count.field()
              v.tie.input.say_count.label()

            v.tie.input.time.field()
            v.tie.input.time.label()
            m "p",
              v.tie.input.interval.field()
              v.tie.input.interval.label()
            m "p",
              v.tie.input.entry_password.field()
              v.tie.input.entry_password.label()

        m ".SSAY.plane",
          m "fieldset.msg",
            m "legend.emboss", "ゲームルール"
            v.tie.input.game_rule.field()
            v.tie.input.game_rule.label()
            for chk in v.tie.input.checkboxes
              m "p",
                chk.field()
                chk.label()

        m ".VSAY.plane",
          m "fieldset.msg",
            m "legend.emboss", "編成"
            m "p",
              v.tie.input.mob_type.field()
              v.tie.input.mob_type.label()

            m "p",
              v.tie.input.role_table.field()

            v.player_summary

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
                  v.tie.input.player_count.field()
                  v.tie.input.player_count.label()
                if v.params.start_auto
                  m "p",
                    v.tie.input.player_count_start.field()
                    v.tie.input.player_count_start.label()

                sets "config", "extra"
                sets "config", "role"
                sets "config", "gift"
                if v.params.seq_event
                  sets "order", "trap"
                else
                  sets "config", "trap"


                m "h6", "村側"
                v.adds.human

                m "h6", "敵方の人間"
                v.adds.evil

                m "h6", "人狼"
                v.adds.wolf

                m "h6", "妖精"
                v.adds.pixi

                m "h6", "その他"
                v.adds.other
                v.adds.mob

                m "h6", "恩恵"
                v.adds.gift

                m "h6", "事件"
                v.adds.trap

          else
            m ".VSAY.plane",
              m "fieldset.msg",
                m "legend.emboss", "編成詳細"
                m "p",
                  v.tie.input.player_count.field()
                  v.tie.input.player_count.label()
                if v.params.start_auto
                  m "p",
                    v.tie.input.player_count_start.field()
                    v.tie.input.player_count_start.label()
                sets "config", "extra"
                sets "config", "role"
                sets "config", "gift"
                if v.params.seq_event
                  sets "order", "trap"
                else
                  sets "config", "trap"

                v.adds.mob

        m ".SSAY.plane",
          m "fieldset.msg",
            m "legend.emboss", "登場人物"
            m "p",
              v.tie.input.chr_npc.field()
              v.tie.input.chr_npc.label()

        v.npc_says
        m ".minilist",
          m "hr.black"
          for o in v.jobs
            m ".chrbox", {key: o.face_id},
              GUI.portrate o.face_id
              m ".bar.live",
          m "hr.black"

        m ".VSAY.plane",
          m "fieldset.msg",
            m "legend.emboss", "決定"
            v.tie.submit "村の作成"
            error_and_info v

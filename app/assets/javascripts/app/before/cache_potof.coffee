new Mem.Rule("potof").schema ->
  @belongs_to "story"
  @belongs_to "event"
  @belongs_to "chr_job"
  @depend_on "message"

  urges = "　①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿"
  win_by_role = (o, query)=>
    for role in o.role by -1
      win = query.find(role)?.win
      return win if win
    "NONE"

  id_list = (query)->
    query.list().map((o)-> o.face_id ).sort()

  @scope (all)->
    full: ->
      delete Mem.messages.has.face.undefined
      delete Mem.messages.has.face.null
      delete Mem.messages.has.face.admin
      delete Mem.messages.has.face.maker
      Object.keys(Mem.messages.has.face).sort()
    potofs: ->
      _.without all.full(), all.others()...
    not_lives: (turn)->
      _.without all.full(), all.lives(turn)...
    not_deads: (turn)->
      _.without all.full(), all.deads(turn)...
    lives: (turn)->
      id_list all.where((o)-> o.hide.dead && turn < o.hide.dead )
    deads: (turn)->
      id_list all.where((o)-> o.hide.dead && o.hide.dead <= turn )
    others: ->
      id_list all.where((o)-> o.hide.other)

    view: (is_desc, order)->
      all.sort is_desc, (o)-> o.order[order]

  @deploy (o)->
    o._id = "#{o.event_id}-#{o.csid}-#{o.face_id}"
    o.user_id ?= o.sow_auth_id
    o.chr_job_id ?= "#{o.csid.toLowerCase()}_#{o.face_id}"

    o.hide = {}

    if o.event_id
      if o.event_id.match /-0$/
        o.live = "leave"
    else
      o.live = "leave"

    chr_job = o.chr_job()
    face = chr_job.face()
    job = if chr_job then chr_job.job else "***"
    name =
      if face
        face.name
      else
        o.name
    o.name =
      if o.zapcount
        "#{RAILS.clearance[o.clearance]}#{name}-#{o.zapcount}"
      else
        name

    stat_at =
      if 0 < o.deathday < Infinity
        "#{o.deathday}日"
      else
        o.deathday = Infinity
        ""

    said_num = o.point.saidcount
    urge     = o.point.actaddpt
    pt_no    = o.say.gsay

    story = o.story()
    event = o.event()

    switch o.live
      when "live"
        pt_no = o.say.say
        o.hide.dead = o.deathday

      when "mob"
        win_juror = 'HUMAN' if ('juror' == story.type.mob)

      when "suddendead"
        win_juror = 'LEAVE'
        o.hide.other = true
        o.hide.dead = o.deathday

      when "leave"
        win_juror = 'LEAVE'
        o.hide.other = true
        pt = 0
        urge = 0
        said_num = 0
      else
        o.hide.dead = o.deathday

    if story.is_epilogue
      pt = "∞"
    else
      say_type = RAILS.saycnt[story.type.say]
      pt =
        switch say_type.COST_SAY
          when "point"
            "#{pt_no}pt"
          when "count"
            "#{pt_no}回"
          else
            "∞"

    select = GUI.name.config o.select
    win_result = "参加"
    zombie = 0x040

    switch story.type.game
      when "TROUBLE"
        win_zombie = 'WOLF' if 0 == (o.rolestate & zombie)
        is_dead_lose = 1    if "HUMAN" == win
      when "LIVE_TABULA", "LIVE_MILLERHOLLOW", "SECRET"
        is_dead_lose = 1


    win_love = RAILS.loves[o.love]?.win

    win_role = win_by_role(o, Mem.roles)
    win = win_juror || win_love || win_zombie || win_role
    win = RAILS.folders[story.folder].evil if win == 'EVIL'
    switch win
      when "LONEWOLF"
        is_dead_lose = 1
      when "HATER"
        is_dead_lose = 1 if ! _.include o.role, "HATEDEVIL"
      when "LOVER"
        is_lone_lose = 1 if ! _.include o.role, "LOVEANGEL"

    if story.is_epilogue
      switch o.live
        when "suddendead", "leave"
          win_result = "―"
        else
          winner = event.winner
          win_result = "敗北"
          win_result = "勝利" if winner == "WIN_" + win
          win_result = "勝利" if winner != "WIN_HUMAN"  && winner != "WIN_LOVER" && "EVIL" == win
          win_result = "勝利" if "victim" == o.live && "DISH" == win
          win_result = "敗北" if is_dead_lose && 'live' != o.live
          win_result = "敗北" if is_lone_lose && _.any o.bonds, (o)-> o.live != 'live' && _.any o.bonds, o.pno
          win_result = "参加" if "NONE" == win

    stat_type = RAILS.live[o.live].name
    stat_order = RAILS.live[o.live].order
    win_side_order = RAILS.wins[win].order
    role_side_order = RAILS.wins[win_role].order

    roles =
      for role in o.role
        GUI.name.config role
    role_text = roles.join("、")

    text = Mem.ables.by_rolestate(o.rolestate).pluck("name")
    text.push "☑" if 'pixi' == o.sheep
    text.push "♥" if 'love' == o.love
    text.push "☠" if 'hate' == o.love
    text.push "<s>♥</s>" if 'love' == o.pseudolove
    text.push "<s>☠</s>" if 'hate' == o.pseudolove
    text_str = text.join()

    o.order =
      stat_at:   [- o.deathday, - stat_order]
      stat_type: [stat_order, - o.deathday]
      said_num: [said_num, pt_no, urge]
      pt:       [pt_no, said_num, urge]
      urge:     [urge, pt_no, said_num]
      win_result: [win_result, win_side_order, text_str, role_text]
      win_side:   [win_side_order, win_result, text_str, role_text]
      role:   [role_side_order, role_text, win_side_order, select, text_str]
      select: [select, role_side_order, role_text, win_side_order, text_str]
      text:   [text_str, win_side_order, role_side_order, role_text, select]

    o.view =
      portrate: GUI.portrate o.face_id
      job: job
      user_id: m "kbd", o.user_id
      stat_at: stat_at
      stat_type: stat_type
      said_num: if said_num then "#{said_num}回" else ""
      pt: pt
      urge: urges[urge] || "∞"
      win: win
      win_result: win_result
      win_side:   RAILS.wins[win].name
      role: role_text
      select: if select then m "kbd", select else ""
      text: text_str

  @map_reduce (o, emit)->

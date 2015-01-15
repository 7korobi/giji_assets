new Cache.Rule("potof").schema ->
  maskstate_order = _.sortBy _.keys(RAILS.maskstates), (o)-> -o
  win_by_role = (o, list)=>
    for role in o.role
      win = list[role]?.win
      return win if win
    null


  @scope (all)->
    view: (desc, order)->
      is_desc = "desc" == desc
      all.sort is_desc, (o)-> o.order[order]

  @deploy (o)->
    o._id = "#{o.event_id}-#{o.csid}-#{o.face_id}"
    o.user_id = o.sow_auth_id

    name = 
      if o.zapcount
        "#{RAILS.clearance[o.clearance]}#{o.name}-#{o.zapcount}"
      else
        o.name

    stat_at = 
      if 0 < o.deathday
        "#{o.deathday}日"
      else
        ""

    said_num = o.point.saidcount
    urge     = o.point.actaddpt
    
    pt_no = 
      if "live" == o.live
        o.say.say
      else
        o.say.gsay
    if o.story_epilogue
      pt = "∞"
    else
      say_type = RAILS.saycnt[o.story_type.say]      
      pt = 
        switch say_type.COST_SAY
          when "point"
            "#{pt_no}pt"
          when "count"
            "#{pt_no}回"
          else
            "∞"

    select = GUI.name.config o.select
    stat_type = RAILS.live[o.live].name
    stat_order = RAILS.live[o.live].order
    win_result = "参加"
    zombie = 0x040

    switch o.story_type.game
      when "TROUBLE"
        win_zombie = 'WOLF' if 0 == (o.rolestate & zombie)
        is_dead_lose = 1    if "HUMAN" == win
      when "LIVE_TABULA", "LIVE_MILLERHOLLOW", "SECRET"
        is_dead_lose = 1

    switch o.live
      when "mob"
        win_juror = 'HUMAN' if ('juror' == o.story_type.mob)
      when "suddendead"
        win_result = ""

    win_love = RAILS.loves[o.love]?.win

    win_role = win_by_role(o, RAILS.gifts) || win_by_role(o, RAILS.roles) || "NONE"
    win = win_juror || win_love || win_zombie || win_role
    win = RAILS.folders[o.story_folder].evil if win == 'EVIL'
    switch win
      when "LONEWOLF"
        is_dead_lose = 1
      when "HATER"
        is_dead_lose = 1 if ! _.include o.role, "HATEDEVIL"
      when "LOVER"
        is_lone_lose = 1 if ! _.include o.role, "LOVEANGEL"

    if o.story_epilogue && "suddendead" != o.live
      winner = o.event_winner
      win_result = "敗北"
      win_result = "勝利" if winner == "WIN_" + win
      win_result = "勝利" if winner != "WIN_HUMAN"  && winner != "WIN_LOVER" && "EVIL" == win
      win_result = "勝利" if "victim" == o.live && "DISH" == win
      win_result = "敗北" if is_lone_lose && _.any @potofs, (o)-> o.live != 'live' && _.any o.bonds, o.pno
      win_result = "敗北" if is_dead_lose && 'live' != @live
      win_result = "参加" if "NONE" == win
    role_side_order = RAILS.wins[win_role].order
    win_side_order = RAILS.wins[win].order

    roles = 
      for role in o.role
        GUI.name.config role
    role_text = roles.join("、")

    text = []
    if o.rolestate?
      rolestate = o.rolestate
      for mask in maskstate_order
        if 0 == (rolestate & mask)
          state = RAILS.maskstates[mask]
          text.push "#{state} " if state
          rolestate |= mask
    text.push "☑" if 'pixi' == o.sheep
    text.push "♥" if 'love' == o.love
    text.push "☠" if 'hate' == o.love
    text.push "<s>♥</s>" if 'love' == o.pseudolove
    text.push "<s>☠</s>" if 'hate' == o.pseudolove
    text_str = text.join()

    o.order =
      stat_at:   [o.deathday, stat_order]
      stat_type: [stat_order, o.deathday]
      said_num: [said_num, pt_no, urge]
      pt:       [pt_no, said_num, urge]
      urge:     [urge, pt_no, said_num]
      win_result: [win_result, win_side_order, text_str, role_text]
      win_side:   [win_side_order, win_result, text_str, role_text]
      role:   [role_side_order, role_text, win_side_order, select, text_str]
      select: [select, role_side_order, role_text, win_side_order, text_str]
      text:   [text_str, win_side_order, role_side_order, role_text, select]

    chr_job = Cache.chr_jobs.find("#{o.csid.toLowerCase()}_#{o.face_id}")
    job = if chr_job then chr_job.job else "***"
    o.view = 
      portrate: GUI.portrate o.face_id
      job: job
      user_id: m "kbd", o.user_id
      stat_at: stat_at
      stat_type: stat_type
      said_num: "#{said_num}回"
      pt: pt
      urge: String.fromCharCode(if urge then 9311 + urge else 3000)
      win: win
      win_result: win_result
      win_side:   RAILS.wins[win].name 
      role: role_text
      select: if select then m "kbd", select else ""
      text: text_str

  has_face = {}
  Cache.potofs.has_face = has_face
  @map_reduce (o, emit)->
    has_face[o.face_id] = o

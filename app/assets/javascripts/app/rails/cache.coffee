new Cache.Rule("map_face").schema ->
  @belongs_to "face", dependent: true
  @scope (all)->
    active: (order, chr_set, search)->
      order = RAILS.map_faces_orders[order].order
      all.in(chr_set_ids: chr_set).search(search).sort "desc", (o)->
        o.win.value[order] ?= 0

  @deploy (o)-> 
    o._id = o.face_id
    o.win.value.合計 = o.win.all

    list = Cache.chr_jobs.face(o.face_id).list()
    if list
      o.search_words =
        for chr_job in list
          chr_job.job 
      o.chr_set_ids =
        for chr_job in list
          chr_job.chr_set_id 
    else
      o.search_words = o.chr_set_ids = []

    o.search_words.push o.face.name
    for sow_auth_id of o.sow_auth_id.value
      o.search_words.push sow_auth_id

  @map_reduce (o, emit)->
    item = 
      count: 1
    for id in o.chr_set_ids
      emit "chr_set", id, item

new Cache.Rule("map_face_story_log").schema ->
  @order (o)-> o.date.max

  @deploy (o)->
    o._id = o.logid_head
    o.folder = o.logid_head.split("-")[0].toUpperCase()


new Cache.Rule("item").schema ->
  @deploy (o)->
    o.updated_timer ?= new Timer o.updated_at,
      prop: ->


new Cache.Rule("message").schema ->
  @order "updated_at"
  @belongs_to "face"
  @belongs_to "event"
  @belongs_to "sow_auth"

  is_show = 
    home:
      village:     0b1110000000
      cast:        0b0110000000
      announce:    0b0010000000
    warning:
      all:         0b0001000000
    talk:
      open:        0b0000100000
      clan:        0b0000110000
      think:       0b0000101000
      all:         0b0000111000
    memo:
      open:        0b0000000100
      clan:        0b0000000110
      think:       0b0000000101
      all:         0b0000000111

  bit = 
    VILLAGE:       0b1110000000
    CAST:          0b0110100000
    INFO:          0b0010000000
    ACTION:        0b0001111000
    TALK:          0b0000111000
    MEMO:          0b0000000111

  mask =
    ALL:           0b1111111111
    NOT_OPEN:      0b1111011011
    CLAN:          0b1111010010
    THINK:         0b1111001001
    DELETE:        0b0000001001

  @scope (all)->
    home: (mode)->
      all.where (o)-> o.show & is_show.home[mode]

    talk: (mode, open, search)->
      show_search = is_show.talk[mode]
      show_search &= mask.NOT_OPEN unless open
      query = all.where (o)-> o.show & show_search
      query.search search

    memo: (mode, uniq, search)->
      query = all.where (o)-> o.show & is_show.memo[mode]
      query = query.distinct("pen", "max_is") if uniq
      query.search search

    warning: ->
      all.where (o)-> o.show & is_show.warning.all

    after: (updated_at)->
      query = all.where (o)-> updated_at <= o.updated_at

#    event: (event_id, search)->
#      query = all.where (o)-> event_id == o.event_id 
#      query.search search

  @deploy (o)-> 
    o._id = o.event_id + "-" + o.logid
    anchor_num  = o.logid[2..-1] - 0 || 0
    o.anchor = RAILS.log.anchor[o.logid[0]] + anchor_num || ""
    o.pen = "#{o.logid[0..1]}-#{o.face_id}"

    o.updated_at ?= new Date(o.date) - 0
    o.updated_timer ?= new Timer o.updated_at,
      prop: ->
    delete o.date

    vdom = GUI.message.xxx
    o.show =
      switch
        when o.logid.match /^vilinfo/
          vdom = GUI.story
          bit.VILLAGE
        when o.logid.match /^potofs/
          vdom = GUI.potofs
          bit.CAST
        when o.logid.match /^.[I]/
          vdom = GUI.message.info
          bit.TALK | bit.INFO
        when o.logid.match /^.[SX]/
          vdom = GUI.message.talk
          bit.TALK
        when o.logid.match /^.[M]/
          vdom = GUI.message.memo
          bit.MEMO
        else
          0

    o.show |=
      switch
        when o.mestype == "MAKER"
          vdom = GUI.message.admin
          bit.INFO
        when o.mestype == "ADMIN"
          vdom = GUI.message.admin
          bit.INFO
        else
          0

    if o.logid.match /^.[AB]/
      vdom = GUI.message.action
      o.show |= bit.ACTION

    o.show &=
      switch
        when o.logid.match /^([D].\d+)/
          mask.DELETE
        when o.logid.match /^([Ti].\d+)/
          mask.THINK
        when o.logid.match /^([\-WPX].\d+)/
          mask.CLAN
        else
          mask.ALL

    o.vdom = vdom

    o.search_words = [o.log]

  @map_reduce (o, emit)->
    item = 
      count: 1
      max: o.updated_at
      min: o.updated_at

    emit "event", o.event_id, item
    emit "pen", o.pen, item

new Cache.Rule("potof").schema ->
  maskstate_order = _.sortBy _.keys(RAILS.maskstates), (o)-> -o

  @deploy (o)->
    o._id = "#{o.event_id}-#{o.csid}-#{o.face_id}"

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
    pt = 
      if "live" == o.live
        o.say.say
      else
        o.say.gsay

    (o)->
      win_by_role = (list)=>
        for role in @role
          win = list[role]?.win
          return win if win
        null
      (story, events, event)->
        win_result = "参加"
        zombie = 0x040

        switch o.live
          when "mob"
            win_juror = 'HUMAN' if ('juror' == story.type.mob)
          when "suddendead"
            win_result = ""

        win_love = RAILS.loves[o.love]?.win

        win = win_juror || win_love || win_zombie || win_by_role(RAILS.gifts) || win_by_role(RAILS.roles) || "NONE"
        win = RAILS.folders[story.folder].evil if win == 'EVIL'
        switch win
          when "LONEWOLF"
            is_dead_lose = 1
          when "HATER"
            is_dead_lose = 1 if ! _.include o.role, "HATEDEVIL"
          when "LOVER"
            is_lone_lose = 1 if ! _.include o.role, "LOVEANGEL"

        switch story.type.game
          when "TROUBLE"
            win_zombie = 'WOLF' if 0 == (o.rolestate & zombie)
            is_dead_lose = 1    if "HUMAN" == win
          when "LIVE_TABULA", "LIVE_MILLERHOLLOW", "SECRET"
            is_dead_lose = 1

        if story.is_finish && ! RAILS.folders[story.folder].role_play
          winner = event.winner || events? && _.last(events)?.winner
          win_result = "敗北"
          win_result = "勝利" if winner == "WIN_" + win
          win_result = "勝利" if winner != "WIN_HUMAN"  && winner != "WIN_LOVER" && "EVIL" == win
          win_result = "勝利" if "victim" == o.live && "DISH" == win
          win_result = "敗北" if is_lone_lose && _.any @potofs, (o)-> o.live != 'live' && _.any o.bonds, o.pno
          win_result = "敗北" if is_dead_lose && 'live' != @live
          win_result = "参加" if "NONE" == win

    roles = 
      for role in o.role
        GUI.name.config role

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

    o.view = 
      portrate: GUI.portrate o.face_id
      job: Cache.chr_jobs.find("#{o.csid.toLowerCase()}_#{o.face_id}").job
      name: name
      sow_auth_id: m "kbd", o.sow_auth_id
      stat_at: stat_at
      stat_type: RAILS.live[o.live]
      said_num: "#{o.point.saidcount}回"
      pt: "#{pt}pt"
      win: "" # win_result
      win_side: "" # RAILS.wins[win].name
      role: roles.join("、")
      select: m "kbd", GUI.name.config o.select
      text: o.text

new Cache.Rule("event").schema ->

new Cache.Rule("story").schema ->
  @scope (all)->
    menu: (folder, game, rating, event_type, role_type, say_limit, player_length, update_at, update_interval, search)->
      all.search(search).where (o)->
        tf = true
        tf &&= o.folder == folder if folder != "all"
        tf &&= o.rating == rating if rating != "all"
        tf &&= o.type.game == game if game != "all"
        tf &&= o.view.say_limit == say_limit if say_limit != "all"
        tf &&= o.view.update_at == update_at if update_at != "all"
        tf &&= o.view.player_length == Number(player_length) if player_length != "all"
        tf &&= o.view.update_interval == update_interval if update_interval != "all"
        tf &&= o.view.role_types.find((v)-> v == role_type) if role_type != "all"
        tf &&= o.view.event_types.find((v)-> v == event_type) if event_type != "all"
        tf

  caption = (field, key)->
    data = field[key]
    if data
      data.CAPTION
    else
      null

  all_events = Object.keys RAILS.events

  @deploy (o)->
    o.rating = "default" unless o.rating
    o.card.role = _.difference o.card.config, all_events
    o.view = 
      rating:
        m "img",
          src: GUI.img_head + "/icon/cd_#{o.rating}.png"
      update_at:
        Timer.hhmm(o.upd.hour, o.upd.minute)
      update_interval:
        "#{o.upd.interval * 24}時間"
      player_length:
        o.vpl.last
      role_types:
        GUI.names.config o.card.role, (name, size)-> name
      event_types:
        GUI.names.config o.card.event, (name, size)-> name
      role_cards:
        GUI.names.config o.card.role, (name, size)->
          m "kbd", "#{name}x#{size}"
      event_cards:
        GUI.names.config o.card.event, (name, size)->
          m "kbd", "#{name}x#{size}"
      say_limit: RAILS.saycnt[   o.type.say ]?.CAPTION || "――"
      game_rule: RAILS.game_rule[o.type.game]?.CAPTION || "タブラの人狼"

    o.search_words = [o.name]

  @map_reduce (o, emit)->
    item = 
      count: 1
    emit "all", "all", item
    emit "folder", o.folder, item
    emit "game", o.type.game, item
    emit "rating", o.rating, item
    emit "say_limit", o.view.say_limit, item
    emit "update_at", o.view.update_at, item
    emit "update_interval", o.view.update_interval, item
    emit "player_length", o.view.player_length, item
    for role_type in o.view.role_types
      emit "role_type", role_type, item
    for event_type in o.view.event_types
      emit "event_type", event_type, item

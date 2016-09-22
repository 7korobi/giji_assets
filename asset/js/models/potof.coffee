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
    query.pluck("face_id")

  @scope (all)->
    full: ->
      delete Mem.Query.messages.has.face.undefined
      delete Mem.Query.messages.has.face.null
      delete Mem.Query.messages.has.face.admin
      delete Mem.Query.messages.has.face.maker
      Object.keys(Mem.Query.messages.has.face).sort()
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
      if is_desc
        all.sort (o)-> - o.order[order]
      else
        all.sort (o)-> o.order[order]

  class @model extends @model
    constructor: ->
      if @sow?
        @role = [Mem.Query.roles.sow_role(@sow.role)._id, Mem.Query.roles.sow_gift(@sow.gift)._id]
        @select = Mem.Query.roles.sow_role(@sow.selrole)._id

      @_id = @_id.$oid if @_id?.$oid?
      @user_id ?= @sow_auth_id
      @chr_job_id ?= "#{@csid.toLowerCase()}_#{@face_id}"

      chr_job = @chr_job
      if chr_job?
        name = chr_job.face?.name
        job = chr_job.job
      else
        job = "***"
      name ?= @name
      @name =
        if @zapcount
          "#{RAILS.clearance[@clearance]}#{name}-#{@zapcount}"
        else
          name


      @hide = {}

      ###
      if @event_id
        if @event_id.match /-0$/
          @live = "leave"
      else
        @live = "leave"
      ###

      stat_at =
        if 0 < @deathday < Infinity
          "#{@deathday}日"
        else
          @deathday = Infinity
          ""

      said_num = @point.saidcount
      urge     = @point.actaddpt
      pt_no    = @say.gsay

      { story, event } = @

      switch @live
        when "live"
          pt_no = @say.say
          @hide.dead = @deathday

        when "mob"
          win_juror = 'HUMAN' if ('juror' == story.type.mob)

        when "suddendead"
          win_juror = 'LEAVE'
          @hide.other = true
          @hide.dead = @deathday

        when "leave"
          win_juror = 'LEAVE'
          @hide.other = true
          pt = 0
          urge = 0
          said_num = 0
        else
          @hide.dead = @deathday

      if story.is_epilogue
        pt = "∞"
      else
        say_type = Mem.conf.say[story.type.say]
        pt =
          switch say_type.COST_SAY
            when "point"
              "#{pt_no}pt"
            when "count"
              "#{pt_no}回"
            else
              "∞"

      select = GUI.name.config @select
      win_result = "参加"
      zombie = 0x040

      switch story.type.game
        when "TROUBLE"
          win_zombie = 'WOLF' if 0 == (@rolestate & zombie)
          is_dead_lose = 1    if "HUMAN" == win
        when "LIVE_TABULA", "LIVE_MILLERHOLLOW", "SECRET"
          is_dead_lose = 1


      win_love = RAILS.loves[@love]?.win

      win_role = win_by_role @, Mem.Query.roles
      win = win_juror || win_love || win_zombie || win_role
      win = story.evil if win == 'EVIL'
      switch win
        when "LONEWOLF"
          is_dead_lose = 1
        when "HATER"
          is_dead_lose = 1 unless _.includes @role, "HATEDEVIL"
        when "LOVER"
          is_lone_lose = 1 unless _.includes @role, "LOVEANGEL"

      if story.is_epilogue
        switch @live
          when "suddendead", "leave"
            win_result = "―"
          else
            winner = event.winner
            win_result = "敗北"
            win_result = "勝利" if winner == "WIN_" + win
            win_result = "勝利" if winner != "WIN_HUMAN"  && winner != "WIN_LOVER" && "EVIL" == win
            win_result = "勝利" if "victim" == @live && "DISH" == win
            win_result = "敗北" if is_dead_lose && 'live' != @live
            win_result = "敗北" if is_lone_lose && _.some @bonds, (o)-> o.live != 'live' && _.some @bonds, @pno
            win_result = "参加" if "NONE" == win

      stat_type = Mem.conf.live[@live].label
      stat_order = Mem.conf.live[@live].order
      win_side_order = Mem.conf.winner["WIN_" + win].order
      role_side_order = Mem.conf.winner["WIN_" + win_role].order

      roles =
        for role in @role
          GUI.name.config role
      role_text = roles.join("、")

      text = Mem.Query.ables.by_rolestate(@rolestate).pluck("name")
      text.push '<span class="icon-music"></span>' if 'pixi' == @sheep
      text.push '<span class="icon-heart"></span>' if 'love' == @love
      text.push '<span class="icon-scissors"></span>' if 'hate' == @love
      text.push '<span class="icon-heart    del"></span>' if 'love' == @pseudolove
      text.push '<span class="icon-scissors del"></span>' if 'hate' == @pseudolove
      text_str = text.join()

      @order =
        stat_at:   [- @deathday, - stat_order]
        stat_type: [stat_order, - @deathday]
        said_num: [said_num, pt_no, urge]
        pt:       [pt_no, said_num, urge]
        urge:     [urge, pt_no, said_num]
        win_result: [win_result, win_side_order, text_str, role_text]
        win_side:   [win_side_order, win_result, text_str, role_text]
        role:   [role_side_order, role_text, win_side_order, select, text_str]
        select: [select, role_side_order, role_text, win_side_order, text_str]
        text:   [text_str, win_side_order, role_side_order, role_text, select]

      @view =
        portrate: GUI.portrate @face_id
        job: job
        user_id: m "kbd", @user_id
        stat_at: stat_at
        stat_type: stat_type
        said_num: if said_num then "#{said_num}回" else ""
        pt: pt
        urge: urges[urge] || "∞"
        win: win
        win_result: win_result
        win_side:   Mem.conf.winner["WIN_" + win].name
        role: role_text
        select: if select then m "kbd", select else ""
        text: text_str

      @form =
        _id: @pno


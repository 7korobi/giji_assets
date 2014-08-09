class Timer
  @week = ["日","月","火","水","木","金","土"]
  @dow = (dow)->
    Timer.week[dow]


  @hh = _.memoize (hh)->
    tt = ["午前","午後"][ Math.floor hh / 12 ]
    hh = hh % 12
    hh = "0" + hh if hh < 10
    "#{tt}#{hh}時"


  @hhmm = _.memoize (hh, mi)->
    mi = "0" + mi if mi < 10
    "#{Timer.hh(hh)}#{mi}分"


  @time_stamp = _.memoize (date)->
    return "(？) ？？..時..分" unless date

    now = new Date(date)
    hh = now.getHours();
    mi = now.getMinutes();
    dow = Timer.dow now.getDay()
    mm = "0" + mm if mm < 10
    dd = "0" + dd if dd < 10
    "(#{dow}) #{Timer.hhmm(hh,mi)}"


  @date_time_stamp = _.memoize (date)->
    return "....-..-..(？？？) --..時頃" unless date

    now = new Date(date - -15*60000)
    yyyy = now.getFullYear();
    mm = now.getMonth() + 1;
    dd = now.getDate();
    dow = Timer.dow now.getDay()
    hh = now.getHours();
    mi = now.getMinutes();
    postfix = ["頃","半頃"][Math.floor mi/30]

    mm = "0" + mm if mm < 10
    dd = "0" + dd if dd < 10

    "#{yyyy}-#{mm}-#{dd} (#{dow}) #{Timer.hh(hh)}#{postfix}"


  constructor: (@at, options = {})->
    for key, val of options
      @[key] = val

    tick = (@text, sec_span = Number.NaN)=>
      msec_span = sec_span * 1000
      msec_span - (@msec % msec_span)

    do_tick = =>
      @msec = _.now() - Number @at
      tick_time = @next(@msec / 1000, tick)
      @timer_id = 
        if tick_time
          setTimeout do_tick, tick_time
        else
          0
      @draw @text

    do_tick()


  abort: ->
    clearTimeout @timer_id if @timer_id


  next: (second, tick)->
    if 0 < second
      minute = Math.ceil(  second /   60)
      hour   = Math.ceil(  second / 3600)
    if second < 0
      minute = Math.ceil(- second /   60)
      hour   = Math.ceil(- second / 3600)

    limit = 3 * 60 * 60
    return tick "25秒以内",                   25 if    -25 < second <     25
    return tick "1分以内",                    60 if    -60 < second <     60

    return tick "#{minute}分後",              30 if  -3600 < second < 0
    return tick "#{minute}分前",              60 if      0 < second <   3600

    return tick "#{hour}時間後",              60 if -limit < second < 0
    return tick "#{hour}時間前",            3600 if      0 < second < limit

    return tick Timer.date_time_stamp(@at), 3600 if          second < -limit
    return tick Timer.date_time_stamp(@at)       if  limit < second


  draw: ->

###
log.updated = new Timer log.updated_at,
  draw: (text)->
    log.elm = $("." + log._id)
    log.elm.find("[time]").html text

log.cancel_btn = 
  if log.logid? && "q" == log.logid[0]
    new Timer log.updated_at,
      next: (second, tick)->
        return tick """<span cancel_btn>なら削除できます。<a hogan-click='cancel_say("#{@logid}")()' class="btn btn-danger click glyphicon glyphicon-trash"></a></span>""", 25 if -25 < second < 25
        return tick ""
      draw: (text)->
        log.elm = $("." + log._id)
        log.elm.find("[cancel_btn]").html text
  else
    text: ""
###


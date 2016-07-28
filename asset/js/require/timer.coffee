_ = require "lodash"

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
    return "....-..-.. (？) ？？..時頃" unless date

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

  @cache = {}
  @fetch = (at)->
    Timer.cache[at] ?= new Timer at

  @tick = (cb)->
    action = ->
#      m.startComputation()
      tick = cb Date.now()
      if tick
        setTimeout ->
          action()
        , tick
#      m.endComputation()
    action()


  constructor: (@at)->

  start: (bind)->
    @tick = (now)=>
      @msec = (now - @at)
      @next @msec / 1000, (@text, sec_span = Number.NaN)=>
        return 0 unless bind.update
        bind.update @text

        msec_span = sec_span * 1000
        diff = @msec % msec_span
        if 0 < diff
          msec_span - diff
        else
          1 - diff
    Timer.tick @tick

  next: (second, tick)->
    if 0 < second
      minute = Math.floor(  second /   60)
      hour   = Math.floor(  second / 3600)
    if second < 0
      minute = Math.floor(- second /   60)
      hour   = Math.floor(- second / 3600)

    limit = 3 * 60 * 60
    return tick      "25秒以内",              25 if    -25 < second <     25
    return tick       "1分以内",              60 if      0 < second <     60

    return tick       "1分以内",              25 if    -60 < second <      0

    return tick "#{minute}分後",              60 if  -3600 < second <      0
    return tick "#{minute}分前",              60 if      0 < second <   3600

    return tick "#{hour}時間後",            3600 if -limit < second <      0
    return tick "#{hour}時間前",            3600 if      0 < second <  limit

    return tick Timer.date_time_stamp(@at), 3600 if          second < -limit
    return tick Timer.date_time_stamp(@at)       if  limit < second


module.exports = { Timer }
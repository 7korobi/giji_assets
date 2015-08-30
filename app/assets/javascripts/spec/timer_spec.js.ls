expect = chai.expect

describe "Timer" (...)!->
  describe "module" (...)!->
    it "time_stamp" ->
      expect(Timer.time_stamp 1400000000000).to.eq "(水) 午前01時53分"
      expect(Timer.time_stamp  Number.NaN  ).to.eq "(？) ？？..時..分"
      expect(Timer.time_stamp 1400000000000).to.eq "(水) 午前01時53分"

    it "date_time_stamp" !->
      expect(Timer.date_time_stamp 1400000000000).to.eq "2014-05-14 (水) 午前02時頃"
      expect(Timer.date_time_stamp  Number.NaN  ).to.eq "....-..-.. (？) ？？..時頃"
      expect(Timer.date_time_stamp 1400000000000).to.eq "2014-05-14 (水) 午前02時頃"

  describe "object" (...)!->
    it "show lax time" !->
      clock = sinon.useFakeTimers(0)
      attr =
        onunload: ->
        update: (text)->
      (t = new Timer(clock.now - 10800000    )) && t.start(attr) && expect(t.text).to.not.eq "3時間前"
      (t = new Timer(clock.now - 10800000 + 2)) && t.start(attr) && expect(t.text).to.eq "2時間前"
      (t = new Timer(clock.now -  3600000    )) && t.start(attr) && expect(t.text).to.eq "1時間前"
      (t = new Timer(clock.now -  3600000 + 2)) && t.start(attr) && expect(t.text).to.eq "59分前"
      (t = new Timer(clock.now -   120000    )) && t.start(attr) && expect(t.text).to.eq "2分前"
      (t = new Timer(clock.now -    60000    )) && t.start(attr) && expect(t.text).to.eq "1分前"
      (t = new Timer(clock.now -    60000 + 2)) && t.start(attr) && expect(t.text).to.eq "1分以内"
      (t = new Timer(clock.now -    25000    )) && t.start(attr) && expect(t.text).to.eq "1分以内"
      (t = new Timer(clock.now -    25000 + 2)) && t.start(attr) && expect(t.text).to.eq "25秒以内"
      (t = new Timer(clock.now +    25000 - 2)) && t.start(attr) && expect(t.text).to.eq "25秒以内"
      (t = new Timer(clock.now +    25000    )) && t.start(attr) && expect(t.text).to.eq "1分以内"
      (t = new Timer(clock.now +    60000 - 2)) && t.start(attr) && expect(t.text).to.eq "1分以内"
      (t = new Timer(clock.now +    60000    )) && t.start(attr) && expect(t.text).to.eq "1分後"
      (t = new Timer(clock.now +   120000    )) && t.start(attr) && expect(t.text).to.eq "2分後"
      (t = new Timer(clock.now +  3600000 - 2)) && t.start(attr) && expect(t.text).to.eq "59分後"
      (t = new Timer(clock.now +  3600000    )) && t.start(attr) && expect(t.text).to.eq "1時間後"
      (t = new Timer(clock.now + 10800000 - 2)) && t.start(attr) && expect(t.text).to.eq "2時間後"
      (t = new Timer(clock.now + 10800000    )) && t.start(attr) && expect(t.text).to.not.eq "3時間後"
      clock.restore()

    it "show lax time by tick" !->
      clock = sinon.useFakeTimers(0)

      GUI.do_tick = (cb)->
        action = ->
          tick = cb(clock.now)
          if tick
            clock.setTimeout ->
              action()
            , tick
        action()

      attr =
        onunload: ->
        update: (text)->
      timer = new Timer(clock.now + 10800000)
      timer.start attr

      clock.tick(   7200000) && expect(timer.text).to.eq "1時間後"
      clock.tick(     60000) && expect(timer.text).to.eq "59分後"
      clock.tick(58 * 60000) && expect(timer.text).to.eq "1分後"
      clock.tick(         1) && expect(timer.text).to.eq "1分以内"
      clock.tick(     35000) && expect(timer.text).to.eq "25秒以内"
      clock.tick(     49998) && expect(timer.text).to.eq "25秒以内"
      clock.tick(     35000) && expect(timer.text).to.eq "1分以内"
      clock.tick(         1) && expect(timer.text).to.eq "1分前"
      clock.tick(58 * 60000) && expect(timer.text).to.eq "59分前"
      clock.tick(     60000) && expect(timer.text).to.eq "1時間前"
      clock.restore()

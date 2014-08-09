describe "Timer", ->
  beforeEach (done)->
    setTimeout ->
      done()
    , 0
  describe "module", ->
    it "time_stamp", (done)->
      expect(Timer.time_stamp 1400000000000).toEqual "(水) 午前01時53分"
      expect(Timer.time_stamp Number.NaN).toEqual "(？) ？？..時..分"
      expect(Timer.time_stamp 1400000000000).toEqual "(水) 午前01時53分"
      done()

    it "date_time_stamp", (done)->
      expect(Timer.date_time_stamp 1400000000000).toEqual "2014-05-14 (水) 午前02時頃"
      expect(Timer.date_time_stamp Number.NaN).toEqual "....-..-..(？？？) --..時頃"
      expect(Timer.date_time_stamp 1400000000000).toEqual "2014-05-14 (水) 午前02時頃"
      done()

  describe "object", ->
    it "show lax time", (done)->
      jasmine.clock().install()
      jasmine.clock().tick(0)
      jasmine.clock().uninstall()
      expect(new Timer(_.now() - 10800000).text).not.toEqual "3時間前"
      expect(new Timer(_.now() -  3600000).text).toEqual "1時間前"
      expect(new Timer(_.now() -   120000).text).toEqual "2分前"
      expect(new Timer(_.now() -    60000).text).toEqual "1分前"
      expect(new Timer(_.now() -    59999).text).toEqual "1分以内"
      expect(new Timer(_.now() -    24999).text).toEqual "25秒以内"
      expect(new Timer(_.now() +    24999).text).toEqual "25秒以内"
      expect(new Timer(_.now() +    59999).text).toEqual "1分以内"
      expect(new Timer(_.now() +    60000).text).toEqual "1分後"
      expect(new Timer(_.now() +   120000).text).toEqual "2分後"
      expect(new Timer(_.now() +  3600000).text).toEqual "1時間後"
      expect(new Timer(_.now() + 10800000).text).not.toEqual "3時間後"
      done()

    it "show lax time by tick", (done)->
      done()
      jasmine.clock().install()
      timer = new Timer(_.now() + 10800000)
      jasmine.clock().tick(   7200000) && expect(timer.text).toEqual "1時間後"
      jasmine.clock().tick(     60000) && expect(timer.text).toEqual "59分後"
      jasmine.clock().tick(58 * 60000) && expect(timer.text).toEqual "1分後"
      jasmine.clock().tick(         1) && expect(timer.text).toEqual "1分以内"
      jasmine.clock().tick(     35000) && expect(timer.text).toEqual "25秒以内"
      jasmine.clock().tick(     49998) && expect(timer.text).toEqual "25秒以内"
      jasmine.clock().tick(     35000) && expect(timer.text).toEqual "1分以内"
      jasmine.clock().tick(         1) && expect(timer.text).toEqual "1分前"
      jasmine.clock().tick(58 * 60000) && expect(timer.text).toEqual "59分前"
      jasmine.clock().tick(     60000) && expect(timer.text).toEqual "1時間前"
      jasmine.clock().uninstall()





describe "Mem.Query.ables" (...)!->
  do_test_selects = (able)->
    it "#{able._id}" (...)!->
      expect(<[prologue start main epilogue]>).to.include.members Object.keys able.at
      expect(able.change).to.exist

  describe "has switch" (...)!->
    for role in Mem.Query.ables.where((o)-> o.sw? ).list
      do_test_selects(role)

  describe "has target" (...)!->
    for role in Mem.Query.ables.where((o)-> o.target? ).list
      do_test_selects(role)

  describe "has targets" (...)!->
    for role in Mem.Query.ables.where((o)-> o.targets? ).list
      do_test_selects(role)


describe "(sow) Mem.roles" (...)!->
  do_test_mob = (role)->
    it "#{role.name}" (...)!->
      expect(role.ables).to.include.members ["VSAY"]

  describe " has VSAY" (...)!->
    for role in Mem.roles.where(group: "MOB").list
      do_test_mob(role)

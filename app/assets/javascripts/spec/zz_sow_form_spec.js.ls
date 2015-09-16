
describe "(sow) Mem.forms" (...)!->
  for_all_forms = (call)->
    for live in <[live executed victim cursed droop suicide feared suddendead]>
      live_name = Mem.roles.find(live).name
      for turn in <[prologue start main epilogue]>
        it "#{live_name} #{turn}" (...)!->
          for role in Mem.roles.list()
            for enemy in <[evil wolf]>
              for mob in <[visiter grave alive juror gamemaster]>
                Mem.rule.form.set [
                  enemy: enemy
                  turn: turn
                  live: live
                  face_id: "c99"
                  _id: "SAY-1"
                  win: role.win || "NONE"
                  mob: "visiter"
                  role: [role._id]
                  rolestate: 0x76f
                  sheep: []
                  love: null
                ]
                form = Mem.forms.list().first
                call form

  describe "can input text" (...)!->
    for_all_forms (form)->
      expect ->
        GUI.message.form form
      .to.not.throw()
      expect(form.form).to.contain.all.keys "TSAY"
      expect(form.form).to.contain.any.keys "SAY", "GSAY"

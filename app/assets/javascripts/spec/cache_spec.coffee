new Cache.Replace site:  []
new Cache.Append scene: ["site"]
new Cache.Append message: ["scene"]

scene1 = ID.now()
scene2 = ID.now()
msg1 = ID.now()
msg2 = ID.now()
msg3 = ID.now()
msg4 = ID.now()

Cache.rule.site.set [
  id: "a"
  title: "α complex"
,
  id: "b"
  title: "β complex"
]
Cache.rule.scene.set [
  id: scene1
  site_id: "a"
  title: "7korobi-say"
,
  id: scene2
  site_id: "b"
  title: "7korobi-say"
]
Cache.rule.message.set [
  id: msg1
  scene_id: scene1
  name: "7korobi"
  text: "text 1"
  created_at: Number new Date(1)
,
  id: msg2
  scene_id: scene2
  name: "7korobi"
  text: "text 2"
  created_at: Number new Date(2)
,
  id: msg3
  scene_id: scene2
  name: "7korobi"
  text: "text 3"
  created_at: Number new Date(3)
]

describe "Cache", ->
  beforeEach (done)->
    setTimeout ->
      done()
    , 1
  describe "append items", ->
    it "replace log", (done)->
      expect(Cache.data.messages.length).toEqual 3
      expect(Cache.where.first(order: "created_at").text).toEqual "text 1"
      Cache.rule.message.set [
        id: msg1
        scene_id: scene1
        name: "7korobi"
        text: "text 4"
        created_at: Number new Date(1)
        updated_at: Number new Date(4)
      ]
      done()
      expect(Cache.data.messages.length).toEqual 3
      expect(Cache.where.first(order: "updated_at").text).toEqual "text 4"

    it "append log", (done)->
      expect(Cache.data.messages.length).toEqual 3
      Cache.rule.message.set [
        id: msg4
        scene_id: scene2
        name: "7korobi"
        text: "text 5"
        created_at: Number new Date(5)
      ]
      done()
      expect(Cache.data.messages.length).toEqual 4

    it "show window", (done)->
      expect(Cache.where(site_id: "a").all("message", order: "updated_at").length).toEqual 1
      done()
      
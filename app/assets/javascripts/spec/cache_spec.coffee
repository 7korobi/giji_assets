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
  created_at: 1
  updated_at: 1
,
  id: msg2
  scene_id: scene2
  name: "7korobi"
  text: "text 2"
  created_at: 2
  updated_at: 2
,
  id: msg3
  scene_id: scene2
  name: "7korobi"
  text: "text 3"
  created_at: 3
  updated_at: 3
]

describe "Cache", ->
  beforeEach (done)->
    setTimeout ->
      done()
    , 1
  describe "append items", ->
    it "replace log", (done)->
      expect(Cache.messages().value().length).toEqual 3
      expect(Cache.messages().sortBy("created_at").first().value().text).toEqual "text 1"
      Cache.rule.message.set [
        id: msg1
        scene_id: scene1
        name: "7korobi"
        text: "text 4"
        created_at: 1
        updated_at: 4
      ]
      done()
      expect(Cache.messages().value().length).toEqual 3
      expect(Cache.messages().sortBy("created_at").first().value().text).toEqual "text 4"

    it "append log", (done)->
      expect(Cache.messages().value().length).toEqual 3
      Cache.rule.message.set [
        id: msg4
        scene_id: scene2
        name: "7korobi"
        text: "text 5"
        created_at: 5
      ]
      done()
      expect(Cache.messages().value().length).toEqual 4

    it "show window", (done)->
      expect(Cache.messages().where(site_id: "a").value().length).toEqual 1
      done()
      
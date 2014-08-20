new Cache.Replace("site")
new Cache.Replace("story").belongs_to("site")
new Cache.Replace("event").belongs_to("story").belongs_to("site")
new Cache.Append("scene").belongs_to("site").belongs_to("story")
new Cache.Append("message").belongs_to("scene")
new Cache.Append("fab").belongs_to("message")
new Cache.Replace("potof").belongs_to("scene")
new Cache.Replace("form").protect(["text"]).belongs_to("scene")

scene1 = ID.now()
scene2 = ID.now()
msg1 = ID.now()
msg2 = ID.now()
msg3 = ID.now()
msg4 = ID.now()
fab1 = ID.now()
form1 = ID.now()

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
Cache.rule.fab.set [
  id: fab1
  message_id: msg3
  name: "7korobi"
  created_at: 10
  updated_at: 10
]
Cache.rule.form.set [
  id: form1
  scene_id: scene1
  text: "last submit text."
]


describe "Cache", ->
  beforeEach (done)->
    setTimeout ->
      done()
    , 1

  describe "form input", ->
    it "guard user input", (done)->
      expect(Cache.forms.all().first().value().text).toEqual "last submit text."
      Cache.forms.all().first().value().text = "new user input."
      expect(Cache.forms.all().first().value().text).toEqual "new user input."
      Cache.rule.form.set [
        id: form1
        text: "last submit text."
      ]
      done()
      expect(Cache.forms.all().first().value().text).toEqual "new user input."

  describe "append items", ->
    it "replace log", (done)->
      expect(Cache.messages.all().value().length).toEqual 3
      expect(Cache.messages.all().sortBy("created_at").first().value().text).toEqual "text 1"
      Cache.rule.message.set [
        id: msg1
        scene_id: scene1
        name: "7korobi"
        text: "text 4"
        created_at: 1
        updated_at: 4
      ]
      done()
      expect(Cache.messages.all().value().length).toEqual 3
      expect(Cache.messages.all().sortBy("created_at").first().value().text).toEqual "text 4"
      expect(Cache.messages.scene(scene1).sortBy("created_at").first().value().text).toEqual "text 4"

    it "append log", (done)->
      expect(Cache.messages.all().value().length).toEqual 3
      Cache.rule.message.set [
        id: msg4
        scene_id: scene2
        name: "7korobi"
        text: "text 5"
        created_at: 5
        updated_at: 5
      ]
      done()
      expect(Cache.messages.all().value().length).toEqual 4

    it "show window", (done)->
      expect(Cache.messages.scene(scene1).value().length).toEqual 1
      done()
      
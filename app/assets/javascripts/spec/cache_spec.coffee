new Cache.Replace("site").schema ->
new Cache.Replace("story").schema ->
  @belongs_to "site"
new Cache.Replace("event").schema ->
  @belongs_to "site"
  @belongs_to "story"
new Cache.Append("scene").schema ->
  @belongs_to "site"
  @belongs_to "story"
  @belongs_to "event"
new Cache.Replace("potof").schema ->
  @belongs_to "scene"
new Cache.Append("fab").schema ->
  @belongs_to "message"
new Cache.Replace("form").schema ->
  @protect "text"
  @belongs_to "scene"

scene1 = ID.now()
scene2 = ID.now()
scene3 = ID.now()
story1 = ID.now()
event1 = ID.now()
msg1 = ID.now()
msg2 = ID.now()
msg3 = ID.now()
msg4 = ID.now()
fab1 = ID.now()
form1 = ID.now()

Cache.rule.site.set [
  _id: "a"
  title: "α complex"
,
  _id: "b"
  title: "β complex"
]
Cache.rule.story.set [
  _id: story1
  site_id: "a"
  title: "ストーリー１"
]
Cache.rule.event.set [
  _id: event1
  site_id: "a"
  story_id: story1
  title: "イベント１"
]
Cache.rule.scene.set [
  _id: scene1
  site_id: "a"
  title: "7korobi-say"
,
  _id: scene2
  site_id: "b"
  title: "7korobi-say"
]
Cache.rule.fab.set [
  _id: fab1
  message_id: msg3
  name: "7korobi"
  created_at: 10
  updated_at: 10
]
Cache.rule.form.set [
  _id: form1
  scene_id: scene1
  text: "last submit text."
]


describe "Cache", ->
  cache_message = ->
    new Cache.Append("message").schema ->
      @order_by "created_at"
      @belongs_to "scene"
    Cache.rule.message.cleanup()
    Cache.rule.message.set [
      _id: msg1
      scene_id: scene1
      name: "7korobi"
      text: "text 1"
      created_at: 1
      updated_at: 1
    ,
      _id: msg2
      scene_id: scene2
      name: "7korobi"
      text: "text 2"
      created_at: 2
      updated_at: 2
    ,
      _id: msg3
      scene_id: scene3
      name: "7korobi"
      text: "text 3"
      created_at: 3
      updated_at: 3
    ]

  cache_message_with_scope = ->
    cache_message()
    Cache.rule.message.schema ->
      kind = (o)->
        switch o.scene_id
          when scene2
            "also"
          when scene1, scene3
            "good"
          else
            false
      @scope "of", kind
      @pager "of", 5
      @pager "all", 5

  beforeEach (done)->
    setTimeout ->
      done()
    , 0

  describe "form input", ->
    it "guard user input", (done)->
      expect(Cache.forms.all.first.text).toEqual "last submit text."
      Cache.forms.all.first.text = "new user input."
      expect(Cache.forms.all.first.text).toEqual "new user input."
      Cache.rule.form.set [
        _id: form1
        text: "last submit text."
      ]
      expect(Cache.forms.all.first.text).toEqual "new user input."
      done()

  describe "replace item", ->
    it "link with data", (done)->
      expect(Cache.scenes.event[event1]).toEqual undefined
      scene = Cache.scenes.all.first
      scene.event_id = event1
      Cache.rule.scene.set [scene]
      expect(Cache.scenes.event[event1].length).toEqual 1
      done()

  describe "messages", ->
    it "is not have scope", (done)->
      cache_message()
      expect(Cache.messages.of).toEqual undefined
      done()

    it "has scene", (done)->
      cache_message()
      expect(Cache.messages.scene[scene1].length).toEqual 1
      expect(Cache.messages.scene[scene2].length).toEqual 1
      expect(Cache.messages.scene[scene3].length).toEqual 1
      expect(Cache.messages.scene[scene1].first.text).toEqual "text 1"
      expect(Cache.messages.scene[scene2].first.text).toEqual "text 2"
      expect(Cache.messages.scene[scene3].first.text).toEqual "text 3"
      done()

  describe "messages with scope", ->
    it "sepalate items", (done)->
      cache_message_with_scope()
      expect(Cache.messages.all.length).toEqual 3
      expect(Cache.messages.of.also.length).toEqual 1
      expect(Cache.messages.of.also.first.text).toEqual "text 2"
      expect(Cache.messages.of.good.length).toEqual 2
      expect(Cache.messages.of.good.first.text).toEqual "text 1"
      expect(Cache.messages.of.good.last.text).toEqual "text 3"
      done()

    it "replace item", (done)->
      cache_message_with_scope()
      Cache.rule.message.set [
        _id: msg1
        scene_id: scene2
        name: "7korobi"
        text: "text 4"
        created_at: 1
        updated_at: 4
      ]
      expect(Cache.messages.all.length).toEqual 3
      expect(Cache.messages.of.also.length).toEqual 2
      expect(Cache.messages.of.also.first.text).toEqual "text 4"
      expect(Cache.messages.of.also.last.text).toEqual "text 2"
      expect(Cache.messages.of.good.length).toEqual 1
      expect(Cache.messages.of.good.last.text).toEqual "text 3"
      done()

    it "append item", (done)->
      cache_message_with_scope()
      Cache.rule.message.set [
        _id: msg4
        scene_id: scene2
        name: "7korobi"
        text: "text 5"
        created_at: 5
        updated_at: 5
      ]
      expect(Cache.messages.all.length).toEqual 4
      expect(Cache.messages.of.also.length).toEqual 2
      expect(Cache.messages.of.also.first.text).toEqual "text 2"
      expect(Cache.messages.of.also.last.text).toEqual "text 5"
      expect(Cache.messages.of.good.length).toEqual 2
      expect(Cache.messages.of.good.first.text).toEqual "text 1"
      expect(Cache.messages.of.good.last.text).toEqual "text 3"
      done()


new Cache.Rule("site").schema ->
new Cache.Rule("story").schema ->
  @belongs_to "site"
new Cache.Rule("event").schema ->
  @belongs_to "site"
  @belongs_to "story"
new Cache.Rule("scene").schema ->
  @belongs_to "site"
  @belongs_to "story"
  @belongs_to "event"
new Cache.Rule("potof").schema ->
  @belongs_to "scene"
new Cache.Rule("fab").schema ->
  @belongs_to "message"
new Cache.Rule("form").schema ->
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
    new Cache.Rule("message").schema ->
      @order_by "created_at"
      @belongs_to "scene"
    Cache.rule.message.cleanup()
    Cache.rule.message.merge [
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
    ,
      _id: msg1
      scene_id: scene1
      name: "7korobi"
      text: "text 1"
      created_at: 1
      updated_at: 1
    ,
    ]

  cache_message_with_scope = ->
    cache_message()
    Cache.rule.message.schema ->
      kind = (o)->
        switch o.scene_id
          when scene2
            ["also"]
          when scene1, scene3
            ["good"]
      @scope "of", kind

  beforeEach (done)->
    setTimeout ->
      done()
    , 0

  describe "form input", ->
    it "guard user input", (done)->
      expect(Cache.forms.list().first.text).toEqual "last submit text."
      Cache.forms.list().first.text = "new user input."
      expect(Cache.forms.list().first.text).toEqual "new user input."
      Cache.rule.form.set [
        _id: form1
        text: "last submit text."
      ]
      expect(Cache.forms.list().first.text).toEqual "new user input."
      done()

  describe "replace item", ->
    it "link with data", (done)->
      expect(Cache.scenes.where(event: [event1]).list()).toEqual []
      scene = Cache.scenes.list().first
      scene.event_id = event1
      Cache.rule.scene.set [scene]
      expect(Cache.scenes.where(event: [event1]).list().length).toEqual 1
      done()

  describe "messages", ->
    it "is not have scope", (done)->
      cache_message()
      expect(Cache.messages.of).toEqual undefined
      done()

    it "has scene", (done)->
      cache_message()
      expect(Cache.messages.where(scene: [scene1]).list().length).toEqual 1
      expect(Cache.messages.where(scene: [scene2]).list().length).toEqual 1
      expect(Cache.messages.where(scene: [scene3]).list().length).toEqual 1
      expect(Cache.messages.where(scene: [scene1]).list().first.text).toEqual "text 1"
      expect(Cache.messages.where(scene: [scene2]).list().first.text).toEqual "text 2"
      expect(Cache.messages.where(scene: [scene3]).list().first.text).toEqual "text 3"
      done()

  describe "messages with scope", ->
    it "sepalate items", (done)->
      cache_message_with_scope()
      expect(Cache.messages.list().length).toEqual 3
      expect(Cache.messages.where(of: ["also"]).list().length).toEqual 1
      expect(Cache.messages.where(of: ["also"]).list().first.text).toEqual "text 2"
      expect(Cache.messages.where(of: ["good"]).list().length).toEqual 2
      expect(Cache.messages.where(of: ["good"]).sort().first.text).toEqual "text 1"
      expect(Cache.messages.where(of: ["good"]).sort().last.text).toEqual "text 3"
      done()

    it "replace item", (done)->
      cache_message_with_scope()
      Cache.rule.message.merge [
        _id: msg1
        scene_id: scene2
        name: "7korobi"
        text: "text 4"
        created_at: 1
        updated_at: 4
      ]
      expect(Cache.messages.list().length).toEqual 3
      expect(Cache.messages.where(of: ["also"]).list().length).toEqual 2
      expect(Cache.messages.where(of: ["also"]).sort().first.text).toEqual "text 4"
      expect(Cache.messages.where(of: ["also"]).sort().last.text).toEqual "text 2"
      expect(Cache.messages.where(of: ["good"]).list().length).toEqual 1
      expect(Cache.messages.where(of: ["good"]).list().last.text).toEqual "text 3"
      done()

    it "append item", (done)->
      cache_message_with_scope()
      Cache.rule.message.merge [
        _id: msg4
        scene_id: scene2
        name: "7korobi"
        text: "text 5"
        created_at: 5
        updated_at: 5
      ]
      expect(Cache.messages.list().length).toEqual 4
      expect(Cache.messages.where(of: ["also"]).list().length).toEqual 2
      expect(Cache.messages.where(of: ["also"]).sort().first.text).toEqual "text 2"
      expect(Cache.messages.where(of: ["also"]).sort().last.text).toEqual "text 5"
      expect(Cache.messages.where(of: ["good"]).list().length).toEqual 2
      expect(Cache.messages.where(of: ["good"]).sort().first.text).toEqual "text 1"
      expect(Cache.messages.where(of: ["good"]).sort().last.text).toEqual "text 3"
      done()

  describe "face data", ->
    it "all values", (done)->
      expect(Cache.faces.find("all")).toEqual face_id: "all", name: "パルック", order: 99999, _id: "all"
      expect(Cache.faces.list().length).toEqual 244
      expect(Cache.chr_jobs.list().length).toEqual 706
      expect(Cache.chr_jobs.where(chr_set: ["all"]).list().length).toEqual 244
      done()

    it "delete item", (done)->
      Cache.rule.face.reject [_id: "all"]
      expect(Cache.faces.find("all")).toEqual undefined
      expect(Cache.faces.list().length).toEqual 243
      expect(Cache.chr_jobs.list().length).toEqual 705
      expect(Cache.chr_jobs.where(chr_set: ["all"]).list().length).toEqual 243
      done()

  describe "import sample data", ->
    it "get all item", (done)->
      new Cache.Rule("message").schema ->
        @order_by "created_at"
        @belongs_to "scene"
        @belongs_to "face"
        @belongs_to "sow_auth"
        @scope "logid", (o)-> [o.logid]
        @scope "unread", (o)-> null
        @scope "info", (o)->
          if o.logid.match /^([aAmM].\d+)|(vilinfo)|(potofs)/
            o.security

        @scope "action", (o)->
          if o.logid.match /^.[AB]/
            o.security

        @scope "talk", (o)->
          if o.logid.match /^.[SX]/
            o.security

        @scope "memo", (o)->
          if o.logid.match /^.[M]/
            o.security

        @fields
          _id: (o)-> 
            o.created_at = new Date(o.date) - 0
            o._id = ID.at(o.created_at)
            delete o.date
          security: (o)->
            o.security =
              switch
                when o.logid.match /^([D].\d+)/
                  ["delete", "think", "all"]
                when o.logid.match /^([qcS].\d+)|(MM\d+)/
                  ["open", "clan", "think", "all"]
                when o.logid.match /^([aAmMI].\d+)|(vilinfo)|(potofs)/
                  ["announce", "open", "clan", "think", "all"]
                when o.logid.match /^([Ti].\d+)/
                  ["think", "all"]
                when o.logid.match /^([\-WPX].\d+)/
                  ["clan", "all"]
                else
                  []
            o.scene_id = o.event_id + o.security[0]
      done()
      for event in sample2.events
        Cache.rule.message.merge event.messages
      expect(Cache.messages.list().length).toEqual 1604

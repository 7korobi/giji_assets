expect = chai.expect

new Cache.Rule("site").schema !->
new Cache.Rule("story").schema !->
  @belongs_to "site"
new Cache.Rule("event").schema !->
  @belongs_to "site"
  @belongs_to "story"
new Cache.Rule("scene").schema !->
  @belongs_to "site"
  @belongs_to "story"
  @belongs_to "event"
new Cache.Rule("potof").schema !->
  @belongs_to "scene"
new Cache.Rule("fab").schema !->
  @belongs_to "message"
new Cache.Rule("form").schema !->
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

Cache.rule.site.set $=
  * _id: "a"
    title: "α complex"
  * _id: "b"
    title: "β complex"
  ...

Cache.rule.story.set $=
  * _id: story1
    site_id: "a"
    title: "ストーリー１"
  ...

Cache.rule.event.set $=
  * _id: event1
    site_id: "a"
    story_id: story1
    title: "イベント１"
  ...

Cache.rule.scene.set $=
  * _id: scene1
    site_id: "a"
    title: "7korobi-say"
  * _id: scene2
    site_id: "b"
    title: "7korobi-say"
  ...

Cache.rule.fab.set $=
  * _id: fab1
    message_id: msg3
    name: "7korobi"
    created_at: 10
    updated_at: 10
  ...

Cache.rule.form.set $=
  * _id: form1
    scene_id: scene1
    text: "last submit text."
  ...


describe "Cache" (...)!->
  cache_message = ->
    new Cache.Rule("message").schema !->
      @order "created_at"
      @belongs_to "scene"
    Cache.rule.message.set $=
      * _id: msg2
        scene_id: scene2
        name: "7korobi"
        text: "text 2"
        created_at: 2
        updated_at: 2
      * _id: msg3
        scene_id: scene3
        name: "7korobi"
        text: "text 3"
        created_at: 3
        updated_at: 3
      * _id: msg1
        scene_id: scene1
        name: "7korobi"
        text: "text 1"
        created_at: 1
        updated_at: 1
      ...

  cache_message_with_scope = ->
    cache_message()
    Cache.rule.message.schema !->
      kind = (o)->
        switch o.scene_id
          when scene2
            ["also"]
          when scene1, scene3
            ["good"]
      @scope "of", kind


  describe "form input" (...)!->
    it "guard user input" !->
      expect(Cache.forms.list().first.text).to.eq "last submit text."
      Cache.forms.list().first.text = "next submit test."
      Cache.rule.form.set $=
        * _id: form1
          text: "new submit text."
        ...

      expect(Cache.forms.list().first.text).to.eq "next submit text."

  describe "replace item" (...)!->
    it "link with data" !->
      expect(Cache.scenes.where(event: [event1]).list()).to.eq []
      scene = Cache.scenes.list().first
      scene.event_id = event1
      Cache.rule.scene.set [scene]

      expect(Cache.scenes.where(event: [event1]).list().length).to.eq 1

  describe "messages" (...)!->
    it "is not have scope" !->
      cache_message()
      expect(Cache.messages.of).to.eq undefined

    it "has scene" !->
      cache_message()
      expect(Cache.messages.where(scene: [scene1]).list().length).to.eq 1
      expect(Cache.messages.where(scene: [scene2]).list().length).to.eq 1
      expect(Cache.messages.where(scene: [scene3]).list().length).to.eq 1
      expect(Cache.messages.where(scene: [scene1]).list().first.text).to.eq "text 1"
      expect(Cache.messages.where(scene: [scene2]).list().first.text).to.eq "text 2"
      expect(Cache.messages.where(scene: [scene3]).list().first.text).to.eq "text 3"

  describe "messages with scope" (...)!->
    it "sepalate items" !->
      cache_message_with_scope()
      expect(Cache.messages.list().length).to.eq 3
      expect(Cache.messages.where(of: ["also"]).list().length).to.eq 1
      expect(Cache.messages.where(of: ["also"]).list().first.text).to.eq "text 2"
      expect(Cache.messages.where(of: ["good"]).list().length).to.eq 2
      expect(Cache.messages.where(of: ["good"]).list().first.text).to.eq "text 1"
      expect(Cache.messages.where(of: ["good"]).list().last.text).to.eq "text 3"

    it "replace item" !->
      cache_message_with_scope()
      Cache.rule.message.merge $=
        * _id: msg1
          scene_id: scene2
          name: "7korobi"
          text: "text 4"
          created_at: 1
          updated_at: 4
        ...

      expect(Cache.messages.list().length).to.eq 3
      expect(Cache.messages.where(of: ["also"]).list().length).to.eq 2
      expect(Cache.messages.where(of: ["also"]).list().first.text).to.eq "text 4"
      expect(Cache.messages.where(of: ["also"]).list().last.text).to.eq "text 2"
      expect(Cache.messages.where(of: ["good"]).list().length).to.eq 1
      expect(Cache.messages.where(of: ["good"]).list().last.text).to.eq "text 3"

    it "append item" !->
      cache_message_with_scope()
      Cache.rule.message.merge $=
        * _id: msg4
          scene_id: scene2
          name: "7korobi"
          text: "text 5"
          created_at: 5
          updated_at: 5
        ...

      expect(Cache.messages.list().length).to.eq 4
      expect(Cache.messages.where(of: ["also"]).list().length).to.eq 2
      expect(Cache.messages.where(of: ["also"]).list().first.text).to.eq "text 2"
      expect(Cache.messages.where(of: ["also"]).list().last.text).to.eq "text 5"
      expect(Cache.messages.where(of: ["good"]).list().length).to.eq 2
      expect(Cache.messages.where(of: ["good"]).list().first.text).to.eq "text 1"
      expect(Cache.messages.where(of: ["good"]).list().last.text).to.eq "text 3"

  describe "face data" (...)!->
    it "all values" !->
      expect(Cache.faces.find("all")).to.eq face_id: "all", name: "パルック", order: 99999, _id: "all"
      expect(Cache.faces.list().length).to.eq 244
      expect(Cache.chr_jobs.list().length).to.eq 706
      expect(Cache.chr_jobs.where(chr_set: ["all"]).list().length).to.eq 244

    it "delete item" !->
      Cache.rule.face.reject [_id: "all"]
      expect(Cache.faces.find("all")).to.eq undefined
      expect(Cache.faces.list().length).to.eq 243
      expect(Cache.chr_jobs.list().length).to.eq 705
      expect(Cache.chr_jobs.where(chr_set: ["all"]).list().length).to.eq 243

  describe "import sample data" (...)!->
    it "get all item" !->
      new Cache.Rule("message").schema !->
        @order "updated_at"
        @belongs_to "face"
        @belongs_to "event"
        @belongs_to "sow_auth"
        @scope "logid",  (o)-> [o.logid]
        @scope "unread", (o)-> null
        @scope "info",   (o)-> o.is.info   && o.security
        @scope "action", (o)-> o.is.action && o.security
        @scope "talk",   (o)-> o.is.talk   && o.security
        @scope "memo",   (o)-> o.is.memo   && o.security

        @deploy (o)->
          o._id = o.event_id + "-" + o.logid

          o.security =
            switch
              when o.logid.match /^([D].\d+)/
                ["delete", "think", "all"]
              when o.logid.match /^([qcS].\d+)|(MM\d+)/
                ["open", "clan", "think", "all"]
              when o.mestype == "MAKER"
                ["announce", "open", "clan", "think", "all"]
              when o.mestype == "ADMIN"
                ["announce", "open", "clan", "think", "all"]
              when o.logid.match /^([I].\d+)|(vilinfo)|(potofs)/
                ["announce", "open", "clan", "think", "all"]
              when o.logid.match /^([Ti].\d+)/
                ["think", "all"]
              when o.logid.match /^([\-WPX].\d+)/
                ["clan", "all"]
              else
                []
          o.scene_id = o.event_id + "-" + o.security[0]

          anchor_num  = o.logid.substring(2) - 0 || 0
          o.anchor = RAILS.log.anchor[o.logid[0]] + anchor_num || ""
          o.updated_at ?= new Date(o.date) - 0
          delete o.date

          vdom = GUI.message.xxx
          o.is = {}

          if o.logid.match /^vilinfo/
            vdom = GUI.story
            o.is.info = true
          if o.logid.match /^potofs/
            vdom = GUI.potofs
            o.is.info = true
          if o.logid.match /^.[I]/
            vdom = GUI.message.info
            o.is.info = true
            o.is.talk = true
          if o.logid.match /^.[SX]/
            vdom = GUI.message.talk
            o.is.talk = true
          if o.logid.match /^.[M]/
            vdom = GUI.message.memo
            o.is.memo = true

          if o.mestype == "MAKER"
            vdom = GUI.message.admin
            o.is.info = true
          if o.mestype == "ADMIN"
            vdom = GUI.message.admin
            o.is.info = true

          if o.logid.match /^.[AB]/
            vdom = GUI.message.action
            o.is.action = true
            o.is.talk = true

          o.vdom = vdom

          o.search_words = o.log
      if sample.messages?
        Cache.rule.message.merge sample.messages
      if sample.events?
        for event in sample.events
          Cache.rule.message.merge event.messages,
            event_id: event._id
      expect(Cache.messages.list().length).to.eq 1604

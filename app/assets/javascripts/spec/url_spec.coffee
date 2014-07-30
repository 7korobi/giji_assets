LOCATION =
  pathname: ["file"]
  cookie: ["file"]
  search: []
  hash: []

  bind:
    fname:
      jasmine:
        fname: "jasmine"
        title: "基本"
      other:
        fname: "other"
        title: "変更"

  options:
    aaa:
      current: null
      type: Number
    bbb:
      current: null
      type: String
    ccc:
      current: null
      type: String
    ddd:
      current: null
      type: Parse.Date
    fname:
      current: null
      type: String
    ext:
      current: null
      type: String
    title:
      current: null
      type: String

Url.routes =
  param: new Url "param=:aaa.:bbb.:ccc.:ddd"
  file:  new Url "/:fname.:ext"

if "onhashchange" of window
  $(window).on "hashchange", (event)->
    if event.clipboardData
      console.log event
    else
      Url.popstate()

if "onpopstate" of window
  $(window).on "popstate", (event)->
    if event.clipboardData
      console.log event
    else
      Url.popstate()

  unless head.browser.safari
    Url.popstate()


describe "Url", ->
  beforeEach (done)->
    setTimeout ->
      done()
    , DELAY.presto

  describe "should capture file name", ->
    it "(global)", (done)->
      done()
      expect(Url.vue.$data.fname).toEqual "jasmine"
      expect(Url.vue.$data.ext).toEqual "html"

    it "file", (done)->
      done()
      expect(Url.routes.file.vue.$data.url.fname).toEqual "jasmine"
      expect(Url.routes.file.vue.$data.url.ext).toEqual "html"

  describe "change call pushstate", ->
    it "location with space", (done)->
      spyOn(Url, "pushstate")
      Url.routes.file.vue.$data.url.fname = "new file name"
      done()

    it "location", (done)->
      spyOn(Url, "pushstate")
      Url.routes.file.vue.$data.url.fname = "other"
      done()

  describe "bind variable", (done)->
    it "location basic", (done)->
      done()
      expect(Url.routes.file.vue.$data.url.title).toEqual "特別"

    it "location other", (done)->
      Url.routes.file.vue.$data.url.fname = "other"
      done()
      expect(Url.routes.file.vue.$data.url.title).toEqual "特別"

  it "basic", ->
    expect(true).toBeTruthy()

    expect(1).not.toBeFalsy()
    expect(0).toBeFalsy()
    expect(null).toBeFalsy()
    expect(false).toBeFalsy()

###
  it "spec spec", ->
    spyOn(url, 'value').andReturn true
    expect(url.value "event_id").toEqual true

  it "spec spec", ->
    spyOn(url, 'value').andThrow "bad"
    expect(url.value).toThrow "good"

  it "spec spec", ->
    expect ->
      throw "Error"
    .toThrowError "bad"
###

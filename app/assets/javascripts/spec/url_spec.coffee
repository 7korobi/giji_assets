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

describe "Url", ->
  beforeEach (done)->
    setTimeout ->
      done()
    , 1
  describe "should capture file name", ->
    it "(global)", (done)->
      Url.popstate()
      done()
      expect(Url.vue.$data.fname).toEqual "jasmine"
      expect(Url.vue.$data.ext).toEqual "html"

    it "file", (done)->
      Url.popstate()
      done()
      expect(Url.routes.file.vue.$data.url.fname).toEqual "jasmine"
      expect(Url.routes.file.vue.$data.url.ext).toEqual "html"

  describe "bind variable", (done)->
    beforeEach (done)->
      setTimeout ->
        done()
      , 1
    it "location other", (done)->
      Url.popstate()
      Url.routes.file.vue.$data.url.fname = "other"
      Url.routes.file.change "fname", "other"
      expect(Url.routes.file.vue.$data.url.title).toEqual "変更"
      done()

    it "location basic", (done)->
      Url.popstate()
      Url.routes.file.vue.$data.url.fname = "jasmine"
      Url.routes.file.change "fname", "jasmine"
      expect(Url.routes.file.vue.$data.url.title).toEqual "基本"
      done()

  it "basic", (done)->
    expect(true).toBeTruthy()

    expect(1).not.toBeFalsy()
    expect(0).toBeFalsy()
    expect(null).toBeFalsy()
    expect(false).toBeFalsy()
    done()

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

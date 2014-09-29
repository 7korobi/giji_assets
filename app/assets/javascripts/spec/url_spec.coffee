Url.bind =
  fname:
    jasmine:
      fname: "jasmine"
      title: "基本"
    other:
      fname: "other"
      title: "変更"

Url.options =
  aaa:
    current: 1
    type: "Number"
  bbb:
    current: "B"
    type: "String"
  ccc:
    current: "C"
    type: "String"
  ddd:
    current: 1400000000000
    type: "Date"
  fname:
    current: null
    type: "String"
  ext:
    current: null
    type: "String"
  title:
    current: null
    type: "String"

Url.routes =
  pathname:
    file:  new Url "/:fname.:ext"
  search:
    param: new Url "param=:aaa-:bbb-:ccc-:ddd",
      unmatch: "?"

describe "Url", ->
  beforeEach (done)->
    setTimeout ->
      done()
    , 0
  describe "should capture file name", ->
    it "(global)", (done)->
      Url.popstate()
      done()
      expect(Url.data.fname).toEqual "jasmine"
      expect(Url.data.ext).toEqual "html"

    it "file", (done)->
      Url.popstate()
      done()
      expect(Url.routes.file.data.fname).toEqual "jasmine"
      expect(Url.routes.file.data.ext).toEqual "html"

  describe "popstate url", (done)->
    it "param", (done)->
      Url.popstate()
      done()
      expect(Url.routes.param.data.aaa).toEqual  1
      expect(Url.routes.param.data.bbb).toEqual "B"
      expect(Url.routes.param.data.ccc).toEqual "C"
      expect(Url.routes.param.data.ddd).toEqual 1400000000000

  describe "bind variable", (done)->
    it "location other", (done)->
      Url.popstate()
      Url.routes.file.change "fname", "other"
      expect(Url.routes.file.data.title).toEqual "変更"
      done()

    it "location basic", (done)->
      Url.popstate()
      Url.routes.file.change "fname", "jasmine"
      expect(Url.routes.file.data.title).toEqual "基本"
      done()


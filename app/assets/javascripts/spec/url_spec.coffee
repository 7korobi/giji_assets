url_bind =
  fname:
    jasmine:
      fname: "jasmine"
      title: "基本"
    other:
      fname: "other"
      title: "変更"

url_props =
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

Url.define url_props, url_bind

Url.routes =
  pathname:
    file:  new Url "/:fname.:ext"
  search:
    param: new Url "param=:aaa~:bbb~:ccc~:ddd",
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
      expect(Url.prop.fname()).toEqual "jasmine"
      expect(Url.prop.ext()).toEqual "html"

    it "file", (done)->
      Url.popstate()
      done()
      expect(Url.routes.pathname.file.data.fname).toEqual "jasmine"
      expect(Url.routes.pathname.file.data.ext).toEqual "html"

  describe "popstate url", (done)->
    it "param", (done)->
      Url.popstate()
      done()
      expect(Url.routes.search.param.data.aaa).toEqual  1
      expect(Url.routes.search.param.data.bbb).toEqual "B"
      expect(Url.routes.search.param.data.ccc).toEqual "C"
      expect(Url.routes.search.param.data.ddd).toEqual 1400000000000

  describe "bind variable", (done)->
    it "location other", (done)->
      Url.popstate()
      Url.prop.fname "other"
      expect(Url.prop.title()).toEqual "変更"
      done()

    it "location basic", (done)->
      Url.popstate()
      Url.prop.fname "jasmine"
      expect(Url.prop.title()).toEqual "基本"
      done()


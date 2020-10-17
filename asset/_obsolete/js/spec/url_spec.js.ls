url_bind =
  fname:
    * fname: "test_mocha"
      title: "基本"
    * fname: "other"
      title: "変更"

url_props =
  aaa:
    current: 1
    type: "Number"
  bbb:
    current: "B"
  ccc:
    current: "C"
  ddd:
    current: 1400000000000
    type: "Date"
  fname: null
  ext: null
  title: null

Url.define url_props
Url.binds  url_bind

Url.routes =
  pathname:
    file:  new Url "/:fname.:ext"
  search:
    param: new Url "param=:aaa~:bbb~:ccc~:ddd",
      unmatch: "?"

describe "Url", (...)!->
  describe "should capture file name", (...)!->
    it "file", (done)!->
      Url.popstate()
      setTimeout ->
        expect(Url.prop.fname()).to.eq "test_mocha"
        expect(Url.prop.ext()).to.eq "html"
        done()
      , 10

  describe "popstate url", (...)!->
    it "param", (done)!->
      Url.popstate()
      setTimeout ->
        expect(Url.prop.aaa()).to.eq  1
        expect(Url.prop.bbb()).to.eq "B"
        expect(Url.prop.ccc()).to.eq "C"
        expect(Url.prop.ddd()).to.eq 1400000000000
        expect(Url.location().search).to.eq "?param=1~B~C~KfmhEBZ"
        done()
      , 10

  describe "bind variable", (...)!->

    it "location other", !->
      Url.prop.fname "other"
      expect(Url.prop.title()).to.eq "変更"

    it "location basic", !->
      Url.prop.fname "test_mocha"
      expect(Url.prop.title()).to.eq "基本"

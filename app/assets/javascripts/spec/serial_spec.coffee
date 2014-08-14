describe "Serial", ->
  beforeEach (done)->
    setTimeout ->
      done()
    , 0
  describe "parser", ->
    it "Array", (done)->
      expect(Serial.parser.Array("1,2,3")).toEqual ["1","2","3"]
      expect(Serial.parser.Array(",z,")).toEqual ["","z",""]
      done()

    it "Date", (done)->
      expect(Serial.parser.Date("LtUhQ0W")).toEqual 1400000000000
      expect(Serial.parser.Date("@@@")).not.toEqual Number.NaN
      done()

    it "Number", (done)->
      expect(Serial.parser.Number("100")).toEqual   100
      expect(Serial.parser.Number("-100")).toEqual -100
      expect(Serial.parser.Number("1.5")).toEqual   1.5
      expect(Serial.parser.Number("0")).toEqual       0
      expect(Serial.parser.Number("aaa")).toEqual Number.NaN
      done()

    it "String", (done)->
      expect(Serial.parser.String("aaa")).toEqual "aaa"
      done()

    it "(null)", (done)->
      expect(Serial.parser[null]("aaa")).toEqual "aaa"
      done()

  describe "url", ->
    it "Array", (done)->
      expect("a,b,c").toMatch new RegExp Serial.url.Array
      done()

    it "Date", (done)->
      expect("1400000000000").toMatch new RegExp Serial.url.Date
      done()

    it "Number", (done)->
      expect("-100").toMatch new RegExp Serial.url.Number
      expect( "100").toMatch new RegExp Serial.url.Number
      expect( "3.5").toMatch new RegExp Serial.url.Number
      done()

    it "String", (done)->
      expect("a,b^c~d").toMatch new RegExp Serial.url.String
      done()

    it "(null)", (done)->
      expect("a,b^c~d").toMatch new RegExp Serial.url[null]
      done()

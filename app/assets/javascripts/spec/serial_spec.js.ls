describe "Serial" (...)!->
  describe "parser" (...)!->
    it "Keys" !->
      expect( Serial.parser.Keys("a,b,c") ).to.eql a:true, b:true, c:true
      expect( Serial.parser.Keys(a:1, b:1) ).to.eql a:true, b:true

    it "Array" !->
      expect( Serial.parser.Array("1,2,3") ).to.eql ["1","2","3"]
      expect( Serial.parser.Array(",z,") ).to.eql ["","z",""]

    it "Date" !->
      expect( Serial.parser.Date("KfmhEBZ") ).to.eq 1400000000000
      expect( Serial.parser.Date("@@@") ).to.not.eq             0

    it "Number" !->
      expect( Serial.parser.Number("100") ).to.eq   100
      expect( Serial.parser.Number("-100") ).to.eq -100
      expect( Serial.parser.Number("1.5") ).to.eq   1.5
      expect( Serial.parser.Number("0") ).to.eq       0
      expect( Serial.parser.Number("aaa") ).to.not.eq 0

    it "Text" !->
      expect(Serial.parser.Text(null)).to.eq ""
      expect(Serial.parser.Text(undefined)).to.eq ""
      expect(Serial.parser.Text("aaa")).to.eq "aaa"

    it "String" !->
      expect(Serial.parser.String(null)).to.eq ""
      expect(Serial.parser.String(undefined)).to.eq ""
      expect(Serial.parser.String("aaa")).to.eq "aaa"

    it "Bool" !->
      expect( Serial.parser.Bool("T") ).to.eq true
      expect( Serial.parser.Bool("F") ).to.eq false

    it "(null)" !->
      expect(Serial.parser[null]("aaa")).to.eq "aaa"


  describe "serializer" (...)!->
    it "Keys" !->
      expect( Serial.serializer.Keys(a:true, b:true, c:true) ).to.eq "a,b,c"
      expect( Serial.serializer.Keys(a:1, b:1) ).to.eq "a,b"

    it "Array" !->
      expect( Serial.serializer.Array([1,2,3]) ).to.eq "1,2,3"
      expect( Serial.serializer.Array(["","z",""]) ).to.eq ",z,"

    it "Date" !->
      expect( Serial.serializer.Date(1400000000000) ).to.eq "KfmhEBZ"

    it "Number" !->
      expect( Serial.serializer.Number(100) ).to.eq   "100"
      expect( Serial.serializer.Number(-100) ).to.eq "-100"
      expect( Serial.serializer.Number(1.5) ).to.eq   "1%2e5"
      expect( Serial.serializer.Number(0) ).to.eq       "0"
      expect( Serial.serializer.Number(Number.NaN) ).to.eq "NaN"

    it "Text" !->
      expect(Serial.serializer.Text(null)).to.eq ""
      expect(Serial.serializer.Text(undefined)).to.eq ""
      expect(Serial.serializer.Text("aaa")).to.eq "aaa"

    it "String" !->
      expect(Serial.serializer.String(null)).to.eq ""
      expect(Serial.serializer.String(undefined)).to.eq ""
      expect(Serial.serializer.String("aaa")).to.eq "aaa"

    it "Bool" !->
      expect( Serial.serializer.Bool(true) ).to.eq "T"
      expect( Serial.serializer.Bool(false) ).to.eq "F"

    it "(null)" !->
      expect(Serial.serializer[null]("aaa")).to.eq "aaa"


  describe "url" (...)!->
    it "Array" !->
      expect("a,b,c").to.match new RegExp Serial.url.Array

    it "Date" !->
      expect("1400000000000").to.match new RegExp Serial.url.Date

    it "Number" !->
      expect("-100").to.match new RegExp Serial.url.Number
      expect( "100").to.match new RegExp Serial.url.Number
      expect( "3.5").to.match new RegExp Serial.url.Number

    it "String" !->
      expect("a,b^c~d").to.match new RegExp Serial.url.String

    it "(null)" !->
      expect("a,b^c~d").to.match new RegExp Serial.url[null]

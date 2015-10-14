describe "Serial" (...)!->
  describe "parser" (...)!->
    it "Keys" !->
      expect( unpack.Keys("a,b,c") ).to.eql a:true, b:true, c:true
      expect( unpack.Keys(a:1, b:1) ).to.eql a:true, b:true

    it "Array" !->
      expect( unpack.Array("1,2,3") ).to.eql ["1","2","3"]
      expect( unpack.Array(",z,") ).to.eql ["","z",""]

    it "Date" !->
      expect( unpack.Date("KfmhEBZ") ).to.eq 1400000000000
      expect( unpack.Date("@@@") ).to.not.eq             0

    it "Number" !->
      expect( unpack.Number("100") ).to.eq   100
      expect( unpack.Number("-100") ).to.eq -100
      expect( unpack.Number("1.5") ).to.eq   1.5
      expect( unpack.Number("0") ).to.eq       0
      expect( unpack.Number("aaa") ).to.not.eq 0

    it "Text" !->
      expect(unpack.Text(null)).to.eq ""
      expect(unpack.Text(undefined)).to.eq ""
      expect(unpack.Text("aaa")).to.eq "aaa"

    it "String" !->
      expect(unpack.String(null)).to.eq ""
      expect(unpack.String(undefined)).to.eq ""
      expect(unpack.String("aaa")).to.eq "aaa"

    it "Bool" !->
      expect( unpack.Bool("T") ).to.eq true
      expect( unpack.Bool("F") ).to.eq false

    it "(null)" !->
      expect(unpack[null]("aaa")).to.eq "aaa"


  describe "serializer" (...)!->
    it "Keys" !->
      expect( pack.Keys(a:true, b:true, c:true) ).to.eq "a,b,c"
      expect( pack.Keys(a:1, b:1) ).to.eq "a,b"

    it "Array" !->
      expect( pack.Array([1,2,3]) ).to.eq "1,2,3"
      expect( pack.Array(["","z",""]) ).to.eq ",z,"

    it "Date" !->
      expect( pack.Date(1400000000000) ).to.eq "KfmhEBZ"

    it "Number" !->
      expect( pack.Number(100) ).to.eq   "100"
      expect( pack.Number(-100) ).to.eq "-100"
      expect( pack.Number(1.5) ).to.eq   "1%2e5"
      expect( pack.Number(0) ).to.eq       "0"
      expect( pack.Number(Number.NaN) ).to.eq "NaN"

    it "Text" !->
      expect(pack.Text(null)).to.eq ""
      expect(pack.Text(undefined)).to.eq ""
      expect(pack.Text("aaa")).to.eq "aaa"

    it "String" !->
      expect(pack.String(null)).to.eq ""
      expect(pack.String(undefined)).to.eq ""
      expect(pack.String("aaa")).to.eq "aaa"

    it "Bool" !->
      expect( pack.Bool(true) ).to.eq "T"
      expect( pack.Bool(false) ).to.eq "F"

    it "(null)" !->
      expect(pack[null]("aaa")).to.eq "aaa"


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

  describe "id" (...)!->
    it "now" !->
      expect(Serial.ID.now()).to.not.eq Serial.ID.now()
      expect(Serial.ID.now().slice(3,9)).to.eq Serial.ID.now().slice(3,9)

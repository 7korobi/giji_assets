describe "Url", ->
  url = ""
  beforeEach ->
    url = new Url "/:event_id.html/"

  describe "when other", ->
    it "spec spec", ->
      expect(1).toEqual 1

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

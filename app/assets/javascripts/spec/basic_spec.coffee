describe "(basic)", ->
  beforeEach (done)->
    setTimeout ->
      done()
    , 0
  it "basic", (done)->
    jasmine.clock().install();

    expect(true).toBeTruthy()

    jasmine.clock().tick(1000);

    expect(1).not.toBeFalsy()
    expect(0).toBeFalsy()
    expect(null).toBeFalsy()
    expect(false).toBeFalsy()

    jasmine.clock().uninstall();
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

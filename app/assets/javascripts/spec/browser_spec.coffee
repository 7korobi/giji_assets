describe "(browser css)", ->
  beforeEach (done)->
    setTimeout ->
      done()
    , 0

  it "disable", (done)->
    expect( document.styleSheets[0].disabled = true ).toBeTruthy()
    done()
    expect( document.styleSheets[0].disabled = false ).toBeFalsy()

  it "insert rule", (done)->
    red = ".bar { border: 3px solid red; }"
    document.styleSheets[0].insertRule(red,0)
    expect( document.styleSheets[0].rules[0].cssText ).toEqual(red)
    done()
    document.styleSheets[0].deleteRule(0)
    document.styleSheets[0].insertRule(red,0)



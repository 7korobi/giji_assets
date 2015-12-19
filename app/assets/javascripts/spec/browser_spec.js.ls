describe "(browser css)" (...)!->
  beforeEach (done)!->
    requestAnimationFrame !->
      done()

  it "disable", !->
    expect( document.styleSheets[0].disabled = true ).to.be.ok
    expect( document.styleSheets[0].disabled = false ).to.not.be.ok

  it "insert rule", (done)!->
    done()
    red = "#mocha-stats { border: 3px solid red; }"
    document.styleSheets[0].insertRule(red,0)
    expect( document.styleSheets[0].rules[0].cssText ).to.eq(red)
    document.styleSheets[0].deleteRule(0)
    document.styleSheets[0].insertRule(red,0)

  it "api test", (done)!->
    done()
    expect( document.querySelectorAll("li.pass")[0].tagName ).to.eq("LI")

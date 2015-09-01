describe "(basic)" (...)!->
  it "spec spec" !->
    expect ->
      throw "Error"
    .to.throw("Error")

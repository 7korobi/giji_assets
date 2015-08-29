expect = chai.expect

describe "(basic)" (...)!->
  it "spec spec" !->
    expect ->
      throw "Error"
    .to.throw("Error")

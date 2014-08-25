###
jQuery ->
  FixedBox.push  angular.element,   0, 1, '#topviewer'
  FixedBox.push  angular.element,   1,-1, '#sayfilter'
  FixedBox.push  angular.element, -12,-1, '#buttons'
###

describe "FixedBox", ->
  beforeEach (done)->
    setTimeout ->
      done()
    , 0

  describe "adjust", ->

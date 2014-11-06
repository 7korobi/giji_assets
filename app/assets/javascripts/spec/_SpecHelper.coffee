test =
  orientation: 0
  motion: 0
win.on.orientation.push ->
  test.orientation += 1
  m.redraw()
win.on.motion.push ->
  test.motion += 1
  m.redraw()
m.module document.querySelector("#win"),
  controller: ->
  view: ->
    format = (n, p)->
      if n < 0
        i = Math.ceil(n)
        f = Math.ceil p * (i - n)
      else
        i = Math.floor(n)
        f = Math.floor p * (n - i)
      top = "          #{i}".slice(-4)
      btm = "#{f}          ".slice(0, 3)
      "#{top}.#{btm}"

    m "div",
      m "pre",
        JSON.stringify
          redraw: test
      m "pre",
        JSON.stringify
          accel: 
            x: format win.accel.x, 100
            y: format win.accel.y, 100
            z: format win.accel.z, 100
      m "pre",
        JSON.stringify
          rotate:
            alpha: format win.rotate.alpha, 100
            beta:  format win.rotate.beta,  100
            gamma: format win.rotate.gamma, 100
      m "pre",
        JSON.stringify
          gravity:
            x: format win.gravity.x, 100
            y: format win.gravity.y, 100
            z: format win.gravity.z, 100
      m "pre",
        JSON.stringify
          compass: format win.compass, 10
      m "pre",
        JSON.stringify
          orientation:
            alpha: format win.orientation.alpha, 100
            beta:  format win.orientation.beta,  100
            gamma: format win.orientation.gamma, 100

if "ondeviceorientation" of window
  window.addEventListener 'deviceorientation', win.do.orientation
if "ondevicemotion" of window
  window.addEventListener 'devicemotion', win.do.motion

beforeEach ->
  jasmine.addMatchers toBePlaying: ->
    compare: (actual, expected)->
      player = actual
      pass: player.currentlyPlayingSong is expected and player.isPlaying

GUI = require 'gui'

class GUI.Animate

  spin = new Bounce
  spin.rotate
    from: 0
    to: 360
  spin.define("spin")

  jelly_up = new Bounce
  jelly_up.scale
    from: {x: 1, y: 1}
    to:   {x: 1, y: 2}
    easing: "bounce"
    bounces: 4
    stiffness: 1
  jelly_up.scale
    from: {x: 1, y: 1}
    to:   {x: 2, y: 1}
    easing: "bounce"
    bounces: 6
    stiffness: 1
  jelly_up.translate
    from: {x: 0, y:   0}
    to:   {x: 0, y: -30}
    easing: "bounce"
    bounces: 8
    stiffness: 1
  jelly_up.define("jelly-up")

  jelly_down = new Bounce
  jelly_down.scale
    from: {x: 1, y: 2}
    to:   {x: 1, y: 1}
    easing: "bounce"
    bounces: 4
    stiffness: 1
  jelly_down.scale
    from: {x: 2, y: 1}
    to:   {x: 1, y: 1}
    easing: "bounce"
    bounces: 6
    stiffness: 1
  jelly_down.translate
    from: {x: 0, y: -30}
    to:   {x: 0, y:   0}
    easing: "bounce"
    bounces: 8
    stiffness: 1
  jelly_down.define("jelly-down")


  apply = (duration, sequence, {begin, finish})->
    (dom)->
      if dom.bounce_style != sequence
        dom.bounce_style = sequence
        style = "#{sequence} #{duration}ms linear both"
        begin?(dom)
        dom.style.animation = style
        dom.style.webkitAnimation = style
        setTimeout ->
          finish?(dom)
        , duration

  zIndex = (z)->
    (dom)-> dom.style.zIndex = z

  @spin: apply DELAY.lento, "spin", {}


  @jelly:
    up: apply DELAY.andante, "jelly-up",
      begin: zIndex 3

    down: apply DELAY.andante, "jelly-down",
      begin: zIndex 2
      finish: zIndex 1

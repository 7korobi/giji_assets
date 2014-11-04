class GUI.Animate

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
  jelly_down.define("jelly-down")

  apply = (duration, sequence, {begin, finish})->
    (dom)->
      style = "#{sequence} #{duration}ms linear both"
      begin?(dom)
      dom.style.animation = style
      dom.style.webkitAnimation = style
      setTimeout ->
        finish?(dom)
      , duration

  zIndex = (z)->
    (dom)-> dom.style.zIndex = z

  @jelly:
    up: apply DELAY.andante, "jelly-up",
      begin: zIndex 2

    down: apply DELAY.andante, "jelly-down",
      begin: zIndex 1
      finish: zIndex 0
      
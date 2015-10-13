

roop = ->
  requestAnimationFrame ->
    m.redraw()
    roop()
roop()

data_store = {}
present_canvas = ({size: [width, height], layout: [dx, dy, dz]})->
  arc = (ctx, x, y, size, color)->
    ctx.beginPath()
    ctx.arc(x, y, size, 0, 2 * Math.PI, true);
    ctx.fillStyle = color
    ctx.fill();
    ctx.lineWidth = 2.0
    ctx.strokeStyle = color
    ctx.stroke()

  config: (canvas, is_continue, context)->
    return if is_continue
    new Layout canvas, dx, dy, dz

  data: ->
    data_store

  background: ({ctx})->
    ctx.clearRect(0, 0, width, height)

  draw: ({state, ctx, offsets, is_touch, event: {clientX, clientY, screenX, screenY, touches}})->
    if is_touch
      for offset in offsets
        arc ctx, offset.x, offset.y, offsets.length * 10 + 50, "rgba(200,200,200,0.2)"

      if screenX? && screenY?
        arc ctx, screenX, screenY, 4, "rgba(0,0,0,0.2)"
      if clientX? && clientY?
        arc ctx, clientX, clientY, 4, "rgba(0,0,0,0.2)"


m.mount document.querySelector("#win"),
  controller: ->
    @test = test =
      orientation: 0
      motion: 0
    win.on.orientation.push ->
      test.orientation += 1
    win.on.motion.push ->
      test.motion += 1

#    requestAnimationFrame =>
#      move()

    return

  view: (c)->
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
      m "style[type='text/css']", "table th, table td { text-align: right; width: 9ex; } canvas { border: 1px solid red; } .bad { color: gray; }"
      m "pre",
        JSON.stringify
          test: win.test
          redraw: c.test
      m "pre",
        JSON.stringify
          browser: head.browser
      m "pre",
        JSON.stringify
          ua: navigator.userAgent
      m "pre",
        JSON.stringify
          DPR: window.devicePixelRatio
          scrolling: win.scrolling
          orientation: [window.orientation, screen.orientation]
      m "pre",
        JSON.stringify
          compass: _.round win.compass, 1
          is_tap:  win.is_tap
          max:     win.max
      m.component Canvas, "#head", present_canvas, size: [800, 600], layout: [-10,  10, 100]
      m.component Canvas, "#tail", present_canvas, size: [600, 400], layout: [ 10, -10, 100]
      m "table",
        m "thead",
          m "tr",
            m "th"
            m "th", "x"
            m "th", "y"
            m "th", "z"
            m "th"
        m "tbody",
          m "tr",
            m "td", "accel"
            m "td", _.round win.accel.x, 2
            m "td", _.round win.accel.y, 2
            m "td", _.round win.accel.z, 2
            m "td"
        m "tbody",
          m "tr",
            m "td", "gravity"
            m "td", _.round win.gravity.x, 2
            m "td", _.round win.gravity.y, 2
            m "td", _.round win.gravity.z, 2
            m "td"
        m "thead",
          m "tr",
            m "th"
            m "th", "alpha"
            m "th", "beta"
            m "th", "gamma"
            m "th"
        m "tbody",
          m "tr",
            m "td", "rotate"
            m "td", _.round win.rotate.alpha, 2
            m "td", _.round win.rotate.beta,  2
            m "td", _.round win.rotate.gamma, 2
            m "td"
        m "tbody",
          m "tr",
            m "td", "orientation"
            m "td", _.round win.orientation.alpha, 2
            m "td", _.round win.orientation.beta,  2
            m "td", _.round win.orientation.gamma, 2
            m "td"
      m "table",
        m "thead",
          m "tr",
            m "th"
            m "th", "width"
            m "th", "height"
            m "th", "horizon"
            m "th", "left"
            m "th", "right"
            m "th", "top"
            m "th", "bottom"
            m "td"
        m "tbody",
          m "tr",
            m "td", "win"
            m "td", _.round win.width
            m "td", _.round win.height
            m "td", _.round win.horizon
            m "td", _.round win.left
            m "td", _.round win.right
            m "td", _.round win.top
            m "td", _.round win.bottom
            m "td"
        m "tbody",
          m "tr",
            m "td", "window.inner"
            m "td", _.round window.innerWidth
            m "td", _.round window.innerHeight
            m "td", _.round window.innerHeight / 2
            m "td", _.round window.scrollX
            m "td", _.round window.innerWidth + window.scrollX
            m "td", _.round window.scrollY
            m "td", _.round window.scrollY + window.innerHeight
            m "td"
        m "tbody",
          m "tr",
            m "td", "(alias)"
            m "td"
            m "td"
            m "td"
            m "td", _.round window.pageXOffset
            m "td"
            m "td", _.round window.pageYOffset
            m "td"
            m "td"
        m "tbody",
          m "tr",
            m "td", "(ios not work)"
            m "td", _.round window.outerWidth
            m "td", _.round window.outerHeight
            m "td"
            m "td"
            m "td"
            m "td"
            m "td"
            m "td"
        m "tbody",
          m "tr",
            m "td", "screen"
            m "td", _.round screen.width
            m "td", _.round screen.height
            m "td"
            m "td", _.round screen.left
            m "td", _.round screen.right
            m "td", _.round screen.top
            m "td", _.round screen.bottom
            m "td"
        m "tbody",
          m "tr",
            m "td", "screen.avail〜"
            m "td", _.round screen.availWidth
            m "td", _.round screen.availHeight
            m "td"
            m "td", _.round screen.availLeft
            m "td", _.round screen.availRight
            m "td", _.round screen.availTop
            m "td", _.round screen.availBottom
            m "td"

        m "tbody",
          m "tr",
            m "td", "document"
            m "td", _.round document.width
            m "td", _.round document.height
            m "td"
            m "td", _.round document.left
            m "td", _.round document.right
            m "td", _.round document.top
            m "td", _.round document.bottom
            m "td"
        m "tbody",
          m "tr",
            m "td", "document.documentElement"
            m "td", _.round document.documentElement.clientWidth
            m "td", _.round document.documentElement.clientHeight
            m "td"
            m "td", _.round document.documentElement.scrollLeft
            m "td"
            m "td", _.round document.documentElement.scrollTop
            m "td"
            m "td"
        if document.body
          m "tbody",
            m "tr",
              m "td", "document.body"
              m "td", _.round document.body.offsetWidth
              m "td", _.round document.body.offsetHeight
              m "td"
              m "td", _.round document.body.scrollLeft
              m "td"
              m "td", _.round document.body.scrollTop
              m "td"
              m "td"

win.on.scroll_end.push Layout.move
win.on.resize.push Layout.move
win.deploy()

expect = chai.expect

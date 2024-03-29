win.scroll.prop = Url.prop.scroll
win.scroll.tick = (center, sec)->
  if center.subid == "S"
    doc.seeing_add center._id, sec
    if 25 == doc.seeing[center._id]
      m.redraw()

win.on.resize.push ->
  if win.short < 380
    head.browser.viewport = "width=device-width, maximum-scale=2.0, minimum-scale=0.5, initial-scale=0.5"
    document.querySelector("meta[name=viewport]")?.content = head.browser.viewport


win.mount \title, -> doc.component.title
win.mount \#to_root, ->
  controller: ->
  view: doc.view.banner
win.mount \#character_tag, ->
  controller: ->
  view: doc.view.characters

win.mount \#buttons, (dom)->
  layout = new win.layout dom, 1, -1
  layout.width = 5

  doc.component.buttons

win.mount \#topviewer, (dom)->
  controller: ->
    layout = new win.layout dom, 0, 1, false, 0
  view: ->
    menu.icon.view()

win.mount \#sow_auth, ->
  controller: ->
  view: ->
    m.component doc.component.sow_auth, Url.prop


if gon?.potofs?
  win.mount \#sayfilter, (dom)->
    controller: !->
      @layout = layout = new win.layout dom, -1, 1
      layout.small_mode = true
      layout.large_mode = ->
        ! (menu.icon.state() || @small_mode)

      cb = ->
        layout.small_mode = ! layout.small_mode
        unless layout.small_mode
          menu.icon.state ""
        window.requestAnimationFrame ->
          layout.translate()

      @wide_attr =
        className: "plane fine"
        onclick: cb
        onmouseup: cb
        ontouchend: cb


    view: ({click, wide_attr, layout})->
      width = doc.width.content()

      layout.width = switch Url.prop.layout()
        when "right"  then 0
        when "center" then (win.width - width - 4) / 2
        when "left"   then (win.width - width - 4)
      layout.width += width if layout.large_mode()

      if layout.width < 90
        layout.width = 90
        potofs = doc.component.potofs_hide
        filter = doc.component.filter_hide
      else
        potofs = doc.component.potofs
        filter = doc.component.filter

      event = Mem.Query.events.find Url.prop.event_id()
      m "div",
        if event?
          m ".head", event.name
        else
          m ".foot"
        m "aside",
          m.component potofs, wide_attr
          m.component filter
        m ".foot"

if gon?.stories?
  Mem.Collection.story.set gon.stories
  win.mount \#stories, (dom)->
    menu.icon.icon "resize-full",
      open: ->
        win.scroll.size = 30
        menu.scope.change "full"
    menu.icon.icon "resize-normal",
      deploy: ->
        win.scroll.size = 120
        menu.scope.change "normal"
      open: ->
        win.scroll.size = 120
        menu.scope.change "normal"
    doc.component.stories

{ safari, mac } = head.browser
if safari && mac
  win.on.load.push ->
    Url.popstate()
win.deploy()
m.endComputation()

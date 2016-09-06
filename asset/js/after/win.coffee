win.scroll.prop = Url.prop.scroll
win.on.tick.push (sec)->
  return unless win.scroll.center?
  { subid, _id } = win.scroll.center
  if subid == "S"
    doc.seeing_add _id, sec
    if 25 == doc.seeing[_id]
      m.redraw()

win.on.resize.push ->
  m.redraw()

win.mount "title", -> doc.component.title
win.mount "#character_tag", -> doc.component.characters

win.mount "#to_root", ->
  controller: ->
  view: doc.view.banner

win.mount "#buttons", (dom)->
  layout = new win.layout dom, 1, -1
  layout.width = 5
  doc.component.buttons

win.mount "#topviewer", (dom)->
  layout = new win.layout dom, 0, 1, false, 0
  doc.component.topviewer

win.mount "#sow_auth", ->
  controller: ->
  view: ->
    m.component doc.component.sow_auth, Url.params

win.mount "#head_navi", ->
    controller: ->
    view: ->
      m ".paragraph",
        m ".left_image"
        m ".right_image"
        m.component doc.component.header

win.mount "#headline", ->
    controller: ->
    view: ->
      m ".choice",
        m.component doc.component.header


if gon?.potofs?
  win.mount "#sayfilter", (dom)->
    controller: ->
      @layout = layout = new win.layout dom, -1, 1
      layout.large_mode = ->
        ! (menu.params.icon || "small" == tie.params.sayfilter)

      @params = {}
      @tie = tie = InputTie.btns @params, ["sayfilter"]
      @tie.change = (id, value, old)->
        switch id
          when "sayfilter"
            menu.params.icon = ""
            layout.translate()

      return


    view: ({tie, layout})->
      width = doc.width.content()

      layout.width = switch Url.params.layout
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

      event = Mem.Query.events.find Url.params.event_id
      tie.draw()
      { attr } = tie.input.sayfilter.field
        className: "plane fine"
      m "div",
        if event?
          m ".head", event.name
        else
          m ".foot"
        m "aside",
          m.component potofs, attr
          m.component filter
        m ".foot"

if gon?.stories?
  Mem.Collection.story.set gon.stories
  win.mount "#stories", (dom)->
    menu.do_change "icon", "resize-normal"
    doc.component.stories


window.addEventListener "hashchange", ({ newURL, oldURL })->
  Url.popstate()

window.addEventListener "popstate", ({ state })->
  Url.popstate()

win.deploy()
m.endComputation()

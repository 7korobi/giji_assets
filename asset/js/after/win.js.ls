
win.scroll.prop = (scroll)->
  if arguments.length
    return unless scroll
    [folder, vid, turn, logid] = scroll.split("-")
    return unless logid?

    updated_at = Mem.Query.messages.find(scroll)?.updated_at || 0
    Url.params.updated_at = updated_at
    Url.params.folder     = folder
    Url.params.turn       = turn
    Url.params.story_id   = "#{folder}-#{vid}"
    Url.params.event_id   = "#{folder}-#{vid}-#{turn}"
    Url.params.message_id = "#{folder}-#{vid}-#{turn}-#{logid}"
    Url.replacestate()
    return
  else
    win.scroll.center?._id


win.scroll.tick = (center, sec)->
  if center.subid == "S"
    doc.seeing_add center._id, sec
    if 25 == doc.seeing[center._id]
      m.redraw()

win.on.resize.push ->
  m.redraw()

win.mount \title, -> doc.component.title
win.mount \#character_tag, -> doc.component.characters

win.mount \#to_root, ->
  controller: ->
  view: doc.view.banner

win.mount \#buttons, (dom)->
  layout = new win.layout dom, 1, -1
  layout.width = 5

  doc.component.buttons

win.mount \#topviewer, (dom)->
  layout = new win.layout dom, 0, 1, false, 0
  controller: ->
  view: ->  menu.icon.sub()

win.mount \#sow_auth, ->
  controller: ->
  view: ->
    m.component doc.component.sow_auth, Url.params

win.mount \#head_navi, ->
    controller: ->
    view: ->
      m ".paragraph",
        m ".left_image"
        m ".right_image"
        m.component doc.component.header

win.mount \#headline, ->
    controller: ->
    view: ->
      m ".choice",
        m.component doc.component.header


if gon?.potofs?
  win.mount \#sayfilter, (dom)->
    controller: !->
      @layout = layout = new win.layout dom, -1, 1
      layout.small_mode = true
      layout.large_mode = ->
        ! (menu.icon.state() || @small_mode)

      g = new win.gesture do
        do: (p)->
          p
          .then ->
            layout.small_mode = ! layout.small_mode
            unless layout.small_mode
              menu.icon.state ""
              layout.translate()

      @wide_attr = g.tap do
        className: "plane fine"


    view: ({click, wide_attr, layout})->
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


window.addEventListener "hashchange", ({ newURL, oldURL })->
  Url.popstate()

window.addEventListener "popstate", ({ state })->
  console.warn state
  Url.popstate()

win.deploy()
m.endComputation()

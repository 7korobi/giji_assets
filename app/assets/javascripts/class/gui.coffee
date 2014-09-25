GUI = 
  portrate: (face_id)->
    m "img", 
      src: "http://7korobi.gehirn.ne.jp/images/portrate/#{face_id}.jpg"

  title: (width, theme, day_or_night)->
    m "img",
      src: "http://7korobi.gehirn.ne.jp/images/banner/title#{width}" + RAILS.head_img[width][theme][day_or_night]


  inline_item: (cb)->
    inline_item_span = (align, em, vdom)->
      m "li",
        style: "width:#{em}em; text-align:#{align};"
      , vdom
    list_cmds =
      center: (em, vdom)-> inline_item_span "center", em, vdom
      right:  (em, vdom)-> inline_item_span "right", em, vdom

    m "ul.mark.inline", cb.call(list_cmds)


  letter: (head, vdom)->
    [ m "h3.mesname",
        m "b", head
      m "p.text", vdom
    ]

  do_tick: (cb)->
    action = ->
      m.startComputation()
      tick = cb(_.now())
      if tick
        setTimeout ->
          action()
        , tick
      m.endComputation()
    action()

  if_exist: (id, cb)->
    dom = document.getElementById(id)
    if !!dom
      win.on.load.push ->
        cb(dom)

  comma: (num)->
    (String Math.round num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

  name:
    config: (o)->
      RAILS.roles[o]?.name || RAILS.gifts[o]?.name || RAILS.events[o]?.name || o || ""

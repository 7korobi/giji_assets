Url.options = LOCATION.options

for key, binds of LOCATION.bind
  LOCATION.bind[key] = {}
  for bind in binds
    LOCATION.bind[key][bind[key]] = bind
Url.bind = LOCATION.bind

Url.bind.scroll = (__, scroll, prop)->
  [folder, vid, turn, logid] = scroll.split("-")
  if logid?
    prop("event_id")   "#{folder}-#{vid}-#{turn}", true
    prop("message_id") "#{folder}-#{vid}-#{turn}-#{logid}", true
  else
    prop("event_id")
    prop("message_id")
  return

Url.routes =
  pathname:
    events: new Url "/:story_id/file"
  pathname:
    story:  new Url "/:story_id.html"
  search:
    faces: new Url "faces=:chr_set~:order~:search",
      unmatch: gon?.map_reduce?.faces? && "?"

    stories: new Url "stories=:game~:rating~:event_type~:role_type~:say_limit~:player_length~:update_at~:update_interval~:search",
      unmatch: gon?.stories? && "?"

    messages: new Url "messages=:scope~:home~:talk~:memo~:open~:uniq~:human~:search",
      unmatch: gon?.events? && "?"

    potofs: new Url "potofs=:potofs_order~:potofs_desc~:potofs_hide",
      unmatch: gon?.potofs? && "?"

    folder: new Url "folder=:folder",
      unmatch: gon?.stories? && "?"

    scroll: new Url "scroll=:scroll",
      unmatch: "?"

    css: new Url "css=:theme~:width~:layout~:font",
      cookie:
        time: 12
        path: "/"
      unmatch: "?"
      change: (params)->
        h = {}
        for key, val of params
          h["#{val}-#{key}"] = true if key? && val? && "String" == ((Url.options[key]?.type) || "String")
        GUI.header Object.keys(h)
        window.requestAnimationFrame ->
          GUI.Layout.resize()


doc.component.title =
  controller: ->
  view: ->
    {story_id, event_id} = Url.prop
    story = Mem.Query.storys.find story_id()
    event = Mem.Query.events.find event_id()
    if story? && event?
      "#{story.name} #{event.name}"
    else
      "人狼議事"

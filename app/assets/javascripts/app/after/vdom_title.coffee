GUI.if_exist "title", (dom)->
  m.mount dom,
    controller: ->
    view: ->
      {story_id, event_id} = Url.prop
      story = Mem.storys.find story_id()
      event = Mem.events.find event_id()
      if story? && event?
        "#{story.name} #{event.name}"
      else
        "人狼議事"

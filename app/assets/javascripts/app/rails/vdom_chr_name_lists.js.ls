win.mount \#chr_name_lists, (dom)->
    controller: ->
    view: ->
      for code_counts, idx in Mem.faces.name_head()
        m "div",
          m "h2", "#{idx} hits の頭文字"
          if code_counts
            for code_str in code_counts
              m ".paragraph",
                m "code", code_str

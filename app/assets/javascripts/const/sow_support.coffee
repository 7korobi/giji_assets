giji =
  gon: ->
    styles = []
    styles.push
      name: "(通常)"
      val:  ""

    styles.push
      name: "等幅"
      val:  "mono"

    styles.push
      name: "見出し"
      val:  "head"

    _.merge {}, 
      errors: {}
      cautions: []
      form:
        side: []
        links: []
        texts: []
        secrets: []
        commands: {}
        styles: styles

  log:
    mesicon: (mestype)-> SOW_RECORD.mestypeicons[mestype]
    mestype: (mestype)-> SOW_RECORD.mestypes[mestype]
  form: {}
  potof:
    roles: (role, gift)->
      _.compact [
        SOW_RECORD.roles[role]
        SOW_RECORD.gifts[gift]
      ]
    select: (selrole)->
      switch selrole
        when -1
          "ランダム"
        when 999
          "見物人"
        else
          SOW_RECORD.roles[selrole]
  story:
    card:
      event:   (list)-> _.compact _.map list.split('/'), (id)-> SOW_RECORD.events[id]
      discard: (list)-> _.compact _.map list.split('/'), (id)-> SOW_RECORD.events[id]
  event:
    event:  (id)-> SOW_RECORD.events[id]
    winner: (id)-> SOW_RECORD.winners[id]

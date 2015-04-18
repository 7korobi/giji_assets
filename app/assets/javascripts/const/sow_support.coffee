giji =
  gon: -> _.merge {}, OPTION.gon
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

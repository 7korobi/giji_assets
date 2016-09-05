new Mem.Rule("form_text").schema ->
  @scope (all)->
    formats: (form_id, mestype)->
      all.where((o)-> o.form_id == form_id && o.mestype == mestype && o.format_name? )

    mestypes: (form_id, format)->
      all.where((o)-> o.form_id == form_id && o.format == format )

  @default ->

  @deploy (o)->
    o._id = "#{o.form_id}-#{o.mestype}-#{o.format}"
    o.mestype_name = Mem.Query.ables.find(o.mestype).label

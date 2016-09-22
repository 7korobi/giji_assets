new Mem.Rule("form_text").schema ->
  @scope (all)->
    formats: (form_id, mestype)->
      all.where((o)-> o.form_id == form_id && o.mestype == mestype && o.format_name? )

    mestypes: (form_id, format)->
      all.where((o)-> o.form_id == form_id && o.format == format )

  class @model extends @model
    ->
      @_id = "#{@form_id}-#{@mestype}-#{@format}"
      @mestype_name = Mem.Query.ables.find(@mestype).label

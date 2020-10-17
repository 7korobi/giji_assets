doc.config = (xhr, options)->
  console.log options
  xhr.overrideMimeType("text/plain; charset=Shift_JIS")

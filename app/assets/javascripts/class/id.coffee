class ID
  @patch_size = Serial.map.size * Serial.map.size * Serial.map.size

  @now = ->
    @at _.now()

  @at = (date, count)->
    count ?= Math.random() * @patch_size
    Serial.serializer.Date(date * @patch_size + count)

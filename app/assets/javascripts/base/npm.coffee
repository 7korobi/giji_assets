deploy = (hash)->
  for key, o of hash
    console.log [key, o]
    window[key] = o

deploy
  _: require 'lodash'
  m: require 'mithril'
  Bounce: require 'bounce.js'
  DELAY: require 'delay.yml'
  head_conf:
    screens: [
      460
      580
      770
    ]
    screensCss:
      gt: true
      gte: false
      lt: true
      lte: false
      eq: false

require 'headjs/dist/1.0.0/head'
if head.browser?
  b = head.browser
  b.viewport = "width=device-width, maximum-scale=4.0, minimum-scale=1.0, initial-scale=1.0"

  if -1 < navigator.userAgent.toLowerCase().indexOf 'windows'
    b.win = true

  if -1 < navigator.userAgent.toLowerCase().indexOf 'macintosh'
    b.mac = true

  if -1 < navigator.userAgent.toLowerCase().indexOf 'android'
    b.android = true

  if b.chrome && b.version < 40
    b.old = true

head.useragent = navigator.userAgent

# ["feature", "js", "browser", "screen", "load", "test", "ready", "useragent", "domloaded"]
# desktop - mobile
# portrait - landscape
# gradient rgba opacity textshadow multiplebgs boxshadow borderimage borderradius cssreflections csstransforms csstransitions touch retina fontface

deploy require 'memory-record'
deploy require 'serialized-property'
deploy require 'mithril-giji'


deploy require 'gui'
deploy require 'menu_tree'
deploy require 'form'
deploy require 'timer'
deploy require 'gui_url'

require '_ext'
require 'gui_animate'
require 'gui_form'

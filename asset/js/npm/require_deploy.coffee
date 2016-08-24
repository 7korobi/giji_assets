deploy = (hash)->
  for key, o of hash
    window[key] = o

deploy
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

deploy
  _: require 'lodash'
  Mem: require 'memory-record'
  Bounce: require 'bounce.js'
  Submit: require 'submit'

  m: require 'mithril'
  win: require 'mithril-giji'
  Canvas: require('mithril-canvas')(head.browser)

  DELAY: require 'delay.yml'

  GUI: require 'gui'
  Url: require 'url_store'
  WebStore: require 'web_store'

require "conf_input"
require "conf_store"

GUI.Animate = require 'gui_animate'
GUI.form = require 'gui_form'

deploy require 'base'
deploy require 'timer'
deploy require 'input'

require '_ext'

if head.browser.chrome
  Input.skip_minlength = true

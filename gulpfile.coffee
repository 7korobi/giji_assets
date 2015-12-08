gulp = require 'gulp'
$ = require('gulp-load-plugins')()

config =
  gulp: gulp
  $: $

  conf: {}

  yml:
    csets: {}
    confs: {}

  clean:
    asset:
      clean: './tmp/cache/gulp*/**/*.{css,js}'
  src:
    amazon:
      gz:   'public/**/*.gz'
    config:
      yaml: 'config/yaml/*.yml'
    asset:
      yaml: 'app/yaml/*.yml'
      html: 'app/assets/htmls/*.{slim,html}'
      css:  'app/assets/stylesheets/*.css'
      js:   'app/assets/javascripts/**/*.{js,ls,coffee,erb}'

  dest:
    public: "public/assets-master/"
    asset:
      js:   'tmp/cache/gulp-js'


gulp.task "default", ->
  gulp.watch "app/**/*.{html,slim}",            ["asset:html"]
  gulp.watch "app/**/*.{js,ls,coffee,erb,yml}", ["asset:js"]
  gulp.watch "app/**/*.{css,scss}",             ["asset:css"]
  gulp.start [
    "asset:html"
    "asset:js"
    "asset:css"
  ]

require('./gulp/amazon') config
require('./gulp/yaml')   config
require('./gulp/asset')  config

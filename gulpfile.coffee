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
      cache: 'public/giji.appcache'
      image: 'public/**/*.{jpg,png,gif}'
      font:  'public/**/*.{svg,eot,ttf,woff}'
      gz:    'public/**/*.gz'
    manifest:
      list:  'public/{assets-master,font,images/auth,images/banner,images/icon,images/portrate,images/bg}/**/*'
      ignore: '!**/*.{html,gz,*_}'
    asset:
      yaml:  'app/yaml/*.yml'
      html:  'app/assets/htmls/*.{slim,html}'
      css:   'app/assets/stylesheets/*.css'
      js:    'app/assets/javascripts/**/*.{js,ls,coffee,erb}'
    config:
      yaml:  'config/yaml/*.yml'

  dest:
    public: "public/assets-master/"
    asset:
      js:   'tmp/cache/gulp-js'


gulp.task "default", ["browser:sync"], ->
  gulp.watch "app/**/*.{html,slim}",            ["asset:html"]
  gulp.watch "app/**/*.{js,ls,coffee,erb,yml}", ["asset:js"]
  gulp.watch "app/**/*.{css,scss}",             ["asset:css"]
  gulp.watch "public/assets-master/*", ["browser:reload"]
  gulp.start [
    "asset:html"
    "asset:js"
    "asset:css"
  ]

require('./gulp/base') config
require('./gulp/yaml')   config
require('./gulp/asset')  config
require('./gulp/browser') config
require('./gulp/amazon') config

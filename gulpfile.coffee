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
      clean: 'tmp/cache/gulp*/**/*.{css,js,yml}'
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
      require: [
        'node_modules'
        'app/yaml'
        'tmp/cache/gulp-js/base/2.in-house'
      ]
      yaml:    'app/yaml/*.yml'
      html:    'app/assets/htmls/*.{slim,html}'
      css:     'app/assets/stylesheets/*.css'
      js:      'app/assets/javascripts/**/*.{js,ls,coffee,erb}'
    config:
      yaml:  'config/yaml/*.yml'

  dest:
    public:  "public/assets-master/"
    asset:
      js:    'tmp/cache/gulp-js'
      asset: 'tmp/cache/gulp-asset'


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

require('./lib/gulp/base') config
require('./lib/gulp/yaml') config
require('./lib/gulp/asset') config
require('./lib/gulp/browser') config
require('./lib/gulp/amazon') config

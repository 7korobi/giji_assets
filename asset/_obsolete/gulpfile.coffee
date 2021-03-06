gulp = require 'gulp'
$ = require('gulp-load-plugins')()


# @@@ is not real dir.
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
      image: 'public/**/*.{jpg,png,gif}'
      font:  'public/**/*.{svg,eot,ttf,woff}'
      face:  '../../web_work/{@@@,images}/**/*'
      old:   'public/{@@@,assets-show-fix,stylesheets/theme}/*'
    manifest:
      list:  'public/{assets-master,font,images/auth,images/banner,images/icon,images/portrate,images/bg}/**/*'
      ignore: '!**/*.{html,gz,*_}'
    asset:
      require: [
        'node_modules'
        'asset/yaml'
        'tmp/cache/gulp-js/require/'
      ]
      yaml:    'asset/yaml/*.yml'
      html:    'asset/html/*.{jade,html}'
      css:     'asset/css/*.css'
      js:      'asset/js/**/*.{js,ls,coffee,erb}'
    config:
      yaml:  'config/yaml/*.yml'

  dest:
    public:  "public/assets-master/"
    asset:
      js:    'tmp/cache/gulp-js'
      asset: 'tmp/cache/gulp-asset'


gulp.task "default", ["browser:sync"], ->
  gulp.watch "asset/**/*.{html,jade}",            ["asset:html"]
  gulp.watch "asset/**/*.{js,ls,coffee,erb,yml}", ["clean", "asset:js"]
  gulp.watch "asset/**/*.{css,scss}",             []
  gulp.start [
    "clean"
    "asset:js"
    "asset:html"
  ]

require('./lib/gulp/base') config
require('./lib/gulp/yaml') config
require('./lib/gulp/asset') config
require('./lib/gulp/browser') config
require('./lib/gulp/amazon') config

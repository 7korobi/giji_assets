module.exports = ({gulp, $, src, dest,  yml})->
  neat = require 'node-neat'
  bower = require 'main-bower-files'
  asset = (cb)->
    cb()
    .pipe gulp.dest dest.public
    .pipe $.gzip gzipOptions: level: 9
    .pipe gulp.dest dest.public

  manifest = ->
    gulp
    .src [ src.manifest.list, src.manifest.ignore ]
    .pipe $.sort()
    .pipe $.manifest
      filename: "giji.appcache"
      exclude:  'giji.appcache'
      hash: false
      timestamp: true
      preferOnline: true
    .pipe gulp.dest 'public'

  gulp.task "asset", ['asset:css', 'asset:js', 'asset:html'], manifest
  gulp.task "asset:manifest", manifest


  gulp.task "asset:html", ->
    locals = {}
    asset ->
      gulp
      .src src.asset.html
      .pipe $.plumber()
      .pipe $.sort()
      .pipe $.if "*.slim", $.jade()
      .pipe $.if "*.html.html", $.rename extname: ""


  # https://github.com/csscomb/csscomb.js/blob/master/doc/options.md
  gulp.task "asset:css", ->
    asset ->
      gulp
      .src src.asset.css
      .pipe $.plumber()
      .pipe $.sort()
      .pipe $.include()
      .pipe $.sass includePaths: neat.includePaths
      .pipe $.csso true
      .pipe $.shorthand()
      .pipe $.csscomb()


  gulp.task "asset:js", ["asset:js:tmp"], ->
    asset ->
      gulp
      .src dest.asset.js + "/*.js"
      .pipe $.sort()
      .pipe $.include()

  gulp.task "asset:bower", ["clean"], ->
    gulp
    .src bower
      checkExistence: true
    .pipe $.sort()
    .pipe gulp.dest dest.asset.bower

  gulp.task "asset:js:tmp", ["asset:bower", "clean", "asset:yaml"], ->
    gulp
    .src src.asset.js
    .pipe $.plumber()
    .pipe $.if "*.erb", $.ejs(yml)
    .pipe $.if "*.html", $.rename extname: ""
    .pipe $.if "*.coffee", $.coffee()
    .pipe $.if "*.ls", $.livescript()
    .pipe $.if "*.js.js", $.rename extname: ""
    .pipe $.if "*.js.js", $.rename extname: ""
    .pipe $.if "*.js.js", $.rename extname: ""
    .pipe gulp.dest dest.asset.js

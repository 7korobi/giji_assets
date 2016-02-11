module.exports = ({gulp, $, src, dest,  yml})->
  neat = require 'node-neat'
  source = require 'vinyl-source-stream'
  browserify = require 'browserify'
  yamlify = require 'yamlify'


  alert = (err)->
    console.log err.toString()
    @emit "end"

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
      .on "error", alert
      .pipe $.sort()
      .pipe $.if "*.slim", $.jade()
      .pipe $.if "*.html.html", $.rename extname: ""


  # https://github.com/csscomb/csscomb.js/blob/master/doc/options.md
  gulp.task "asset:css", ->
    asset ->
      gulp
      .src src.asset.css
      .on "error", alert
      .pipe $.sort()
      .pipe $.include()
      .pipe $.sass includePaths: neat.includePaths
      .pipe $.csso true
      .pipe $.shorthand()
      .pipe $.csscomb()


  gulp.task "asset:js", ["asset:js:plane", "asset:js:npm:base"], ->

  gulp.task "asset:js:plane", ["asset:js:asset"], ->
    asset ->
      gulp
      .src [
        dest.asset.asset + "/*.js"
        "!" + dest.asset.asset + "/base.js"
      ]


  gulp.task "asset:js:npm:base", ["asset:js:asset"], ->
    asset ->
      browserify
        entries: [dest.asset.asset + "/base.js"]
        extensions: [""]
        paths: src.asset.require
      .transform { global: true }, "uglifyify"
      .transform "yamlify"
      .bundle()
      .pipe source 'base.js'


  gulp.task "asset:js:asset", ["asset:js:tmp"], ->
    gulp
    .src dest.asset.js + "/*.js"
    .on "error", alert
    .pipe $.sort()
    .pipe $.include()
    .pipe gulp.dest dest.asset.asset


  gulp.task "asset:js:tmp", ["clean", "asset:yaml"], ->
    gulp
    .src [src.asset.js]
    .on "error", alert
    .pipe $.if "*.erb", $.ejs(yml)
    .pipe $.if "*.html", $.rename extname: ""
    .pipe $.if "*.coffee", $.coffee()
    .pipe $.if "*.ls", $.livescript()
    .pipe $.if "*.js.js", $.rename extname: ""
    .pipe $.if "*.js.js", $.rename extname: ""
    .pipe $.if "*.js.js", $.rename extname: ""
    .pipe gulp.dest dest.asset.js

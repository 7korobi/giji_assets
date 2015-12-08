module.exports = ({gulp, $, src, dest, clean,  yml})->
  del = require 'del'
  neat = require 'node-neat'
  asset = (cb)->
    cb()
    .pipe gulp.dest dest.public
    .pipe $.gzip gzipOptions: level: 9
    .pipe gulp.dest dest.public


  gulp.task "asset:clean", (cb)->
    del clean.asset.clean, cb


  # https://github.com/csscomb/csscomb.js/blob/master/doc/options.md
  gulp.task "asset:css", ->
    asset ->
      gulp
      .src src.asset.css
      .pipe $.plumber()
      .pipe $.include()
      .pipe $.sass includePaths: neat.includePaths
      .pipe $.csso true
      .pipe $.shorthand()
      .pipe $.csscomb()


  gulp.task "asset:js", ["asset:js:tmp"], ->
    asset ->
      gulp
      .src dest.asset.js.tmp + "/*.js"
      .pipe $.include()


  gulp.task "asset:html", ->
    locals = {}
    asset ->
      gulp
      .src src.asset.html
      .pipe $.plumber()
      .pipe $.if "*.slim", $.jade()
      .pipe $.if "*.html.html", $.rename extname: ""


  gulp.task "asset:js:tmp", ["asset:clean", "asset:yaml"], ->
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

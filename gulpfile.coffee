gulp = require 'gulp'

del = require 'del'
path = require 'path'
yaml = require 'js-yaml'
neat = require 'node-neat'
merge = require 'merge-stream'

$ = require('gulp-load-plugins')()

paths =
  scss_in: [
    "./app/assets/stylesheets/base/*.scss"
    "./app/assets/stylesheets/lib/*.scss"
    "./app/assets/stylesheets/theme/*.scss"
  ]


yml =
  csets: {}
  confs: {}


asset = (cb)->
  target = "./public/assets-master/"
  cb()
  .pipe gulp.dest target
  .pipe $.gzip gzipOptions: level: 9
  .pipe gulp.dest target


gulp.task "default", ->
  gulp.watch "app/**/*.{html,slim}",            ["asset:html"]
  gulp.watch "app/**/*.{js,ls,coffee,erb,yml}", ["asset:js"]
  gulp.watch "app/**/*.{css,scss}",             ["asset:css"]
  gulp.start [
    "asset:html"
    "asset:js"
    "asset:css"
  ]


gulp.task "asset:js", ["asset:js:tmp"], ->
  asset ->
    gulp
    .src './tmp/cache/gulp-js/*.js'
    .pipe $.include()


gulp.task "asset:html", ->
  locals = {}
  asset ->
    gulp
    .src './app/assets/htmls/*.{slim,html}'
    .pipe $.plumber()
    .pipe $.if "*.slim", $.jade()
    .pipe $.if "*.html.html", $.rename extname: ""


gulp.task "asset:css", ->
  asset ->
    application = gulp
    .src ['./app/assets/stylesheets/application.css.scss']
    .pipe $.plumber()
    .pipe $.inject gulp.src(paths.scss_in), relative: true
    .pipe $.sass includePaths: neat.includePaths
    .on 'error', (err)-> console.log err.message
    .pipe $.cssnext compress: false
    .pipe $.if "*.css.css", $.rename extname: ""

    spec = gulp
    .src './app/assets/stylesheets/*.css'
    .pipe $.include()

    merge application, spec


gulp.task "asset:clean", (cb)->
  del ['./tmp/cache/gulp*'], cb


gulp.task "asset:yaml", ->
  gulp
  .src './app/yaml/*.yml'
  .pipe $.plumber()
  .pipe $.data (file)->
    file.key = path.basename(file.path, ".yml").toUpperCase()
    yml[file.key] = yaml.load(file.contents)

  .pipe $.data (file)->
    file.key = path.basename(file.path, ".yml").toUpperCase()
    data = yml[file.key]
    if file.key.match /^MSG_/
      if data.rails
        yml.MESSAGE.rails.push data.rails...
        yml.MESSAGE.module.rails.push data.module
      if data.sow
        yml.MESSAGE.sow.push data.sow...
        yml.MESSAGE.module.sow.push data.module

    if file.key.match /^CS_/
      id = data.chr_set._id
      data.chr_set.chr_set_id = id
      deploy = (o)->
        o._id = "#{id}_#{o.face_id}"
        o.chr_set_id = id
      data.chr_npc.map deploy
      data.chr_job.map deploy
      yml.csets[ file.key ] = data

    if m = file.key.match /^CONF_(.+)/
      yml.confs[ m[1].toLowerCase() ] = data


gulp.task "asset:js:tmp", ["asset:clean", "asset:yaml"], ->
  gulp
  .src ['./app/assets/javascripts/**/*.{js,ls,coffee,erb}']
  .pipe $.plumber()
  .pipe $.if "*.erb", $.ejs(yml)
  .pipe $.if "*.html", $.rename extname: ""
  .pipe $.if "*.coffee", $.coffee()
  .pipe $.if "*.js.js", $.rename extname: ""
  .pipe $.if "*.ls", $.livescript()
  .pipe $.if "*.js.js", $.rename extname: ""
  .pipe gulp.dest "./tmp/cache/gulp-js"

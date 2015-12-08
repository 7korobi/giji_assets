module.exports = ({gulp, $, src,  yml, conf})->
  path = require 'path'
  yaml = require 'js-yaml'
  yaml_const = (conf)->
    $.data (file)->
      file.key = path.basename(file.path, ".yml").toUpperCase()
      conf[file.key] = yaml.load(file.contents)

  gulp.task "config:yaml", ->
    gulp
    .src src.config.yaml
    .pipe $.plumber()
    .pipe yaml_const conf


  gulp.task "asset:yaml", ->
    gulp
    .src src.asset.yaml
    .pipe $.plumber()
    .pipe yaml_const yml

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

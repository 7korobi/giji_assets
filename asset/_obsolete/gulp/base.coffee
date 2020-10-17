module.exports = ({gulp, $, dest, clean,  yml})->
  del = require 'del'


  gulp.task "clean", (cb)->
    del [clean.asset.clean], cb

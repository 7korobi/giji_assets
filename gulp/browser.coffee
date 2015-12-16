module.exports = ({gulp, $, src, dest,  yml})->
  sync = require 'browser-sync'


  gulp.task "browser:sync", ->
    sync.init
      server:
        baseDir: dest.public
      startPath: "test_vmake_form.html"
      port: 37564

  gulp.task "browser:reload", ->
    sync.reload()
    

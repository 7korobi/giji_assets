module.exports = ({gulp, $, src, conf})->
  gulp.task "amazon", ['amazon:gz'], ->

  gulp.task "amazon:gz", ['config:yaml'], ->
    giji = $.awspublish.create conf.GIJI_S3
    headers =
      'Cache-Control': 'max-age=315360000, no-transform, public'
      'Content-Encoding': 'gzip'
    options = {}

    gulp
    .src src.amazon.gz
    .pipe $.rename extname: ""
    .pipe giji.publish headers, options
    .pipe giji.cache()
    .pipe $.awspublish.reporter()

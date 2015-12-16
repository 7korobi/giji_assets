module.exports = ({gulp, $, src, conf})->


  amazon = (headers, cb)->
    giji = $.awspublish.create conf.GIJI_S3
    options = {}

    cb()
    .pipe giji.publish headers, options
    .pipe giji.cache()
    .pipe $.awspublish.reporter
      states: [
        'create'
        'update'
        'delete'
#        'cache'
#        'skip'
      ]

  gulp.task "amazon", ['config:yaml'], ->
    headers =
      'Cache-Control': 'max-age=315360000, no-transform, public'
      'Content-Encoding': 'gzip'
    amazon headers, ->
      gulp
      .src [src.amazon.cache, src.amazon.gz, src.amazon.image, src.amazon.font]
      .pipe $.if "*.gz", $.rename extname: ""

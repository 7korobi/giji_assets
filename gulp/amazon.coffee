module.exports = ({gulp, $, src, conf})->


  amazon = (headers, cb)->
    giji = $.awspublish.create conf.GIJI_S3
    options = {}

    cb()
    .pipe giji.publish headers, options
    .pipe giji.cache()
    .pipe $.awspublish.reporter
      states: ['create', 'update', 'delete']


  gulp.task "amazon", ['amazon:gz', 'amazon:manifest'], ->


  gulp.task "amazon:manifest", ['config:yaml'], ->
    amazon {}, ->
      gulp
      .src ["public/{assets-master,font,images/auth,images/banner,images/icon,images/portrate,images/bg}/**/*", "!**/*.{html,gz,*_}"]
      .pipe $.manifest
        filename: "giji.appcache"
        exclude:  'giji.appcache'
        timestamp: true
        hash: false
      .pipe gulp.dest 'public'


  gulp.task "amazon:gz", ['config:yaml'], ->
    headers =
      'Cache-Control': 'max-age=315360000, no-transform, public'
      'Content-Encoding': 'gzip'
    amazon headers, ->
      gulp
      .src [src.amazon.gz, src.amazon.image, src.amazon.font]
      .pipe $.if "*.gz", $.rename extname: ""

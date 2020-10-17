ext =
  gz:  "public/**/*.{json,js,svg,map,ttf,css}"
  img: 'public/**/*.{jpg,png,ico,woff,zip}'
  nop: 'public/**/*.{html}'

module.exports = ({gulp, $, src, conf})->
  pipes = (src, list)->
    o = gulp.src src
    for item in list
      o = o.pipe item
    o

  pack = ({ src, pipe })->
    src.map (src)->
      cp
        src: src + "**.js"
        dst: src
        pipe: pipe

  cp = ({ src, dst, pipe = [] })->
    pipes src, [
      $.newer dst
      ...pipe
      gulp.dest dst
    ]

  amazon = ({ src, headers, pipe = [], options = {} })->
    giji = $.awspublish.create conf.GIJI_S3

    pipes src, [
      ...pipe
      giji.publish headers, options
      giji.cache()
      $.awspublish.reporter
        states: [
          'create'
          'update'
          'delete'
  #        'cache'
  #        'skip'
        ]
    ]  

  gulp.task "amazon", ["amazon:gz", "amazon:img"]
  gulp.task "amazon:gz", ['config:yaml', 'amazon:pack:gz'], ->
    amazon
      src: [
        'public/**/*.gz'
      ]
      headers:
        'Cache-Control': 'max-age=315360000, no-transform, public'
        'Content-Encoding': 'gzip'
      pipe: [
        $.rename extname: ""
      ]

  gulp.task "amazon:br", ['config:yaml', 'amazon:pack:br'], ->
    amazon
      src: [
        'public/**/*.br'
      ]
      headers:
        'Cache-Control': 'max-age=315360000, no-transform, public'
        'Content-Encoding': 'br'
      pipe: [
        $.rename extname: ""
      ]

  gulp.task "amazon:img", ['config:yaml'], ->
    amazon
      src: ext.img
      headers:
        'Cache-Control': 'max-age=315360000, no-transform, public'

  gulp.task "amazon:pack:br", ->
    dst = "public/"
    pipes ext.br, [
      $.brotli.compress quality: 11
      gulp.dest dst
    ]

  gulp.task "amazon:pack:gz", ->
    dst = "public/"
    pipes ext.gz, [
      $.gzip gzipOptions: level: 9
      gulp.dest dst
    ]


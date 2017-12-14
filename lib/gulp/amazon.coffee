

module.exports = ({gulp, $, src, conf})->
  pipes = (src, list)->
    o = gulp.src src
    for item in list
      o = o.pipe item
    o

  pack = ({ src })->
    src.map (src)->
      cp
        src: src + "**.js"
        dst: src
        pipe: [
          $.gzip gzipOptions: level: 9
        ]
      cp
        src: src + "**.js"
        dst: src
        pipe: [
          $.brotli.compress
            quality: 11
        ]

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

  gulp.task "amazon", ["amazon:br"]
  gulp.task "amazon:gz", ['config:yaml', 'amazon:gz-pack'], ->
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

  gulp.task "amazon:br", ['config:yaml'], ->
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


  gulp.task "amazon:gz-pack", ->
    pack
      src: [
        "public/assets-show-fix/"
        "public/javascripts/"
      ]


module.exports = (grunt)->
  pkg = grunt.file.readJSON 'package.json'
  config =
    pkg: pkg

    watch:
      files: ['{src,test}/**/*.coffee']
      tasks: ['spec']

    "mocha-chai-sinon":
      build:
        src: ['test/**/*.coffee']
        options:
          ui: 'bdd'
          reporter: 'list'

  grunt.initConfig config

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks "grunt-mocha-chai-sinon"

  grunt.task.registerTask "default", ["spec", "watch"]
  grunt.task.registerTask "spec", ["mocha-chai-sinon"]

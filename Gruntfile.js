/**
 * Created by aldo on 10/2/13.
 */
module.exports = function(grunt) {
    'use strict';

    var files = [
        'app/controllers/**/*.js',
        'app/services/**/*.js',
        'app/helpers/**/*.js',
        'app/models/**/*.js',
        'tests/**/**/*.js',
        'tasks/**/*.js',
        'public/js/*.js',
        'public/js/admin/*.js',
        'public/js/item/*.js',
        'public/js/scripts/*.js',
        'public/js/scripts/**/*.js',
        '*.js',
        '*.html'
    ];

    // Project configuration.
    grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            all: files,
            options: {
                curly: true,
                eqeqeq: true,
                expr: true,
                indent: 2,
                quotmark: 'single',
                trailing: true,
                funcscope: true,
                asi: false,
                boss: true,
                unused: false,
                eqnull: false,
                es5: false,
                node: true,
                forin: false,
                onevar: true,
                evil: true,
                immed: false,
                laxbreak: false,
                laxcomma: true,
                noarg: true,
                newcap: true,
                strict: true,
                noempty: true,
                plusplus: false,
                undef: false,
                sub: true,
                white: false,
                loopfunc: true,
                globals: {
                    'models': true
                }
            }
        },
        watch: {
          options: {
            livereload: true
          },
          jshint: {
              files: files,
              tasks: ['jshint']
          },
          all: {
              files: files,
              tasks: ['default']
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
//    grunt.loadNpmTasks('grunt-contrib-concat');
//    grunt.loadNpmTasks('grunt-contrib-uglify');
//    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('db', ['db:migrate']);
    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};
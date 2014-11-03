'use strict';

module.exports = function (grunt) {
    var REPORTER = grunt.option('reporter') || 'spec';
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.option('stack', true);

    grunt.initConfig({
        jshint: {
            files: [
                'src/*.js',
                'test/*.js'
            ],
            options: {
                jshintrc: true
            }
        },
        simplemocha: {
            test: {
                src: 'test/test.js',
                options: {
                    reporter: REPORTER
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/*.js', 'test/*.js'],
                tasks: ['jshint', 'simplemocha']
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'simplemocha']);
};

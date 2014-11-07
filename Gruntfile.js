module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', ['exec:bower', 'concat:libs', 'copy']);

    grunt.initConfig({
        jsDir: 'public/javascripts/',
        jsDistDir: 'dist/javascripts',
        cssDir: 'public/stylesheets',
        cssDistDir: 'dist/stylesheets',
        pkg: grunt.file.readJSON('package.json'),

        vendor: {
            js: [
                'bower_components/jquery/dist/jquery.js',
                'bower_components/angular/angular.js',
                'bower_components/firebase/firebase.js',
                'bower_components/angularfire/dist/angularfire.js',
                'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
            ]
        },

        exec: {
            bower: {
                command: 'bower install'
            }
        },

        concat: {
            libs: {
                src: '<%= vendor.js %>',
                dest: '<%= jsDistDir %>/libs.js'
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, src: ['<%= jsDir %>/app/*'], dest: '<%= jsDistDir %>', filter: 'isFile', flatten: true},
                    {expand: true, src: ['<%= cssDir %>/*'], dest: '<%= cssDistDir %>', filter: 'isFile', flatten: true}
                ]
            }
        }
    });
};
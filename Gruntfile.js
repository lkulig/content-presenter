module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', ['exec:bower', 'clean:build', 'concat:libs', 'ngAnnotate:app', 'concat:app', 'clean:temp', 'copy']);
    grunt.registerTask('production', ['exec:bower', 'clean:build', 'concat:libs', 'uglify:libs', 'ngAnnotate:app', 'uglify:app', 'clean:temp', 'copy']);

    grunt.initConfig({
            jsDir: 'public/javascripts/web',
            jsDistDir: 'dist/javascripts',
            cssDir: 'public/stylesheets',
            cssDistDir: 'dist/stylesheets',
            imgDir: 'public/images',
            imgDistDir: 'dist/images',
            pkg: grunt.file.readJSON('package.json'),

            vendor: {
                js: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/firebase/firebase.js',
                    'bower_components/angularfire/dist/angularfire.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                    'bower_components/tinymce/tinymce.js',
                    'bower_components/angular-ui-tinymce/src/tinymce.js'
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
                },
                app: {
                    src: '<%= jsDistDir %>/temp/**/*.js',
                    dest: '<%= jsDistDir %>/app.js'
                }
            },

            clean: {
                build: {
                    src: ['dist/']
                },
                temp: {
                    src: ['<%= jsDistDir %>/temp']
                }
            },

            uglify: {
                libs: {
                    files: {
                        '<%= jsDistDir %>/libs.js': ['<%= vendor.js %>']
                    }
                },
                app: {
                    files: {
                        '<%= jsDistDir %>/app.js': ['<%= jsDistDir %>/temp/**/*.js']
                    }
                }
            },

            ngAnnotate: {
                app: {
                    files: [
                        {
                            expand: true,
                            flatten: true,
                            src: ['<%= jsDir %>/**/*.js'],
                            dest: '<%= jsDistDir %>/temp/'
                        }
                    ]
                }
            },

            copy: {
                assets: {
                    files: [
                        {expand: true, src: ['<%= cssDir %>/*'], dest: '<%= cssDistDir %>', filter: 'isFile', flatten: true},
                        {expand: true, src: ['<%= imgDir %>/*'], dest: '<%= imgDistDir %>', filter: 'isFile', flatten: true}
                    ]
                },
                tinyMCE: {
                    files: [
                        {expand: true, cwd: 'bower_components/tinymce/', src: ['plugins/**/*.*'], dest: '<%= jsDistDir %>/'},
                        {expand: true, cwd: 'bower_components/tinymce/', src: ['skins/**/*.*'], dest: '<%= jsDistDir %>/'},
                        {expand: true, cwd: 'bower_components/tinymce/', src: ['themes/**/*.*'], dest: '<%= jsDistDir %>/'}
                    ]
                }
            }
        }
    )
};

module.exports = function(grunt) {

    var globalConfig = {
        app: 'app',
        dist: 'dist',
        bower_path: 'bower_components'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        global: globalConfig,
        jshint: {
            all: ['Gruntfile.js', 'app/js/**/*.js', ],
        },
        browserify: {
            options: {
                transform: ["node-underscorify"],
                debug: true,
                exclude: ['jquery']
            },
            app: {
                src: ['<%= global.app %>/**/*.js'],
                dest: '<%= global.dist %>/js/bundle.js'
            }
        },
        bower_concat: {
            all: {
                dest: '<%= global.dist %>/js/bower.js',
                cssDest: '<%= global.dist %>/css/bower.css',
                // exclude: ['jquery'],
                mainFiles: {
                    'datatables': 'media/js/jquery.dataTables.js',
                    'moment': 'min/moment-with-locales.js'
                },
                dependencies: {
                    'datatables.bootstrap.js': 'datatables'
                }
                //bowerOptions: {
                //  relative: false
                //}
            }
        },
        uglify: {
            options: {
                mangle: true,
                compress: true
            },
            app: {
                files: {
                    '<%= global.dist %>/js/bundle.min.js': '<%= global.dist %>/js/bundle.js'
                }
            },
            bower: {
                files: {
                    '<%= global.dist %>/js/bower.min.js': '<%= global.dist %>/js/bower.js'
                }
            }
        },
        cssmin: {
            development: {
                expand: true,
                cwd: '<%= global.dist %>/css',
                src: ['*.css', '!*.min.css'],
                dest: '<%= global.dist %>/css',
                ext: '.min.css'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= global.app %>',
                    src: '*.html',
                    dest: '<%= global.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: ['fonts/*.*'],
                    dest: '<%= global.dist %>'
                },
                {
                    expand: true,
                    cwd: 'bower_components/font-awesome',
                    src: ['fonts/*.*'],
                    dest: '<%= global.dist %>'
                },
                {
                    expand: true,
                    cwd: '<%= global.app %>',
                    src: 'css/*.css',
                    dest: '<%= global.dist %>'
                }]
            }
        },
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('compile', ['browserify', 'uglify']);
    grunt.registerTask('default', ['jshint', 'browserify', 'bower_concat', 'copy', 'uglify', 'cssmin', 'htmlmin']);
};

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/steps.js',
                dest: 'build/steps.min.js'
            },
        },
        cssmin: {
            compress: {
                files: {
                    'build/steps.min.css': [ 'css/steps.css' ]
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: false,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                expr: true,
                jquery: true,
                loopfunc: true,
                trailing: true,
                globals: {
                    head: false,
                    module: false,
                    console: false,
                    unescape: false
                }
            },
            files: [ 'Gruntfile.js', 'js/steps.js' ]
        },
        clean: ['build/steps.min.js', 'steps.min.css']
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin']);
    grunt.registerTask('test', 'jshint');
    grunt.registerTask('lint', 'jshint');
    grunt.registerTask('buildall', ['clean', 'jshint', 'uglify', 'cssmin']);

};

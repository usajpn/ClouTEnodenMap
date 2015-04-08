module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    
    grunt.initConfig({
        concat: {
            enoshimap_sox_client: {
                src: [
                    './js/lib/jquery-1.10.2.js',
                    './js/lib/jquery.dropotron.min.js',
                    './js/lib/config.js',
                    './js/lib/underscore-min.js',
                    './js/lib/backbone.js',
                    './js/lib/strophe.js',
                    './js/lib/sox.strophe.pubsub.js',
                    './js/lib/strope.x.js',
                    './js/lib/jscron.js',
                    './js/sox/SoxClient.js',
                    './js/sox/SoxEventListener.js',
                    './js/sox/Device.js',
                    './js/sox/Transducer.js',
                    './js/sox/SensorData.js',
                    './js/sox/EnodenTimetable.js',
                    './bower_components/Processing.js/processing.js'
                ],
                dest: 'dist/Enoshimap.js'
            }
        },
        connect: {
            server: {
                options: {
                    port: 9999,
                    base: ""
                }
            }
        },
        watch: {}
    });

    // Load depedencies from package.json
    var taskName;
    for(taskName in pkg.devDependencies) {
        if(taskName.substring(0, 6) == 'grunt-') {
            grunt.loadNpmTasks(taskName);
        }
    }

    // Default task(s).
    grunt.registerTask('default', ['concat', 'connect', 'watch']);
    grunt.registerTask('create', ['concat']);

};

// var GruntPATH 	= 'E:/PHP/TestPHP/BuildJS/gruntjs/Build_V3/';
var BuildPATH 	= './tmp/';
var OutputPATH 	= './';

// COMANDE: $ grunt

console.log('\n***************************************************************************\n');
console.log('* 	OutputPATH : '	+	OutputPATH	+	'\n');
console.log('***************************************************************************\n');

module.exports = function(grunt) {
	//grunt.file.setBase(GruntPATH);
    grunt.initConfig({
      	clean: {
             build: [BuildPATH],
        },
        copy: {
            main: {
                expand: true,
                cwd: BuildPATH,
                src: '**',
                dest: OutputPATH,
            },
        },

        concat : {
            options: {
                separator: '\n\n//------------------------------------------\n',
                banner: '\n\n//------------------------------------------\n'
            },
	   		all : {
                src: [
      					  'lib/jquery-1.11.1.min.js',
			      		  'app.js'
					      ],
                dest: BuildPATH + 'all.src.js'
            }
        }, //concat
		uglify: {
			options: {
			  mangle: false,
			  compress : true
			},
			all: {
			  files: {
				'./tmp/all.min.js': [ BuildPATH + 'all.src.js']
			  }
			}
		},
		obfuscator: {
		    options: {
		        //banner: '// obfuscated with grunt-contrib-obfuscator.\n',
		        //debugProtection: true,
		        //debugProtectionInterval: true,
		        //domainLock: ['www.example.com']
		    },
		    task: {
		        options: {
		            // options for each sub task
		        },
		        files: {
		            './tmp/all.js': [
		                BuildPATH + 'all.src.js'
		            ]
		        }
		    }
		},
        watch: {
            options: {
                spawn: false,
                interval: 1000,
                //livereload: 35730 //35729
				//livereload: parseInt('357290'+Math.floor(Math.random()*1000),10)
            },
            scripts: {
                files: ['app/**/*.js','lib/**/*.js'],
				        tasks: ['concat','obfuscator', 'copy', 'clean']
                // obfuscator is very optional
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
 	  grunt.loadNpmTasks('grunt-contrib-uglify');
 	  // grunt.loadNpmTasks('grunt-contrib-obfuscator');

	  grunt.registerTask('default', ['concat', 'obfuscator', 'copy','clean']);// ,'watch'

}; //wrapper function

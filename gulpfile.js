var gulp = require('gulp')
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	bust = require('gulp-buster'),
	sourcemaps = require('gulp-sourcemaps');

		// gutil = require( 'gulp-util' );


gulp.task('default', [ 'sass', 'concat' ]);


// To append version number to asset files for fingerprinting
gulp.task('bust', function () {
  return gulp.src('./assets/css/*.css')
		.pipe(bust( { algo: 'md5' } ))           // pipe generated files into gulp-buster
    // .pipe(bust().on('error', bust.logError))
		.pipe(gulp.dest('.'));  // output busters.json to project root
    // .pipe(gulp.dest('./assets/css'));
});

// SASS compiler
gulp.task('sass', function () {
  return gulp.src('./assets/scss/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('./assets/css'));
});


gulp.task('concat', function() {
  return gulp.src(['./assets/css/bootstrap.css', './assets/css/style.css', './assets/css/watchdogs.css'])
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('watch', function(){
  gulp.watch('assets/scss/**', ['sass'])
});

////////////////////////////////////////
// FTP DEPLOY
/////////////////////////////////////
gulp.task( 'deploy', function () {
  // https://github.com/morris/vinyl-ftp

	var conn = ftp.create( {
		host:     HOSTNAME,
		user:     USERNAME,
		password: PASSWORD,
    port:     21,
		parallel: 10, // default is 3
		log:      gutil.log,
    idleTimeout: 25000,
    timeOffset: 0, // Offset server time by this number of minutes, default is 0
    // secure: true,
	} );

	var globs = [
		'assets/css/**',
    'assets/js/**',
    'assets/img/**',
		'index.php',
    'head.php',
    'footer.php'
	];

	// using base = '.' will transfer everything to /public_html correctly
	// turn off buffering in gulp.src for best performance

	return gulp.src( globs, { base: '.', buffer: false } )
		.pipe( conn.newer( '/public_html' ) ) // only upload newer files
		.pipe( conn.dest( '/richebois/projets/citadelle' ) );

} );

'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
let $ = gulpLoadPlugins({
		DEBUG: false,
		lazy: true
});

/**
 * Gulp Watch
 */
// Watches for a file change/add and injects it into the index.html
let watcher = gulp.watch('public/app/**/*.js', ['inject']);
watcher.on('change', function(event) {
	log('File ' + $.util.colors.red(event.path) + ' was ' + $.util.colors.red(event.type) + ', running tasks...');
});


/**
 * Gulp Tasks
 */

// Gives Gulp task listing
gulp.task('default', ['help']);

// This lists all of the tasks available
gulp.task('help', $.taskListing);

// Cleans out the temp directory.
gulp.task('clean:temp', (done) => {
		return clean('temp', done);
});

// Babels all my code and puts in in the temp/js directory
gulp.task('babel', () => {

	 return gulp
				.src('public/app/**/*.js')
				.pipe($.babel({
						presets: ['es2015']
				}))
				.pipe(gulp.dest('temp/js'));
		
});

// Minifies all my html and puts it into an Angular Templatecache; making things faster.
gulp.task('templateCache', () => {

	 return gulp
				.src('public/app/**/*.html')
				.pipe($.htmlmin({
					collapseWhitespace: true,
					removeComments: true,
					caseSensitive: true,
					collapseInlineTagWhitespace: true
				}))
				.pipe($.angularTemplatecache(
						'templates.js',
						{
								module:'app',
								standalone: false,
								root: '/public/app/'
						}
				))
				.pipe(gulp.dest('temp/js/templates'))  ;   
});

// Injects all of the *.js files in temp/js into the index.html
gulp.task('inject', ['clean:temp', 'babel', 'templateCache'], () => {

	 return gulp
				.src('public/index.html')
				.pipe($.inject(
						gulp.src('temp/js/**/*.js', {read: true})
						.pipe($.angularFilesort()).pipe($.angularFilesort())
				))
				.pipe(gulp.dest('public/'));
		
});


/**
 * Utility Functions
 */

function log(msg) {
				if(typeof(msg) === 'object') {
								for (var item in msg) {
												if (msg.hasOwnProperty(item)) {
																$.util.log($.util.colors.cyan(msg[item]));
												}
								}
				} else {
								$.util.log($.util.colors.cyan(msg));
				}
}

function clean(path, done) {
		log('Cleaning: ' + $.util.colors.red(path));

		del(path);
		
		return done();
}

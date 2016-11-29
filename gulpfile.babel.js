'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
let $ = gulpLoadPlugins({lazy: true});

/**
 * Gulp Watch
 */
// Watches for a file change/add and injects it into the index.html



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

// Lints my code in both the server/ and public/ directories. Prevents other tasks from running
// if an error is found.
gulp.task('lint', () => {
	return gulp
		.src([
			'**/*.js', 
			'!public/vendors/**', 
			'!node_modules/**',
			'./*.js'])
		.pipe($.eslint())
		.pipe($.eslint.format())
		.pipe($.eslint.failAfterError());
});

// Babels all my code and puts in in the temp/js directory
gulp.task('babel', ['clean:temp'], () => {

	return gulp
		.src('public/app/**/*.js')
		.pipe($.babel({
				presets: ['es2015']
		}))
		.pipe(gulp.dest('temp/js'));
		
});

// Minifies all my html and puts it into an Angular Templatecache; making things faster.
gulp.task('templateCache', ['babel'], () => {

	return gulp
		.src(['public/content/**/*.html', 'public/**/*.html'])
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
		.pipe(gulp.dest('temp/js/templates'));
		
});

// Compile SASS and inject it into index.html
gulp.task('styles', ['templateCache'], () => {
	
	return gulp.src('public/content/styles/styles.scss')
		.pipe($.sass().on('error', $.sass.logError))
		.pipe(gulp.dest('./temp/styles/'));
	
});

// Injects all of the *.js files in temp/js into the index.html
gulp.task('inject', ['clean:temp', 'babel', 'templateCache', 'styles'], () => {

	 return gulp
				.src('public/index.html')
				.pipe($.inject(
					gulp.src('temp/js/**/*.js', {read: true})
					.pipe($.angularFilesort()).pipe($.angularFilesort())
				))
				.pipe($.inject(
					gulp.src('temp/styles/**/*.css', {read: false})
				))
				.pipe(gulp.dest('public/'));
		
});

// Implements nodemon along with various tasks
gulp.task('serve-dev', ['inject'], () => {

	let watcher = gulp.watch(['public/**/*.*'], ['inject']);
	
	watcher.on('changed', function(event) {
		log('File ' + $.util.colors.red(event.path) + ' was ' + $.util.colors.red(event.type) + ', running tasks...');
	});

	return $.nodemon({
		script: 'server/app.js',
		ext: 'html js',
		watch: 'server/**/*.js'
	})
	.on('restart', (ev) => {
		log('** nodemon restarted **');
		log('files changed on restart:\n' + ev);
		setTimeout(() => {
			browserSync.notify('Server restarted. Reloading.');
			browserSync.reload({stream: false});
		}, 1000)
	})
	.on('start', () => {
		log('** nodemon started **');
		setTimeout(startBrowserSync, 1000);
	})
	.on('crash', () => {
		log('** nodemon crashed **');
	})
	.on('exit', () => {
		log('** nodemon exited cleanly **');
	})
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

		return del(path, done);
}

function startBrowserSync() {
	if (browserSync.active) {
		return;
	}

	let options = {
		proxy: 'localhost:5000',
		port: 3000,
		files: 'temp/**',
		ghostMode: {
			clicks: true,
			location: false,
			froms: true,
			scroll: true
		},
		injectChanges: true,
		logFileChanges: true,
		logPrefix: 'browserSync',
		notify: true,
		reloadDelay: 1500
	};

	return browserSync.init(options);
}

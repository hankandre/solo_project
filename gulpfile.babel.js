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

let watcher = gulp.watch('public/app/**/*.js', ['inject']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});


/**
 * Gulp Tasks
 */

gulp.task('default', ['help']);

gulp.task('help', $.taskListing);

gulp.task('clean:temp', (done) => {
    return clean('temp', done);
});

gulp.task('babel', () => {

   return gulp
        .src('public/app/**/*.js')
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('temp/js'));
    
});

gulp.task('inject', ['clean:temp', 'babel'], () => {

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

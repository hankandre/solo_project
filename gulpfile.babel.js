'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
let $ = gulpLoadPlugins({lazy: true});

/**
 * Gulp Watches
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

gulp.task('babel', (done) => {

    gulp
        .src('public/app/**/*.js')
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('temp/js'));
    
    done();
});

gulp.task('inject', ['babel'], (done) => {
    
    gulp
        .src('public/index.html')
        .pipe($.inject(
            gulp.src('temp/js/**/*.js', {read: true})
            .pipe($.angularFilesort()).pipe($.angularFilesort())
        ))
        .pipe(gulp.dest('public/'));
    
    done();
});


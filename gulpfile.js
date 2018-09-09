var gulp = require('gulp');
var clean = require('gulp-clean');
var sequence  = require('gulp-sequence');
var watch  = require('gulp-watch');

gulp.task('clean', function () {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

gulp.task('copy', function () {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist/'));
});

/* Not working
gulp.task('watch', function () {
    watch('src/*.php', ['copy']);
});
*/

gulp.task('install', sequence('clean', 'copy'));
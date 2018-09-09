var gulp = require('gulp');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var wait = require('gulp-wait');

gulp.task('clean', function () {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

gulp.task('css-admin', function () {
    return gulp.src('src/admin/css/socialmediaeverywhere.scss')
        .pipe(wait(200))
        .pipe(sass())
        .pipe(gulp.dest('dist/admin/css/'));
});

gulp.task('js-admin', function () {
    return gulp.src('src/admin/js/*.js')
        .pipe(babel({
            "presets": ["@babel/preset-env"]
        }))
        .pipe(concat('socialmediaeverywhere.js'))
        .pipe(gulp.dest('dist/admin/js/'));
});

gulp.task('css-public', function () {
    return gulp.src('src/public/css/socialmediaeverywhere.scss')
        .pipe(wait(200))
        .pipe(sass())
        .pipe(gulp.dest('dist/public/css/'));
});

gulp.task('js-public', function () {
    return gulp.src('src/public/js/*.js')
        .pipe(babel({
            "presets": ["@babel/preset-env"]
        }))
        .pipe(concat('socialmediaeverywhere.js'))
        .pipe(gulp.dest('dist/public/js/'));
});

gulp.task('copy', function () {
    return gulp.src(['src/**/*', '!src/**/*.scss', '!src/**/*.js'])
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', ['install'], function () {
    gulp.watch('src/**/*.php', ['copy']);
    gulp.watch('src/public/**/*.scss', ['css-public']);
    gulp.watch('src/public/**/*.js', ['js-public']);
    gulp.watch('src/admin/**/*.scss', ['css-admin']);
    gulp.watch('src/admin/**/*.js', ['js-admin']);
});


gulp.task('css', ['css-public', 'css-admin']);
gulp.task('js', ['js-public', 'js-admin']);
gulp.task('install', sequence('clean', ['copy', 'css', 'js']));
var gulp = require('gulp');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var wait = require('gulp-wait');
var jshint = require('gulp-jshint');
var minify = require('gulp-minify');
var parameterized = require('gulp-parameterized');
var log = require('fancy-log');

gulp.task('clean', function () {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

gulp.task('css-admin', function () {
    return gulp.src('src/admin/css/socialmediaeverywhere.scss')
        .pipe(wait(200))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/admin/css/'));
});

gulp.task('js-admin', parameterized(function (cb, params) {
    var jsPipe = gulp.src('src/admin/js/*.js')
        .pipe(jshint({
            esnext: true
        }))
        .pipe(babel({
            "presets": ["@babel/preset-env"]
        }))
        .pipe(concat('socialmediaeverywhere.js'));
    if (isProd(params)) {
        log('Prod configuration detected');
        log('Minifying admin js');
        jsPipe = jsPipe.pipe(minify({
            ext: {
                min: '.js'
            },
            noSource:  'true'
        }));
    }
    jsPipe = jsPipe.pipe(gulp.dest('dist/admin/js/'))
        .pipe(jshint.reporter('default'));
    return jsPipe;
}));

gulp.task('css-public', function () {
    return gulp.src('src/public/css/socialmediaeverywhere.scss')
        .pipe(wait(200))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/public/css/'));
});

gulp.task('js-public', parameterized(function (cb, params) {
    var jsPipe = gulp.src('src/public/js/*.js')
        .pipe(jshint({
            esnext: true
        }))
        .pipe(babel({
            "presets": ["@babel/preset-env"]
        }))
        .pipe(concat('socialmediaeverywhere.js'));
    if (isProd(params)) {
        log('Prod configuration detected');
        log('Minifying public js');
        jsPipe = jsPipe.pipe(minify({
            ext: {
                min: '.js'
            },
            noSource:  'true'
        }));
    }
    jsPipe = jsPipe.pipe(gulp.dest('dist/public/js/'))
        .pipe(jshint.reporter('default'));
    return jsPipe;
}));

gulp.task('copy', function () {
    return gulp.src(['src/**/*', '!src/**/*.scss', '!src/**/*.js'])
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('src/**/*.php', ['copy']);
    gulp.watch('src/public/**/*.scss', ['css-public']);
    gulp.watch('src/public/**/*.js', ['js-public']);
    gulp.watch('src/admin/**/*.scss', ['css-admin']);
    gulp.watch('src/admin/**/*.js', ['js-admin']);
});


gulp.task('css', ['css-public', 'css-admin']);
gulp.task('js', ['js-public', 'js-admin']);
gulp.task('build', sequence('clean', ['copy', 'css', 'js']));

function isProd(params) {
    return params.prod !== undefined && params.prod;
}
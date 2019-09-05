'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var rigger = require('gulp-rigger');
var copy = require('gulp-copy');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('./src/style/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./build/css/'))
        .pipe(connect.reload());

});

gulp.task('rigger', function () {
    return gulp.src('./src/index.html')
        .pipe(rigger())
        .pipe(gulp.dest('./build/'))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    return gulp.src('./src/js/index.js')
        .pipe(rigger())
        .pipe(gulp.dest('./build/js/'))
        .pipe(connect.reload());
});

gulp.task('copy', function () {
    gulp.src('./src/images/**.*')
        .pipe(gulp.dest('./build/images/'))
    gulp.src('./src/fonts/**.*')
        .pipe(gulp.dest('./build/fonts/'))
});

gulp.task('connect', function() {
    connect.server({
        root: 'build',
        livereload: true,
        port: 9000
    });
});

gulp.task('watch', function () {
    gulp.watch('./src/style/**/*.scss', gulp.series('sass'));
    gulp.watch(['./src/template/*.html', './src/index.html'], gulp.series('rigger'));
    gulp.watch('./src/js/**/*.js', gulp.series('js'));

});

gulp.task('default', gulp.parallel('watch', 'connect', 'rigger', 'copy', 'sass', 'js'));






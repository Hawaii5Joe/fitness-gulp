'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var validate = require('gulp-w3c-css');
var htmlhint = require("gulp-htmlhint");
var babel = require('gulp-babel');
var beautify = require('gulp-beautify');
var sprites = require('gulp-substituter');
var about = require('gulp-about');
var gulp = require('gulp');
var gulp = require('gulp');
var cat  = require('gulp-cat');
var color = require('gulp-color');

var watch = require('gulp-watch');

gulp.task('sass', function() {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('validate', function() {
  return gulp.src('./assets/css/*.css')
    .pipe('validate' ())
    .pipe(gulp.dest('./assets/css/build'));
});

gulp.task('htmlhint', function() {
  return gulp.src('./*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

gulp.task('babel', () =>
    gulp.src('./assets/js/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./assets/css/build'))
);

gulp.task('beautify', function() {
  gulp.src('./assets/js/*.js')
    .pipe(beautify({indent_size: 2}))
    .pipe(gulp.dest('./assets/css/build/beautify'))
});

gulp.task('replace', function() {
  return gulp.src('index.html')
    .pipe(substituter({
      title: 'website'
    }))
    .pipe(gulp.dest('./assets/css/build'));
});

gulp.task('about', function () {
    return gulp.src('package.json')
        .pipe(about())
        .pipe(gulp.dest('./assets/css/build'));  // writes dist/about.json
});

gulp.task('cat', function() {
    return gulp.src('./index.html')
        .pipe(cat());
});

gulp.task('gulp-color', function () {
    console.log(color('Hello World!', 'RED'));
});

gulp.task('watch', function() {
  gulp.watch('./src/styles/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'validate', 'htmlhint','babel','beautify','sprites','about','cat','gulp-color','watch']);

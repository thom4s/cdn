// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Set up project
var app_folder = 'wp-content/themes/cdn/';
var public_folder = 'wp-content/themes/cdn/';

var jsfolder = app_folder + 'js/';
var mainjs = app_folder + 'js/scripts.js';
var vendorsjs = app_folder + 'js/lib/*.js';
var alljs = [vendorsjs, mainjs];

var scssfiles = app_folder + 'sass/*.scss';
var sassfolder = app_folder + 'sass/';


// Lint Task
gulp.task('lint', function() {
    return gulp.src(mainjs)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return sass(sassfolder, { style: 'compact', sourcemap: false })
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(sassfolder));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(alljs)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(jsfolder))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsfolder));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(mainjs, ['lint', 'scripts']);
    gulp.watch(scssfiles, ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'watch']);
/**
 * BUILD SCRIPT
 * build the client and server applications for production
 */

'use strict';

// modules dependencies
const gulp    = require('gulp');
const gulpif  = require('gulp-if');
const concat  = require('gulp-concat');
const uglify  = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const iife    = require('gulp-iife');
const rimraf  = require('rimraf');
const less    = require('gulp-less');

// build dependencies 
const paths   = require('./gulp/path').paths;

// build constants 
const UGLIFY  = false;
const CLIENT_FOLDER = paths.dist;
const SOURCE_FOLDER = paths.dev_folder;

// minify the angular javascript codes via uglify writes output to app/index.min.js
gulp.task('app-compile-js', () => {

	// the order of process is important 
	let appSourceJs = paths.src.modules
		.concat(paths.src.constants)
		.concat(paths.src.filters)
		.concat(paths.src.services)
		.concat(paths.src.components)
		.concat(paths.src.directives)
		.concat(paths.src.controllers)
		.concat(paths.src.routes)
		.concat(paths.src.index);

	return gulp.src(appSourceJs)
		.pipe(gulpif(UGLIFY, uglify({ mangle: true })))
		.pipe(concat('app.min.js'))
		.pipe(iife())
		.pipe(gulp.dest(CLIENT_FOLDER + 'app/'));
});

// minify the vendor js code and writes output to vendors/source.min.js
gulp.task('app-compile-vendor', () => {
  return gulp.src(paths.vendors)
    .pipe(gulpif(UGLIFY, uglify({ mangle: true })))
    .pipe(concat('vendors.min.js'))
    .pipe(gulp.dest(CLIENT_FOLDER + 'vendors/'));
});

// move views files to the app/views folder
gulp.task('app-mv-views', () => {
  return gulp.src(paths.views)
    .pipe(gulp.dest(CLIENT_FOLDER + 'app/views/'));
});

// move static files to the public folder
gulp.task('app-mv-static', () => {
  return gulp.src(paths.static)
    .pipe(gulp.dest(CLIENT_FOLDER));
});

// minify styles into the public style folder 
gulp.task('app-minify-styles', () => {
	return gulp.src(paths.styles)
		.pipe(cssnano())
	  .pipe(concat('style.min.css'))
	  .pipe(gulp.dest(CLIENT_FOLDER + 'assets/'));
});

// move vendors assets into vendors/assets
gulp.task('app-mv-vendor-assets', () => {
	return gulp.src(paths.vendor_assets)
   .pipe(gulp.dest(CLIENT_FOLDER + 'vendors/assets/'));
});

// compile and move less files 
gulp.task('app-compile-less', () => {
	return gulp.src(paths.less)
		.pipe(less())
		.pipe(concat('less.css'))
		.pipe(gulp.dest(SOURCE_FOLDER + 'assets/'));
});

/* =========================== build section ======================== */

// clean with rimraf 
gulp.task('clean', cb => {
  rimraf('./dist/', cb);
});

// default build task 
gulp.task('app-mv-html', () => {
	gulp.start('app-mv-views', 'app-mv-static');
});

// build style 
gulp.task('app-compile-style', () => {
	gulp.start('app-compile-less', 'app-minify-styles')
})

// default build task 
gulp.task('build', ['clean'], () => {
	gulp.start('app-compile-js', 'app-compile-vendor', 'app-compile-style', 'app-mv-html', 'app-mv-vendor-assets');
});
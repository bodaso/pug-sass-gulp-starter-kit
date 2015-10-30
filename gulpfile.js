// ---------------------------------------------------------------
// Define Variables
// ---------------------------------------------------------------
var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

// ---------------------------------------------------------------
// Jade Task
// ---------------------------------------------------------------

gulp.task('jade', function() {
  return gulp.src('./src/index.jade')
        .pipe(jade({
          pretty: true
        }))
        .pipe(gulp.dest('./app'));
});


// ---------------------------------------------------------------
// SASS Task
// ---------------------------------------------------------------

gulp.task('sass', function() {
  return gulp.src('./src/assets/sass/main.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({
          outputStyle: 'compressed', // expanded|nested|compact|compressed
          onError: sass.logError
        })).pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7']))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/assets/css'));
});


// ---------------------------------------------------------------
// JavaScript Task
// ---------------------------------------------------------------

gulp.task('scripts', function() {
  return gulp.src('./src/assets/js/**')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/assets/js'));
});


// ---------------------------------------------------------------
// Watch Task
// ---------------------------------------------------------------

gulp.task('watch', function() {
  gulp.watch('./src/index.jade', ['jade']);
  gulp.watch('./src/assets/sass/**', ['sass']);
  gulp.watch('./src/assets/js/**', ['scripts']);
});


// ---------------------------------------------------------------
// Set default gulp task
// ---------------------------------------------------------------

gulp.task('default', ['jade', 'sass', 'scripts', 'watch']);
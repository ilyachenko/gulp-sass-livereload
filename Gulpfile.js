var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var livereload = require('gulp-livereload');

var sourcePaths = {
  styles: ['scss/**/*.scss']
};

var distPaths = {
  styles: 'public/css',
  html: 'public/**/*.html'
};

var server = {
  host: 'localhost',
  port: '3001'
};

// Compile scss files to css
gulp.task('sass', function () {
  gulp.src(sourcePaths.styles)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(distPaths.styles))
    .pipe(livereload());
});

gulp.task('html', function () {
  return gulp.src(distPaths.html)
    .pipe(gulp.dest(''))
    .pipe(livereload());
});

// Run a local webserver
gulp.task('webserver', function () {
  gulp.src('public')
    .pipe(webserver({
      host: server.host,
      port: server.port,
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

// Automatically open browser to the server.host and port
gulp.task('openbrowser', function () {
  opn('http://' + server.host + ':' + server.port);
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(sourcePaths.styles, ['sass']);
  gulp.watch(distPaths.html, ['html']);
});

gulp.task('build', ['sass']);

gulp.task('default', ['build', 'webserver', 'watch']);

const gulp = require('gulp');
const babel = require('gulp-babel');
const less = require('gulp-less');

function handleError(e) {
  console.log('error in build', e.message, e.stack);
  this.emit('end');
}

gulp.task('moveHtml', () => {
  return gulp.src('src/html/index.html')
    .pipe(gulp.dest('public'));
});

gulp.task('styles', () => {
  return gulp.src('src/less/index.less')
    .pipe(less())
    .pipe(gulp.dest('public'));
});

gulp.task('buildJs', () => {
  return gulp.src('src/js/index.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .on('error', handleError)
    .pipe(gulp.dest('public'));
});

gulp.task('build', ['moveHtml', 'styles', 'buildJs']);

gulp.task('default', () => {
  gulp.watch('src/js/*.js', ['buildJs']);
  gulp.watch('src/html/*.html', ['moveHtml']);
  gulp.watch('src/less/*.less', ['styles']);
});


const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('moveHtml', () => {
  return gulp.src('src/html/index.html')
    .pipe(gulp.dest('public'));
});

function handleError(e) {
  console.log('error in build', e.message, e.stack);
  this.emit('end');
}

gulp.task('build', () => {
  return gulp.src('src/js/index.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .on('error', handleError)
    .pipe(gulp.dest('public'));
});

gulp.task('default', () => {
  gulp.watch('src/js/*.js', ['build']);
  gulp.watch('src/html/*.html', ['moveHtml']);
});


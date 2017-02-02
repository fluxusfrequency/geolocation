const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('moveHtml', () => {
  return gulp.src('src/html/index.html')
    .pipe(gulp.dest('public'));
});

gulp.task('build', () => {
  return gulp.src('src/js/index.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('default', () => {
  gulp.watch('src/js/*.js', ['build']);
  gulp.watch('src/html/*.html', ['moveHtml']);
});


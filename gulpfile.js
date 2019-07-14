const gulp = require('gulp');
const browserSync = require('browser-sync');

gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch('src/**/*').on('change', browserSync.reload);
});
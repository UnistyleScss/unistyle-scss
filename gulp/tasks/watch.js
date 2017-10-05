const gulp   = require('gulp');
const config = require('../config');

gulp.task('watch', () => {
  gulp.watch(config.styles.src, ['styles']);
});

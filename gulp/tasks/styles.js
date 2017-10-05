const gulp       = require('gulp');
const sassLint   = require('gulp-sass-lint');
const config     = require('../config');
const sass       = require('gulp-sass');

gulp.task('styles', () => {
  gulp.src(config.styles.src)
    .pipe(sassLint({
      files: {
        ignore: [
          '**/_normalize.scss'
        ]
      },
      configFile: '.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sass({
      errLogToConsole: true,
      style: 'expanded',
      sourcemap: false
    }).on('error', sass.logError))
    .pipe(gulp.dest(config.styles.dest))
  });

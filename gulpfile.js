const gulp = require('gulp');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', () =>
  gulp.src('dist')
    .pipe(clean())
);

gulp.task('copy', ['clean'], () =>
  gulp.src([
    './src/**/*',
    '!./src/{sass,sass/**}',
    '!./src/{ts,ts/**}'
  ])
    .pipe(gulp.dest('dist'))
);

gulp.task('imagemin', () => {
  gulp.src('src/assets/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('sass', () =>
  gulp.src('src/sass/styles.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css/'))
);

gulp.task('html', () =>
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'))
);

gulp.task('ts', () =>
  tsProject.src()
    .pipe(tsProject())
    .on('error', error => {
      console.log('Typescript compilation error: ' + error);
    })
    .js
    .pipe(gulp.dest('dist/js/'))
);

gulp.task('build', ['copy'], () => {
  gulp.start('sass','ts', 'imagemin');
});

gulp.task('default', ['build']);

gulp.task('server', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/ts/**/*.ts', ['ts']);
  gulp.watch('src/**/*.html', ['html']);

  gulp.watch('src/**/*').on('change', browserSync.reload);
});
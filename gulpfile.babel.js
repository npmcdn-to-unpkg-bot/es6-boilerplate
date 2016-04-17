var gulp = require('gulp');

/* DEV FOLDERS */
var appDev = 'src/client/';
var assetsDev = 'src/client/assets/';

/* PROD FOLDERS */
var appProd = 'dist/';
var assetsProd = 'dist/assets/';

var BROWSER_SYNC_RELOAD_DELAY = 500;

var ext_replace = require('gulp-ext-replace'),
  postcss = require('gulp-postcss'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('autoprefixer'),
  precss = require('precss'),
  cssnano = require('cssnano'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  typescript = require('gulp-typescript'),
  imagemin = require('gulp-imagemin'),
  nodemon = require('gulp-nodemon'),
  browserSync = require('browser-sync');

var tsProject = typescript.createProject('tsconfig.json');

gulp.task('build-vendor', function() {
  return gulp.src([
    /* AnguLAR 2 required libraries */
    /* IE required polyfills, in this exact order */
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/systemjs/dist/system-polyfills.js',
    'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/angular2/bundles/angular2.js',
    'node_modules/angular2/bundles/router.dev.js',
    'node_modules/angular2/bundles/http.js'
  ])
  .pipe(concat('vendors.js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('dist/'));
});

gulp.task('build-ts', function () {
  return gulp.src(appDev + '**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(typescript(tsProject))
    .pipe(sourcemaps.write())
    .pipe(uglify())
    .pipe(gulp.dest(appProd));
});

gulp.task('build-css', function () {
  return gulp.src(assetsDev + 'styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(postcss([precss, autoprefixer, cssnano]))
    .pipe(sourcemaps.write())
    .pipe(ext_replace('.css'))
    .pipe(gulp.dest(assetsProd + 'styles/'));
});

gulp.task('build-img', function () {
  return gulp.src(assetsDev + 'img/**/*')
    .pipe(imagemin({
        progressive: true
    }))
    .pipe(gulp.dest(assetsProd + 'img/'));
});

gulp.task('build-static', function () {
  return gulp.src(appDev + '**/*.{html|css}')
    .pipe(gulp.dest(appProd));
});

gulp.task('build-font', function () {
  return gulp.src(appDev + '**/*.woff')
    .pipe(gulp.dest(appProd));
});

gulp.task('nodemon', function(cb) {
  var called = false;
  return nodemon({
    // nodemon our expressjs server
    script: 'index.js',
    // watch core server file(s) that require server restart on change
    watch: ['index.js', 'src/server/**/*.js']
  })
  .on('start', function onStart() {
    // ensure start only got called once
    if (!called) { cb(); }
    called = true;
  })
  .on('restart', function onRestart() {
    // reload connected browsers after a slight delay
    setTimeout(function reload() {
      browserSync.reload({
        stream: false
      });
    }, BROWSER_SYNC_RELOAD_DELAY);
  });
});

gulp.task('browser-sync', ['nodemon'], function() {
  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({
    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',
    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,
    // open the proxied app in chrome
    //browser: 'google chrome'
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task('watch', function () {
  //gulp.watch(appDev + '**/*.ts', ['build-ts', browserSync.reload]);
  gulp.watch(appDev + '**/*.{html|css}', ['build-static', browserSync.reload]);
  gulp.watch(appDev + '**/*.js', ['browserSync'.reload]);
  gulp.watch(assetsDev + 'styles/**/*.scss', ['build-css', browserSync.reload]);
  gulp.watch(assetsDev + 'img/*', ['build-img', browserSync.reload]);
});

gulp.task('default', ['build-vendor', 'build-css', 'build-static', 'build-font', 'watch', 'browser-sync']);

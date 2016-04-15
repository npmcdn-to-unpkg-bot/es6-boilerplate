import gulp from 'gulp';
import clean from 'gulp-clean';
import taskLisinting from 'gulp-task-listing';
import nodemon from 'gulp-nodemon';
import {create as bsCreate} from 'browser-sync';
const browserSync = bsCreate();

let buildDest = 'dist';
let clientSrc = './src/client/';
let serverSrc = './src/server/';
let sources = [clientSrc];

var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('default', taskLisinting);


gulp.task('clean', () => {
    return gulp.src(buildDest, { read: false })
        .pipe(clean());
});

gulp.task('build', () => {
    console.log('To be implemented')
})

gulp.task('serve', () => {
    console.log('To be implemented')
})

//=====

gulp.task('nodemon', function(cb) {
    var called = false;
    return nodemon({
        script: 'index.js',
        ext: '.js .css .sass .html',
        ignore: [
            'node_modules/**/*.js'
        ],
        env: {
            'NODE_ENV': 'development',
            'PORT': 8888
        },
    }).on('start', function() {
        if (!called) {
            called = true;
            cb();
        }
    }).on('restart', function() {
        console.log('Nodemon restarted!');
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init({
        proxy: 'http://localhost:8888',
        port: 4000
        //proxy: "localhost:8888"
    });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('watch', function() {
    //gulp.watch('./public/styles/**/*.scss', ['sass']);
    gulp.watch('./src/**/*', ['bs-reload']);
    //gulp.watch('./views/**/*.hbs', browserSync.reload());
});

gulp.task('default', ['browser-sync', 'watch']);

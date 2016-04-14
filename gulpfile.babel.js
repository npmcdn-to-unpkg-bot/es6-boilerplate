import gulp from 'gulp';
import clean from 'gulp-clean';
import taskLisinting from 'gulp-task-listing';

let buildDest = 'dist';
let clientSrc = './src/client/';
let serverSrc = './src/server/';

gulp.task('default', taskLisinting ); 
      

gulp.task('clean', () => {
    return gulp.src( buildDest, {read: false})
    .pipe(clean());
});

gulp.task('build', () => {
    console.log('To be implemented')
})

gulp.task('serve', () => {
    console.log('To be implemented')
})
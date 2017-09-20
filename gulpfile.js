var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}

gulp.task('scripts', function () {
    gulp.src('js/**/*.js')
        .pipe(uglify())
        .on('error', errorLog)
        .pipe(gulp.dest('deploy/js'));
});

gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .on('error', errorLog)
        .pipe(gulp.dest('deploy/css'));
});

gulp.task('watch', function () {
    gulp.watch('js/**/*.js', ['scripts']);
    gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('default', ['scripts', 'sass', 'watch']);

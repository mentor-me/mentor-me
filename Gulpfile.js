var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('run', ['sass'], function() {

    gulp.watch("./sass/*.scss", ['sass']);

});

gulp.task('sass', function() {
    return gulp.src("./sass/*.scss")
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"))
});

gulp.task('default', ['run']);

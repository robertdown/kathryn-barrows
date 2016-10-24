var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('styles', function () {
    return sass('sass/main.scss', {
        style: 'expanded',
        loadPath: [
            'bower_components/bootstrap-sass/assets/stylesheets/'
        ]
    })
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('theme/static/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest('theme/static/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('clean', function () {
    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});

gulp.task('default', ['clean'], function () {
    gulp.start('styles');
});

gulp.task('watch', function () {
    // Watch .scss files
    gulp.watch('sass/**/*.scss', ['styles']);

    // Watch .js files
    // gulp.watch('src/scripts/**/*.js', ['scripts']);

    // Watch image files
    // gulp.watch('src/images/**/*', ['images']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['theme/**']).on('change', livereload.changed);
});

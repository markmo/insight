var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')

gulp.task('js', function () {
  gulp.src([
    'app/bower_components/angular/angular.js',
    'app/bower_components/angular-route/angular-route.js',
    'app/bower_components/angular-bootstrap/ui-bootstrap.js',
    'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'app/bower_components/lodash/dist/lodash.js',
    'app/bower_components/angular-google-maps/dist/angular-google-maps.js',
    'app/components/angular-ajax-tabs.js',
    'app/app.js',
    'app/customer_detail/*.js',
    '!**/*_test.js'
    ])
    .pipe(concat('dist.js'))
    // .pipe(ngAnnotate())
    // .pipe(uglify())
    .pipe(gulp.dest('.'))
})

gulp.task('watch', ['js'], function () {
  gulp.watch('app/**/*.js', ['js'])
})
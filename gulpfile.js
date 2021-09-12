const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const { rollup } = require('gulp-rollup');

exports.default = function() {
  return src('assets/js/*.js')
    .pipe(uglify())
    .pipe(rollup())
    .pipe(dest('assets/js/kalvi-app.js'));
}
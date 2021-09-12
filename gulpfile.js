const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const { rollup } = require('rollup');

exports.default = function() {
  return src('assets/js/*.js')
    .pipe(uglify())
    .pipe(rollup())
    .pipe(dest('assets/js/kalvi-app.js'));
}
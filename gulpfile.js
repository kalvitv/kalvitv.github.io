
const { src, dest } = require('gulp');
var babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

exports.default = function() {
  return src('assets/js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('kalvi-app.js'))    
    .pipe(dest('assets/bundle/js/'));
}
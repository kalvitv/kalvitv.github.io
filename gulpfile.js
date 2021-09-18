
const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

exports.default = function() {
  return src('assets/js/*.js')
    .pipe(uglify())
    .pipe(concat('kalvi-app.js'))    
    .pipe(dest('assets/js/'));
}
const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

exports.default = function() {
  return src('/assets/js/*.js')    
    .pipe(concat('kalvi-app.js'))
    .pipe(uglify())
    .pipe(dest('/assets/js/kalvi-app.js'));
}
const { series, src, dest } = require('gulp');
const fs = require('fs');
var babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const YAML = require('yaml')

function clean(cb) {
  cb();
}

function sitemap(cb) {
    let filenames = fs.readdirSync('_data/videos/');
    let moddt = {};
    const regex = /last_modified_at: (.{1,25})/i;
    
    filenames.forEach((file) => {
        let videoDataFile = fs.lstatSync('_data/videos/' + file);
        let fname = file.replace(".yml", ".md");
        let fss = fs.readFileSync('_videos/'+ fname);
        console.log(videoDataFile.mtime.toISOString());
        fs.writeFileSync('_videos/'+ fname, fss.toString().replace(regex, "last_modified_at: " + videoDataFile.mtime.toISOString()));
    });
    cb();
}

function build(cb) {
  return src('assets/js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('kalvi-app.js'))    
    .pipe(dest('assets/bundle/js/'));
}

exports.build = build;
exports.default = series(clean, sitemap, build);
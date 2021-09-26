const { series, src, dest } = require('gulp');
const fs = require('fs');
var babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const YAML = require('yaml')

function clean(cb) {
  // body omitted
  cb();
}

function sitemap(cb) {
    let filenames = fs.readdirSync('_data/videos/');
    let moddt = {};
    filenames.forEach((file) => {
      console.log("File:", file);
      let ss = fs.lstatSync('_data/videos/' + file);
      moddt[file.replace(".yml", "")] = ss.mtime;
    });
        const data = new Uint8Array(Buffer.from(YAML.stringify(moddt)));
        fs.writeFile('_data/sitemap.yml', data, (err) => {
             if (err) throw err;
                console.log('The file has been saved!');
            cb();
        });
   
    
}

function build(cb) {
  // body omitted
  return src('assets/js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('kalvi-app.js'))    
    .pipe(dest('assets/bundle/js/'));
}

exports.build = build;
exports.default = series(clean, sitemap, build);
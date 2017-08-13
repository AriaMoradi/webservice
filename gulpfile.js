/**
 * Web Service Build System
 */

const gulp = require('gulp');
const pump = require('pump');
const del = require('del');
const fs = require('fs');
const replace = require('gulp-replace');
const markdown = require('gulp-markdown');

gulp.task('clean', function (cb) {
  del.sync(['dist/*']);
  cb();
});

gulp.task('parse-doc', function (cb) {
  pump(
    gulp.src('doc/help.md', {base: './'}),
    markdown(),
    gulp.dest('dist'),
    cb
  )
});

gulp.task('build-doc', function (cb) {
  pump(
    gulp.src('doc/help.html', {base: './'}),
    replace('{{api}}', () => {
      return fs.readFileSync('dist/doc/help.html');
    }),
    gulp.dest('dist'),
    cb
  )
});

gulp.task('copy-files', function (cb) {
  pump(
    gulp.src(['api/*', 'test/*', 'doc/github.css', 'doc/highlight.js'], {base: './'}),
    gulp.dest('dist'),
    cb
  )
});

gulp.task('default', gulp.series('clean', 'parse-doc', 'build-doc', 'copy-files'));

gulp.task('watch', () => {
  gulp.watch(['test/**', 'doc/**'], gulp.series('default'));
});
const gulp = require('gulp');
const babel = require('gulp-babel');

const paths = {
  dest: {
    lib: 'lib', // commonjs
    esm: 'esm', // ES module
    dist: 'dist', // umd
  },
  styles: 'components/**/*.less', 
  scripts: ['components/**/*.{ts,tsx}', '!components/**/demo/*.{ts,tsx}'], 
};

function compileCJS() {
  const { dest, scripts } = paths;
  return gulp
    .src(scripts)
    .pipe(babel()) // 使用gulp-babel处理
    .pipe(gulp.dest(dest.lib));
}

// 并行任务 后续加入样式处理 可以并行处理
const build = gulp.parallel(compileCJS);

exports.build = build;

exports.default = build;

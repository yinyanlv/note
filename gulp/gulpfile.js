//引入插件
var gulp = require('gulp'),  
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');

//样式
gulp.task('css', function() {  
  return gulp.src('src/css/style.scss')
    .pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'css task complete' }));
});

//脚本
gulp.task('js', function() {  
  return gulp.src('src/js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'js task complete' }));
});

//图片
gulp.task('img', function() {  
  return gulp.src('src/img/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({ message: 'img task complete' }));
});

//清理
gulp.task('clean', function() {  
  return gulp.src(['dist/css', 'dist/js', 'dist/img'], {read: false})
    .pipe(clean());
});

//默认任务
gulp.task('default', ['clean'], function() {  
    gulp.start('css', 'js', 'img');
});

//监听
gulp.task('watch', function() {
  // 建立即时重整伺服器
  var server = livereload();
  //监听scss档
  gulp.watch('src/css/*.scss', ['css']);
  //监听js档
  gulp.watch('src/js/*.js', ['js']);
  //监听图片
  gulp.watch('src/img/*', ['img']);
  //监听所有在dist目录下的文件
  gulp.watch(['dist/*']).on('change', function(file) {
    server.changed(file.path);
  });
});
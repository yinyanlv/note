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

var pathMap = {
	cssSrcPath: 'src/css',
	cssDistPath: 'dist/css',
	jsSrcPath: 'src/js/*.js',
	jsDistPath: 'dist/js',
	imgSrcPath: 'src/img/*',
	imgDistPath: 'dist/img'
};

var concatJsName = 'app.js';  //配置合并js操作生成的目标文件名，.js不可省略

//样式
gulp.task('css', function() {  
  return sass(pathMap.cssSrcPath, {style: 'expanded'})
    //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(pathMap.cssDistPath))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(pathMap.cssDistPath))
    .pipe(notify({message: 'css task complete'}));
});

//脚本
gulp.task('js', function() {  
  return gulp.src(pathMap.jsSrcPath)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat(concatJsName))  //如果不需要合并js，则删除之
    .pipe(gulp.dest(pathMap.jsDistPath))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(pathMap.jsDistPath))
    .pipe(notify({message: 'js task complete'}));
});

//图片
gulp.task('img', function() {  
  return gulp.src(pathMap.imgSrcPath)
    .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
    .pipe(gulp.dest(pathMap.imgDistPath))
    .pipe(notify({message: 'img task complete'}));
});

//清理
gulp.task('clean', function() {  
  return gulp.src([pathMap.cssDistPath, pathMap.jsDistPath, pathMap.imgDistPath], {read: false})
    .pipe(clean());
});

//默认任务
gulp.task('default', ['clean'], function() {  
    gulp.start('css', 'js', 'img');
});

//监听
gulp.task('watch', function() {
  //建立实时重启服务器
  var server = livereload();
  //监听scss档
  gulp.watch(pathMap.cssSrcPath, ['css']);
  //监听js档
  gulp.watch(pathMap.jsSrcPath, ['js']);
  //监听图片
  gulp.watch(pathMap.imgSrcPath, ['img']);
  //监听所有在dist目录下的文件
  gulp.watch([pathMap.cssDistPath, pathMap.jsDistPath, pathMap.imgDistPath]).on('change', function(file) {
    server.changed(file.path);
  });
});
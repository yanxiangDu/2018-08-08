// 1,加载所有需要的依赖包

// 项目 gulp 
const gulp = require('gulp');

// css 需要的依赖包
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

// js 需要的依赖包 下载的是4个,加载的就2个
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

// html 需要的依赖包
const htmlmin = require('gulp-htmlmin');

// sass 需要的依赖包
const sass = require('gulp-sass');

// web服务器 需要的依赖包
const webserver = require('gulp-webserver');

// del删除 需要的依赖包
const del = require('del');

// 2,定义 需要的打包压缩规范

// 2-1,css 打包压缩规范
const cssHandler = function(){
    return gulp.src('./src/css/*.css')
           .pipe( autoprefixer() )
           .pipe( cssmin() )
           .pipe(  gulp.dest('./dist/css') )
}

// 2-2,js 打包压缩规范
const jsHandler = function(){
    return gulp.src('./src/js/*.js')
           .pipe( babel( {presets:['@babel/env']} ) )
           .pipe( uglify() )
           .pipe( gulp.dest('./dist/js') )
}

// 2-3,html 打包压缩规范
const htmlHandler = function(){
    return gulp.src('./src/pages/*.html')
           .pipe( htmlmin({
               removeAttributeQuotes:true,
               removeComments:true,
               collapseBooleanAttributes:true,
               collapseWhitespace:true,
               minifyCSS:true,
               minifyJS:true,
           }) )
           .pipe(  gulp.dest('./dist/pages') )
}

// 2-4, sass 打包压缩规范
const sassHandler = function(){
    return gulp.src('./src/sass/*.scss')
           .pipe( sass() )
           .pipe( autoprefixer() )
           .pipe( cssmin() )
           .pipe(  gulp.dest('./dist/css') )
}

// 2-5, 图片,音频,视频等不需要压缩,直接移动的文件 

// 图片
const imgHandler = function(){
    return gulp.src('./src/images/*.*')
           .pipe(  gulp.dest('./dist/images') )
}

// 音频
const radioHandler = function(){
    return gulp.src('./src/radio/*.*')
           .pipe(  gulp.dest('./dist/radio') )
}
// 视频
const videoHandler = function(){
    return gulp.src('./src/video/*.*')
           .pipe(  gulp.dest('./dist/video') )
}
// 插件
const libHandler = function(){
    return gulp.src('./src/lib/*.*')
           .pipe(  gulp.dest('./dist/lib') )
}

// 2-6, web服务器
const webserverHandler = function(){
    return gulp.src('./dist')
           .pipe(webserver({
               host:'127.0.0.1',
               port:'8080',
               livereload:true,
               open:'./index.html',
           })) 
}

// 3,指定监听程序
const watchHandler = function(){
    gulp.watch( './src/css/*.css' , cssHandler );
    gulp.watch( './src/js/*.js' , jsHandler );
    gulp.watch( './src/pages/*.html' , htmlHandler );
    gulp.watch( './src/sass/*.scss' , sassHandler );
    gulp.watch( './src/images/*.*' , imgHandler );
    gulp.watch( './src/radio/*.*' , radioHandler );
    gulp.watch( './src/video/*.*' , videoHandler );
    gulp.watch( './src/lib/*.*' , libHandler );
}

// 4,删除程序
const delHandler = function(){
    return del(['./dist']);
}

// 5,设定导入的默认执行程序
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel( cssHandler , jsHandler , htmlHandler, sassHandler, imgHandler, radioHandler, videoHandler , libHandler ),
    webserverHandler,
    watchHandler
)
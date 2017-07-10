"use strict";
var gulp         = require('gulp'),
    concat       = require("gulp-concat"),
    uglify       = require("gulp-uglifyjs"),
    cssnano      = require("gulp-cssnano"),
    rename       = require("gulp-rename"),
    del          = require("del"),
    imagemin     = require("gulp-imagemin"),
    pngquant     = require("imagemin-pngquant"),
    cache        = require("gulp-cache"),
    autoprefixer = require("gulp-autoprefixer"),
    newer        = require("gulp-newer"),
    debug        = require("gulp-debug");


gulp.task('assets', function(){
    return gulp.src([
        'src/index.html',
        'src/**/*.json'
    ])
    .pipe(newer('build'))
    .pipe(debug({ title: 'assets' }))
    .pipe(gulp.dest('build'));
});

gulp.task('scripts', function(){
    return gulp.src([
        'src/js/three.js',
        'src/js/Math2.js',
        'src/js/stats.min.js',
        'src/js/GeometryHelpers.js',
        'src/js/TweenMax.min.js',
        'src/js/scene_colors.js',
        'src/js/OrbitControls.js',
        'src/js/CustomMeshFlat.js',
        'src/js/dat.gui.min.js',
        'src/js/main.js'
    ])
    .pipe(concat('all.min.js'))
    .pipe(newer('build/js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(gulp.dest('src/js'));
});

gulp.task('css', function(){
    return gulp.src("src/css/**/*.css")
    .pipe(autoprefixer(['last 15 versions',"> 1%", "ie 8", "ie 7"], { cascade: true }))
    .pipe(concat('main.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('build/css'))
    .pipe(gulp.dest('src/css'));
})

gulp.task('img', function(){
    return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest('build/img'));
});

gulp.task('clean', function(){
    return del.sync('build');
});

gulp.task('clear', function(){
    return cache.clearAll();
});


gulp.task('build', ['clean','scripts','css','img','assets']);

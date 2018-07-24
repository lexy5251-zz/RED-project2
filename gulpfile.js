//loading our dependencies
var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    prettyError = require("gulp-prettyerror"),
    rename = require("gulp-rename"),
    cssnano = require("gulp-cssnano"),
    babel = require("gulp-babel"),
    browserSync = require("browser-sync").create();


// Static server
gulp.task("browser-sync", function(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    done();
});

gulp.task("scripts", function() {
    return gulp
        .src("./src/js/*.js") // What files do we want gulp to consume?
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify()) // Call the uglify function on these files
        .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
        .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

gulp.task("sass", function() {
    return gulp
        .src("./src/sass/*.scss") // What files do we want gulp to consume?
        .pipe(prettyError())
        .pipe(sass()) // Call the uglify function on these files
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"]
            })
        ) // Rename the uglified file
        .pipe(gulp.dest("./build/css"))
        .pipe(cssnano()) // Call the uglify function on these files
        .pipe(rename("style.min.css")) // Rename the uglified file
        .pipe(gulp.dest("./build/css")); // Where do we put the result?
});

gulp.task("styles", function() {
    return gulp
        .src("./src/css/*.css") // What files do we want gulp to consume?
        .pipe(cssnano()) // Call the uglify function on these files
        .pipe(rename({ extname: ".min.css" })) // Rename the uglified file
        .pipe(gulp.dest("./build/css")); // Where do we put the result?
});



gulp.task("reload", function(done) {
    browserSync.reload();
    done();
});

gulp.task("watch", function(done) {
    gulp.watch("./src/js/*.js", gulp.series("scripts", "reload"));
    gulp.watch("./src/css/*.css", gulp.series("styles", "reload"));
    gulp.watch("./src/scss/*.scss", gulp.series("sass", "reload"));
    gulp.watch("./index.html", gulp.series("reload"));
});

gulp.task("default", gulp.parallel("watch", "browser-sync"));
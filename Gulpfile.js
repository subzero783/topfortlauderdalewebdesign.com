const gulp = require('gulp');
const sass = require('gulp-sass');
const minify = require('gulp-minify');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');

//compile scss into css
function style() {
  return gulp.src(
    [
      // theme files
      // 'assets/vendor/bootstrap/css/bootstrap.min.css',
      // 'assets/vendor/icofont/icofont.min.css',
      // 'assets/vendor/remixicon/remixicon.css',
      // 'assets/vendor/boxicons/css/boxicons.min.css',
      // 'assets/vendor/owl.carousel/assets/owl.carousel.min.css',
      // 'assets/vendor/venobox/venobox.css',
      // 'assets/vendor/aos/aos.css',
      // 'assets/vendor/css/style.css',
      './node_modules/aos/dist/aos.css',
      './node_modules/bootstrap/dist/css/bootstrap-grid.min.css',
      './node_modules/slick-carousel/slick/slick-theme.css', 
			'./node_modules/slick-carousel/slick/slick.css',

      // my file
      'assets/scss/styles.scss',
    ]
  )
  .pipe(concat('style.css'))
  .pipe(sourcemaps.init())
  .pipe(sass().on('error',sass.logError))
  .pipe(postcss([ autoprefixer(), cssnano()]))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('assets/dist/css'))
  .pipe(browserSync.stream());
}

function minify_js(){
  return gulp.src(
    [
      
      // theme files
      // 'assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
      // 'assets/vendor/jquery.easing/jquery.easing.min.js',
      // 'assets/vendor/php-email-form/validate.js',
      // 'assets/vendor/waypoints/jquery.waypoints.min.js',
      // 'assets/vendor/counterup/counterup.min.js',
      // 'assets/vendor/owl.carousel/owl.carousel.min.js',
      // 'assets/vendor/isotope-layout/isotope.pkgd.min.js',
      // 'assets/vendor/venobox/venobox.min.js',
      // 'assets/vendor/aos/aos.js',
      // 'assets/vendor/js/main.js',
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/aos/dist/aos.js',
      './node_modules/bootsrap/dist/js/bootstrap.min.js',
      './node_modules/slick-carousel/slick/slick.js',

      // my file
      'assets/js/scripts.js'
    ]
  )
  .pipe(concat('scripts.js'))
  
  // .pipe(minify({noSource: true}))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('assets/dist/js'))
  .pipe(browserSync.stream());
}

var cbString = new Date().getTime();
function cacheBustTask(){
  return gulp.src(['index.php'])
  .pipe(replace(/cb=\d+/, 'cb=' + cbString))
  .pipe(gulp.dest('.'));
}

function watch() {
  browserSync.init({
    proxy: "http://topfortlauderdalewebdesign.localhost"
  });
  gulp.watch('assets/scss/**/*.scss', style, cacheBustTask);
  gulp.watch('assets/vendor/**/*.css', style, cacheBustTask);
  gulp.watch('assets/js/**/*.js', minify_js, cacheBustTask);
  gulp.watch('./**/*.php').on('change',browserSync.reload, cacheBustTask);
}



exports.style = style;
exports.minify_js = minify_js;
exports.watch = watch;
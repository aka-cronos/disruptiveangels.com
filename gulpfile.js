var gulp = require('gulp'),
    connect = require('gulp-connect'),
    postcss = require('gulp-postcss'),
    uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('autoprefixer'),
    rupture = require('rupture'),
    lost = require('lost'),
    rucksack = require('rucksack-css');

function errorLog(error){
  console.error.bind(error);
  this.emit('end')
}


// Connect Task
// Uglifies javascript
gulp.task('connect', function(){
  connect.server({
    livereload: true,
    port: 5000
  });
});

// Html Task
// Reloads html files
gulp.task('html', function (){
  gulp.src('./*.html')
      .pipe(livereload());
});


// Scripts Task
// Uglifies javascript
gulp.task('scripts', function(){
  gulp.src('scripts/*.js')
      .pipe(uglify())
      .on('error', errorLog)
      .pipe(gulp.dest('scripts/minjs/'))
      .pipe(livereload());     
});

// Styles Task
// Compile and minify stylus 
gulp.task('styles', function(){
  var processors = [
    rucksack,
    lost,
    autoprefixer ({browsers:['last 2 version']})
  ];

  gulp.src('css/stylus/styles.styl')
      .pipe(stylus({
        compress: false,
        use: [rupture()]
      }))
      .pipe(postcss(processors))
      .pipe(gulp.dest('css/'))
      .pipe(livereload());
});

// Watch Task
// Watches files
gulp.task('watch', function(){
  livereload.listen();

  gulp.watch('./*.html', ['html']);
  gulp.watch('scripts/*.js', ['scripts']);
  gulp.watch('css/stylus/*/*.styl', ['styles']);
});

gulp.task('default', ['connect', 'scripts', 'styles', 'watch']);
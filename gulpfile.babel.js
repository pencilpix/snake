import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import sync from 'browser-sync';
import karma from 'karma';

let browserSync = sync.create();
let $ = gulpLoadPlugins();
let KarmaServer = karma.Server

gulp.task('sass', () => {
  return gulp.src('src/assets/sass/**/*.sass')
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'compressed'
    }).on('error', $.sass.logError))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('src/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('babel', () => {
  return gulp.src('src/assets/js/es6/**/*.js')
    .pipe($.babel())
    .pipe(gulp.dest('src/assets/js/es5'));
});

gulp.task('babel:test', () => {
  return gulp.src('test/specs/**/*.js')
    .pipe($.babel())
    .pipe($.rename((path) => {
      path.basename += '.spec';
    }))
    .pipe($.browserify({
      insertGlobals: true,
      debug: !gulp.env.production
    }))
    .pipe(gulp.dest('test/'));
});


/**
 * browserify task to bundle the compiled js from 'es5'
 * and output bundle to js root folder
 */
gulp.task('browserify', () => {
  return gulp.src('src/assets/js/es5/*.js')
    .pipe($.browserify({
      insertGlobals: true,
      debug: !gulp.env.production
    }).on('update', () => { console.log('bundling ...!'); }))
    .pipe(gulp.dest('src/assets/js/'))
    .pipe(browserSync.stream());
});


gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });

  gulp.watch(['./src/**/*.html', './src/assets/images/**/*']).on('change', browserSync.reload);

  gulp.watch('./src/assets/sass/**/*.sass', ['sass']);
  gulp.watch('./src/assets/js/es6/**/*.js', ['babel']);
  gulp.watch('./src/assets/js/es5/**/*.js', ['browserify']);
});


gulp.task('test', ['babel:test'], (done) => {
  let server =  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done)

  // server.on('run_complete', function(){
  //   gulp.src('test/coverage/**/coverage.json')
  //     .pipe($.istanbulReport())
  // })

  server.start()
})

gulp.task('watch:test', function() {
  gulp.watch(['src/assets/js/es5/**/*.js', 'test/specs/*.js'], ['test'])
});

var gulp   = require('gulp')
  , mocha  = require('gulp-mocha');



gulp.task('mocha', function() {
  return gulp.src(['test/*-test.js'])
      .pipe(mocha({reporter: 'spec'}))
      .on('error', function(error) {
        console.log('mocha error');
        // console.trace(error.stack);
      });
});

gulp.task('mochaw', function() {
  gulp.watch(['lib/**/*.js', 'test/*.js'], ['mocha'])
      .on('change', function(ev) { console.log('File '+ev.path+' was '+ev.type+', running tasks...'); });
});

import gulp from 'gulp';
import yargs from 'yargs';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import prefix from 'gulp-autoprefixer';
import browsersync from 'browser-sync';

const browserSync = browsersync.create();
const reload = browserSync.reload;
const PRODUCTION = yargs.argv.prod;

const paths = {   
    styles: {
        src: ['assets/scss/app.scss'],
        dest: ['assets/css/'],
        autoprefixerOptions: {
            browsers: ['last 2 versions', '> 5%']
        }
    }
}

export const styles = () =>{
    return gulp.src(paths.styles.src) 
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix(paths.styles.autoprefixerOptions.browsers))
    .pipe(gulpif(PRODUCTION, cleanCSS({compatibility: 'ie8'})))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(gulp.dest(paths.styles.dest))
  }

  export const live = () =>{
    browserSync.init({
      server: {
        baseDir: "./"
      },
      notify: false
    });
    gulp.watch('assets/scss/**/*.scss', styles).on("change", reload);
    gulp.watch("*.html").on("change", reload);
  }
  
  export default live;


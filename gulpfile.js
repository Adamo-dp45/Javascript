/*
    - 'Gulp' est un automatisateur de tâches utilisé dans le développement web frontend et sert à automatiser des tâches répétitives
*/
const {src, dest, series, parallel, watch, lastRun} = require('gulp') // Ou.. 'import gulp from 'gulp''
// const resizer = require('gulp-image-resize') -- 'npm install -D gulp gulp-image-resize' pour les images
// const gulpSass = require('gulp-sass')

/*
    - 'npx gulp' pour tout exécuter
    - 'npx gulp sass' !! exécuter une tâche
*/

// -- Pour compiler scss en css -- //
gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass())              // compile scss
    .pipe(cleanCSS())          // minifie css
    .pipe(gulp.dest('dist/css')) // destination
}) // 

// -- !! minifier les fichiers css -- //
const cleanCSS = require('gulp-clean-css')
gulp.task('minify-css', function () {
    return gulp.src('dist/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
})

// -- !! compiler plusieurs fichiers en un -- //
const uglify = require('gulp-uglify')
gulp.task('minify-js', function () {
    return gulp.src('dist/js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})

// -- !! supprimer les fichiers temporaires ou dossiers -- //
const del = require('del')
gulp.task('clean', function () {
    return del(['dist/**', '!dist'])
})

// -- !! optimiser les images -- //
const imagemin = require('gulp-imagemin')
gulp.task('images', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
})

// -- !! utiliser autoprefixer -- //
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
gulp.task('autoprefix', function () {
    return gulp.src('dist/css/*.css')
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest('dist/css'))
})

// -- !! le live reload avec browsersync -- //
const browserSync = require('browser-sync').create()
gulp.task('serve', function () {
    browserSync.init({ server: './' })
    gulp.watch('src/scss/**/*.scss', gulp.series('sass')).on('change', browserSync.reload); gulp.watch('*.html').on('change', browserSync
.reload)
})

// -- !! surveiller les fichiers 'gulp.watch' -- //
gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'))
    gulp.watch('src/js/**/*.js', gulp.series('concat-js'))
})

// -- !! copier des fichiers d'un dossier à un autre -- //
gulp.task('copy-html', function () {
    return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
})

// -- !! vérifier le javascript avec esLint -- //
const eslint = require('gulp-eslint')
gulp.task('lint', function () {
    return gulp.src(['src/js/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
})

// -- !! créer une tâche par défaut 'gulp.default' -- //
gulp.task('default', gulp.series('clean', 'sass', 'minify-css', 'concat-js', 'minify-js'))

// -- !! créer un environnement de build complet -- //
gulp.task('build', gulp.series( 'clean', 'sass', 'autoprefix', 'minify-css', 'concat-js', 'minify-js', 'images', 'copy-html' ))

// -- ..en parallèle plus rapide, tâches indépendantes -- //
gulp.task('build', gulp.parallel('sass', 'concat-js'))
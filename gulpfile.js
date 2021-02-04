const {series,src,dest,watch} = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Utilidades CSS

const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//Utilidades JS

const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

const paths = {
    imagenes: "src/img/**/*",
    scss: "src/scss/**/*.scss",
    js: 'src/js/**/**.js'
}

//funciones para compilar sass

function css(){

    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.') )
        .pipe(dest('./build/css'))
}

function watchArchivos(){
    watch(paths.scss, css );
   
}

function imagenes(){
    return src(paths.imagenes)
        .pipe(imagemin() )
        .pipe( dest( './build/img' ))
        .pipe( notify({message: 'Imagen Minificada'}));
}

function versionWebp(){
    return src(paths.imagenes)
        .pipe(webp())
        .pipe( dest( './build/img' ))
        .pipe(notify({message:'Version webp lista'}));
}

//funciones para JS

function javascript(){
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe( concat('bundle.js'))
        .pipe(terser() )
        .pipe(sourcemaps.write('.'))
        .pipe( rename({suffix: '.min'}))
        .pipe(dest('./build/js'))
}


exports.css = css;
exports.watchArchivos = watchArchivos;
exports.imagenes = imagenes;
exports.javascript = javascript;
exports.versionWebp = versionWebp;


exports.default = series(css, javascript ,imagenes, versionWebp, watchArchivos);
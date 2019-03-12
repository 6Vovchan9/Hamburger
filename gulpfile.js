//Тут мы пытаемся создать такую штуку которая будет копировать файл из одгого места в другое
//импортируем gulp:
// const gulp = require('gulp') require - механизм импортирования зависимостей в note.js. В переменной gulp будет содержаться объект с методами которыми галп располагает


// const { src, dest} = require('gulp');

// //файлы копируем из одной папки в другую:

// function copy() {
//     return src('src/styles/main.scss').pipe(dest('dist'))
// }// при помощи pipe мы можем передать результат одной функции в другую. функция dest записывает файлы. Функция src читает содержимое файла

// //Чтобы мы могла отдельно вызывать этот таск нам нужно его експоритровать:

// exports.copy = copy

//----------------------------------------


//тут пытаемся делать то же самое что выше только с несколькими файлами:
// const { src, dest} = require('gulp');
// function copy() {
//     return src('src/styles/*.scss').pipe(dest('dist'))//*.scss позволяет оперировать несколькими файлами которые оканчиваются на .scss... Можно написать так req.*.scss тогда в обработку попадут файлы содержащие между точек любой контент например req.hhdrh.scss
//     //можно было написать так src/**/*.scss это значит неважно в какой папке внутри папки src работай со всеми файлами такого формата *.scss!
// }

// //можно указывать конкретные файлы которые хотим скопировать:

// const { src, dest} = require('gulp');

// const files = [
//     'src/styles/имя файла',
//     'src/styles/имя файла',
// ]

// function copy() {
//     return src(files).pipe(dest('dist'))//*.scss позволяет оперировать несколькими файлами которые оканчиваются на .scss... Можно написать так req.*.scss тогда в обработку попадут файлы содержащие между точек любой контент например req.hhdrh.scss
//     //можно было написать так src/**/*.scss это значит неважно в какой папке внутри папки src работай со всеми файлами такого формата *.scss!
// }

// //также можем исключать файлы из набора:

// const files = [
//     'src/styles/*.scss',
//     '!src/styles/two.scss',
// ]
//  и не забываем в конце писать:  exports.copy = copy


//------------------------------------------------------------

//плагин для удаления файла или папки:

//для начала подключим/установим плагин нам в проект:
//в консоли напишем npm install --save-dev gulp-rm !!!!!!!!!

// var gulp = require( 'gulp' )
// var rm = require( 'gulp-rm' )

// //есть два способа объявления taska как ниже и как выше через функцию но функцию потом надо экспортировать а таск не надо
// gulp.task( 'clean', function() { //можно так gulp.task() а можно как выше этот метод взять отдельно { src, dest, task} = require('gulp') и просто написать так task(...) без gulp
//   return gulp.src( './dist/*.scss', { read: false }) //read: false это значит что надо просто удалить не читая файлы
//     .pipe( rm() )
// })

//ниже в консоли вызываем этот таск так: npm run gulp clean

//------------------------------------------------------------

// склеим добавление и удаление

// const { src, dest, task} = require('gulp');
// const rm = require( 'gulp-rm' );

// //если ранее не устанавливали gulp и gulp-rm то надо это сделать в консоли: npm install --save-dev gulp-rm

// task( 'clean', function() {
//   return src( './dist/**/*', { read: false })
//     .pipe( rm() )
// });

// function copy() {
//     return src('./src/styles/*.scss').pipe(dest('dist'));
// };
// exports.copy = copy;

//----------------------------------------------------
//когда копируем файлы в новую папку то старые файлы в новой папке остаются нетронутыми. Для того чтобы папка назначения содержала только новые файлы без старых которые там уже
//были до копирования нам приходится сначала делать clean потом copy чтобы не делать два действия:


//для реализации последовательности тасков нам понадобится метод series

// const { src, dest, task, series} = require('gulp');
// const rm = require( 'gulp-rm' );



// task( 'clean', function() {
//   return src( './dist/**/*', { read: false })
//     .pipe( rm() )
// });

// task ('copy', series ('clean', function () {
//     return src('./src/styles/*').pipe(dest('dist'))
//     })
// )

//в консоли вызываем npm run gulp copy
//----------------------------------------------------


//когда будет куча тасков чтобы не запутаться будем использовать default чтобы не писать series внутри таска

// const { src, dest, task, series} = require('gulp');
// const rm = require( 'gulp-rm' );



// task( 'clean', function() {
//   return src( './dist/**/*', { read: false }).pipe( rm() );
// });

// task ('copy', function () {
//     return src('./src/styles/*').pipe(dest('dist'));
// });

// task ('default', series ('clean', 'copy'));

//вызывать будем при помощи npm run gulp !!! -  Без каких либо дополнений когда работаем с default. Причем таски должны быть объявлены перед default


//----------------------------------------------------
//обрабатываем файлы sass. Создаем файл css из общего scss который содержит в себе все остальные scss-стили

//на сайте npmjs ищем плагин gulp-sass устанавливаем его: npm install node-sass gulp-sass --save-dev
//подключаем его: var sass = require('gulp-sass'); указываем в качестве компилятора именно компилятор на node.js: sass.compiler = require('node-sass');


// const { src, dest, task, series} = require('gulp');
// const rm = require( 'gulp-rm' );
// var sass = require('gulp-sass');

// sass.compiler = require('node-sass');

// task( 'clean', function() {
//   return src( './dist/**/*', { read: false }).pipe( rm() );
// });

// task ('copy', function () {
//     return src('./src/styles/*').pipe(dest('dist'));
// });

// task ('styles', function () {
//     return src('./docs/css/styles-gulp.scss') //следим только за одним файлом - главным файлом в который подключены все стили при помощи @импорт
//     .pipe(sass().on('error', sass.logError))
//     .pipe(dest('./docs/css')); // путь куда будем сохранять полученный css файл
// });

//нам не надо ничего чистить и копировать потому что каждый раз когда мы будем вносить изменения в файл scss и в дальнейшем при его компиляции будет либо создаваться новый css файл либо если он уже есть то будет перезаписываться
// поэтому не надо удалять имеющийся файл поэтому таск будет вызывать НЕ через default а просто через консоль: npm run gulp styles

//------------------------------------------------------------------------------------------
//Склейка файлов
//сейчас у нас в файле styles-gulp.scss есть в том числе normalize
//давай те поробуем подключить normalize не через главный файл styles-gulp.scss а отдельно
//для начала подключим плагин normalize: npm install --save normalize.css

// const { src, dest, task, series} = require('gulp');
// const rm = require( 'gulp-rm' );
// var sass = require('gulp-sass');
// var concat = require('gulp-concat');

// sass.compiler = require('node-sass');

// const styles = [
//     //найдем ранее подключенный плагин normalize:
//     './node_modules/normalize.css/normalize.css',
//     './docs/css/styles-gulp.scss'
// ]

// task ('styles', function () {
//     return src(styles) 
//     .pipe(concat('styles-gulp.scss'))//название склеенного файла может называться как угодно. Имя полученного файла .css будет с таким же названием...Причем не важно что мы склеиваем .css и .scss
//     .pipe(sass().on('error', sass.logError))
//     .pipe(dest('./docs/css'));
// });

//этот таск создаст 2 файла css поэтому найдем такой плагин который склеит эти 2 файла это будет:gulp-concat
//установим его npm install --save-dev gulp-concat
// далее подключим: var concat = require('gulp-concat');
//добавляем строчку:.pipe(concat('main.scss')) - в скобках название склеенного файла

//---------------------------------------------------------------------------------------------

//чтобы при каждом изменении в каком либо файле scss не создавать новый общий css файл вручную нужно добавить слежку за файлами для этого есть спец метод watch
// для начала подключим его в gulp: const { src, dest, task, series, watch} = require('gulp');

const { src, dest, task, series, watch} = require('gulp');
const rm = require( 'gulp-rm' );
var sass = require('gulp-sass');
var concat = require('gulp-concat');

sass.compiler = require('node-sass');

const styles = [
    './node_modules/normalize.css/normalize.css',
    './docs/css/styles-gulp.scss'
]

task( 'clean', function() {
  return src( './docs/css/styles-gulp.css', { read: false }).pipe( rm() );
});

task ('styles', function () {
    return src(styles) 
    .pipe(concat('styles-gulp.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./docs/css'));
});

watch('./docs/css/*.scss', series('styles')); //будем следить за конкретным файлом и затем когда произойдет изменение мы будем вызывать task styles
task('default', series('clean', 'styles'));

//запустим галп npm run gulp при каждом запуске vscode иначе изменения не вступят в силу!!!!!!
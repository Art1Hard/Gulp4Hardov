// * Основной модуль
import gulp from "gulp";

// * Импорт путей
import { path } from "./gulp/config/path.js";

// * Импорт глобальных плагинов
import { plugins } from "./gulp/config/plugins.js";

global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins
}

// * Импорт задач
import { reset } from "./gulp/tasks/reset.js";
import { whitespaceToDash, clearFonts, deleteOtfFont, otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { images } from "./gulp/tasks/images.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { sprite } from "./gulp/tasks/sprite.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// * Наблюдатель
function watcher() {
	gulp.watch(path.watch.images, images);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.sprite, sprite);
}

const toDash = gulp.series(whitespaceToDash, clearFonts);

export { toDash, deleteOtfFont }

// * Построение сценариев
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle); // * Построение шрифтов

const mainTasks = gulp.series(fonts, gulp.parallel(html, scss, js, images, sprite));

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// * Экспорт сценариев
export { dev, build, deployZIP, deployFTP }

// * Выполнения сценария по умолчанию
gulp.task('default', dev);
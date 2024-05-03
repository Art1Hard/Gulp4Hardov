import replace from "gulp-replace"; // * Поиск и замена пути изображения @img
import newer from "gulp-newer"; // * Проверка обновления картинок
import browsersync from "browser-sync";
import ifPlugin from "gulp-if";

import plumber from "gulp-plumber"; // * Обработка ошибок
import notify from "gulp-notify"; // * Сообщения

export const plugins = {
	newer: newer,
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	if: ifPlugin
}
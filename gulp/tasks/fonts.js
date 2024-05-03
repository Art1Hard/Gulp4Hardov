import fs from 'fs';
import fonter from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2';
import rename from 'gulp-rename';


export const whitespaceToDash = () => {
	fs.readdir(app.path.src.fonts.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			for (var i = 0; i < fontsFiles.length; i++) {
				//console.log(fontsFiles[i]);
				if (fontsFiles[i].includes(' ')) {
					let fontRename = fontsFiles[i].replace(/\s+/g, '-');
					console.log(fontRename);
					console.log(fontsFiles[i]);

					app.gulp.src(`${app.path.src.fonts.fonts}${fontsFiles[i]}`)
						.pipe(rename(fontRename))
						.pipe(app.gulp.dest(app.path.src.fonts.fonts));
				}
			}
		}
	});

	return app.gulp.src(app.path.src.fonts.fonts)
}

export const clearFonts = () => {
	fs.readdir(app.path.src.fonts.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			for (var i = 0; i < fontsFiles.length; i++) {
				//console.log(fontsFiles[i]);
				let fontName = fontsFiles[i];
				if (fontsFiles[i].includes(' ')) {
					fs.unlink(`${app.path.src.fonts.fonts}${fontsFiles[i]}`, err => {
						if (err) throw err; // не удалось удалить файл
						console.log(`${fontName} успешно удалён`);
					});
				}
			}
		}
	});

	return app.gulp.src(`${app.path.srcFolder}`);
}

export const deleteOtfFont = () => {
	fs.readdir(app.path.src.fonts.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			for (var i = 0; i < fontsFiles.length; i++) {
				//console.log(fontsFiles[i]);
				let fontName = fontsFiles[i];
				if (fontsFiles[i].indexOf('.otf') != -1) {
					fs.unlink(`${app.path.src.fonts.fonts}${fontsFiles[i]}`, err => {
						if (err) throw err; // не удалось удалить файл
						console.log(`${fontName} успешно удалён`);
					});
				}
			}
		}
	});

	return app.gulp.src(`${app.path.srcFolder}`);
}

export const otfToTtf = () => {
	// * Ищем файлы шрифтов .otf
	return app.gulp.src(app.path.src.fonts.otf)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError(
					{
						title: "FONTS",
						message: "Error: <%= error.message %>"
					}
				)
			)
		)
		// * Конвертируем в .ttf
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(app.gulp.dest(app.path.src.fonts.fonts))
}

export const ttfToWoff = () => {
	// * Ищем файлы шрифтов .ttf
	return app.gulp.src(app.path.src.fonts.ttf)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError(
					{
						title: "FONTS",
						message: "Error: <%= error.message %>"
					}
				)
			)
		)
		// * Конвертируем в .woff
		.pipe(fonter({
			formats: ['woff'],
		}))
		.pipe(app.gulp.dest(app.path.build.fonts))

		// * Ищем файлы шрифтов .ttf
		.pipe(app.gulp.src(app.path.src.fonts.ttf))
		// * Конвертируем в .woff2
		.pipe(ttf2woff2())
		.pipe(app.gulp.dest(app.path.build.fonts))
}

export const fontsStyle = () => {
	// * Файл стилей подключения шрифтов
	let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

	// * Проверяем существуют ли файлы шрифтов
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			// * Проверяем существует ли файл стилей для подключения шрифтов
			if (!fs.existsSync(fontsFile)) {
				// * Если файла нет, создаем его
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (var i = 0; i < fontsFiles.length; i++) {
					// * Записываем подключение шрифтов в файл стилей
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
						if (fontWeight.toLowerCase() === 'thin') {
							fontWeight = 100;
						}
						else if (fontWeight.toLowerCase() === 'extralight') {
							fontWeight = 200;
						}
						else if (fontWeight.toLowerCase() === 'light') {
							fontWeight = 300;
						}
						else if (fontWeight.toLowerCase() === 'medium') {
							fontWeight = 500;
						}
						else if (fontWeight.toLowerCase() === 'semibold') {
							fontWeight = 600;
						}
						else if (fontWeight.toLowerCase() === 'bold') {
							fontWeight = 700;
						}
						else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
							fontWeight = 800;
						}
						else if (fontWeight.toLowerCase() === 'black') {
							fontWeight = 900;
						}
						else {
							fontWeight = 400;
						}
						fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
						newFileOnly = fontFileName;
					}
				}
			}
			else {
				console.log("Файл scss/fonts.scss уже существует. Для обновления файла его нужно удалить!");
			}
		}
	});

	return app.gulp.src(`${app.path.srcFolder}`);
	function cb() { }
}
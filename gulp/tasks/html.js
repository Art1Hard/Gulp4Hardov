import fileinclude from "gulp-file-include"; // * Плагин с подключением файлов с папки html
import webphtmlnosvg from "gulp-webp-html-nosvg"; // * Подключение webp изображений
import versionNumber from "gulp-version-number"; // * Избегает кэширование вёрстки браузером

export const html = () => {
	return app.gulp.src(app.path.src.html)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(fileinclude())
		.pipe(app.plugins.replace(/@img\//g, 'img/'))
		.pipe(app.plugins.if(app.isBuild, webphtmlnosvg()))
		.pipe(
			app.plugins.if(app.isBuild,
				versionNumber({
					'value': '%DT%',
					'append': {
						'key': '_v',
						'cover': 0,
						'to': [
							'css',
							'js',
						]
					},
					'output': {
						'file': 'gulp/version.json'
					}
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browsersync.stream());
}
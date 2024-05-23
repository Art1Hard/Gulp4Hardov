import svgSprite from "gulp-svg-sprite";
import svgMin from "gulp-svgmin";
import cheerio from "gulp-cheerio";
import path from "path";

const isColor = (file) => file.path.startsWith(path.resolve('src/img/icons/static'));

export const sprite = () => {
	return app.gulp.src(`${app.path.src.svgicons}`)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SVG",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(svgMin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(app.plugins.if(file => !isColor(file), cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: { xmlMode: true }
		})))
		.pipe(app.plugins.replace('&gt;', '>'))
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "../sprite.svg"
				}
			}
		}))
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.plugins.browsersync.stream());
}
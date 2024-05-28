// * Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
	build: {
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		fonts: `${buildFolder}/fonts/`,
		images: `${buildFolder}/img/`
	},
	src: {
		js: `${srcFolder}/js/app.js`,
		scss: `${srcFolder}/scss/style.scss`,
		html: `${srcFolder}/*.html`,
		fonts: {
			fonts: `${srcFolder}/fonts/`,
			ttf: `${srcFolder}/fonts/**/*.ttf`,
			otf: `${srcFolder}/fonts/**/*.otf`
		},
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		ico: `${srcFolder}/img/**/*.ico`,
		svgicons: `${srcFolder}/img/icons/**/*.svg`,
	},
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,ico,webp}`,
		sprite: `${srcFolder}/img/icons/**/*.svg`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: `htdocs/`
}
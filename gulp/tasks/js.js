import webpack from "webpack-stream";

export const js = () => {
	return app.gulp
		.src(app.path.src.js, { sourcemaps: app.isDev })
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: "JS",
					message: "Error: <%= error.message %>",
				})
			)
		)
		.pipe(
			webpack({
				mode: app.isBuild ? "production" : "development",
				module: {
					rules: [
						{
							test: /\.s[ac]ss$/i,
							use: [
								// Creates `style` nodes from JS strings
								"style-loader",
								// Translates CSS into CommonJS
								"css-loader",
								// Compiles Sass to CSS
								"sass-loader",
							],
						},
						{
							test: /\.css$/i,
							use: ["style-loader", "css-loader"],
						},
					],
				},
				output: {
					filename: `app.min.js`,
				},
			})
		)
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browsersync.stream());
};

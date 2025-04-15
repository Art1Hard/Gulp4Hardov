import webpack from "webpack-stream";

export const scripts = () => {
	return app.gulp
		.src(app.path.src.scripts, { sourcemaps: app.isDev }) // Обрати внимание: ts, не js
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: "TypeScript",
					message: "Error: <%= error.message %>",
				})
			)
		)
		.pipe(
			webpack({
				mode: app.isBuild ? "production" : "development",
				devtool: app.isDev ? "source-map" : false,
				resolve: {
					extensions: [".ts", ".js"],
				},
				module: {
					rules: [
						{
							test: /\.ts$/,
							use: "ts-loader",
							exclude: /node_modules/,
						},
						{
							test: /\.s[ac]ss$/i,
							use: ["style-loader", "css-loader", "sass-loader"],
						},
						{
							test: /\.css$/i,
							use: ["style-loader", "css-loader"],
						},
					],
				},
				output: {
					filename: "app.min.js",
				},
			})
		)
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browsersync.stream());
};

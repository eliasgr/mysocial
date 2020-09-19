import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import config from '../config/config';

const compile = app => {
	if (config.env === 'development') {
		const compiler = webpack(webpackConfig);
		const middleware = WebpackMiddleware(compiler, {
			publicPath: webpackConfig.output.publicPath,
		});
		app.use(middleware);
		app.use(WebpackHotMiddleware(compiler));
	}
};

export default { compile };

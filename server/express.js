import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import Template from './../template';
import devBundle from './devBundle';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

devBundle.compile(app);

// parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());

//secure apps by setting various HTTP headers
app.use(helmet());

//enable  Cross Origin Resource Sharing (CORS)
app.use(cors());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.use('/', userRoutes);
app.use('/', authRoutes);

app.get('*', (req, res) => {
	// const sheets = new ServerStyleSheets();
	// const context = {};
	// const markup = ReactDOMServer.renderToString(
	// 	sheets.collect(
	// 		<StaticRouter location={req.url} context={context}>
	// 			<ThemeProvider theme={theme}>
	// 				<MainRouter />
	// 			</ThemeProvider>
	// 		</StaticRouter>
	// 	)
	// );

	// if (context.url) {
	// 	return res.redirect(303, context.url);
	// }

	// const css = sheets.toString();
	res.status(200).send(Template);
	console.log('root');
});

//catch unauthorized erros

app.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401).json({ error: `${err.name}:${err.message}` });
	} else if (err) {
		res.status(400).json({ error: `${err.name}: ${err.message}` });
		console.log(err);
	}
});
export default app;

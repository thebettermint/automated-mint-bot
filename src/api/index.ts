import express, { Express } from 'express';
import http from 'http';
import cors, { CorsRequest } from 'cors';
import constants from './constants';
import path from 'path';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/error';

import env from './helpers/env';

const port = env['API_PORT'] || 4005;

const corsOptions = {
  origin: constants.origins,
  //methods: 'GET, POST, PUT, OPTIONS',
  credentials: true,
};

const app: Express = express();
const httpServer = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(constants.routes, cors<CorsRequest>(corsOptions));
app.use(constants.routes, express.json({ limit: '1mb' }));

// api routes
/* app.use('/', require(path.join(__dirname, 'src', 'routes', 'root.routes.ts'))); */
app.use('/link', require(path.join(__dirname, 'routes', 'link.routes')));
app.use('/pin', require(path.join(__dirname, 'routes', 'pin.routes')));

app.use(errorHandler);

httpServer.listen({ port: port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});

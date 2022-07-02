import dotenv from 'dotenv';
import express, { Express } from 'express';
import http from 'http';
import cors, { CorsRequest } from 'cors';
import constants from './constants';
import path from 'path';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/error';

dotenv.config();

const port = process.env['API_PORT'] || 4001;

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
app.use('/', require(path.join(__dirname, 'routes', 'root.routes.ts')));
app.use('/ipfs', require(path.join(__dirname, 'routes', 'ipfs.routes.ts')));
app.use('/pin', require(path.join(__dirname, 'routes', 'pin.routes.ts')));

app.use(errorHandler);

httpServer.listen({ port: port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});

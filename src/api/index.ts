import express, { Express } from 'express';
import http from 'http';
import cors, { CorsRequest } from 'cors';
import { routes, origins } from '../lib/constants';
import path from 'path';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/error';

import config from '../../config';

const corsOptions = {
  origin: origins,
  //methods: 'GET, POST, PUT, OPTIONS',
  credentials: true,
};

export const apiServer = () => {
  const app: Express = express();
  const httpServer = http.createServer(app);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(routes, cors<CorsRequest>(corsOptions));
  app.use(routes, express.json({ limit: '1mb' }));

  // api routes
  /* app.use('/', require(path.join(__dirname, 'src', 'routes', 'root.routes.ts'))); */
  app.use('/apex', require(path.join(__dirname, 'routes', 'apex.routes')));
  app.use('/pin', require(path.join(__dirname, 'routes', 'pin.routes')));

  app.use(errorHandler);

  httpServer.listen({ port: config.api.port }, () => {
    console.log(`🚀 Server ready at http://localhost:${config.api.port}`);
  });
};

//apiServer();

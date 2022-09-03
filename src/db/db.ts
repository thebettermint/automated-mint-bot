import mongoose from 'mongoose';
import { MongoClientOptions } from 'mongodb';
import config from '../../config';

interface ConnectOptions extends MongoClientOptions {
  /** Set to false to [disable buffering](http://mongoosejs.com/docs/faq.html#callback_never_executes) on all models associated with this connection. */
  bufferCommands?: boolean;
  /** The name of the database you want to use. If not provided, Mongoose uses the database name from connection string. */
  dbName?: string;
  /** username for authentication, equivalent to `options.auth.user`. Maintained for backwards compatibility. */
  user?: string;
  /** password for authentication, equivalent to `options.auth.password`. Maintained for backwards compatibility. */
  pass?: string;
  /** Set to false to disable automatic index creation for all models associated with this connection. */
  autoIndex?: boolean;
  /** Set to `true` to make Mongoose automatically call `createCollection()` on every model created on this connection. */
  autoCreate?: boolean;
}

const port = config.db.port;
const container = config.db.container;
const uri = `mongodb://${container}:${port}`;

const connectionOptions: ConnectOptions = {
  bufferCommands: true,
  autoIndex: true,
  autoCreate: true,
  user: config.db.user,
  pass: config.db.pass,
  dbName: config.db.name,
};

mongoose.connect(config.db.uri || uri, connectionOptions);
mongoose.Promise = global.Promise;

import apex_model from './models/apex.model';

export default {
  Apex: apex_model,
  isValidId,
};

function isValidId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

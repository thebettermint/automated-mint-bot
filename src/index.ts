import { apiServer } from './api';
import { WS } from './bot/monitor/ws';
import config from '../config';
import { test } from './test';

// Start API server
apiServer();

// Start WS server
let ws = new WS();
ws._init();

// Create a prototype for peer sockets so that they are accessible
// between all instances of this WS
WS.prototype['peerSockets'] = {};

console.log(config.version);

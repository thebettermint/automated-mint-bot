import { WS } from './bot/monitor/ws';
import { apiServer } from './api';
import config from '../config';

// Start WS server
let ws = new WS();
ws._init();

// Create a prototype for peer sockets so that they are accessible
// between all instances of this WS
WS.prototype['peerSockets'] = {};

// Start API server
apiServer();

console.log(config.version);

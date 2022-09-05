import { apiServer } from './api';
import { wsServer } from './bot/monitor/ws';
import config from 'config';

// Start API server
apiServer();

// Start WS server
wsServer._init();

console.log(config.version);

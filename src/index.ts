import { apiServer } from './api';
import { wsServer } from './bot/monitor/ws';

// Start API server
apiServer();

// Start WS server
wsServer._init();

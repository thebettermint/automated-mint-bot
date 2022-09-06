import { WS } from './bot/monitor/ws';
import { WebSocket } from 'ws';
import config from '../config';

export const test = async () => {
  while (true) {
    await new Promise((resolve) => {
      let ws = new WS();
      setTimeout(() => {
        console.log(ws['peerSockets']);
        resolve('');
      }, 5000);
    });
  }
};

export const ws1 = async () => {
  const ws = new WebSocket(config.ws.url);

  ws.onopen = () => {
    console.log('WS: server connected');
    console.log('sending message');
    ws.send(
      JSON.stringify({
        type: 'history',
      })
    );
    ws.send(
      JSON.stringify({
        type: 'subscribe',
      })
    );
  };

  ws.onmessage = async (e: any) => {
    let response = JSON.parse(e.data);
    console.log('message received', response);

    if (response.type == 'error') return console.log(response);

    if (response.type == 'success') return;

    if (response.type == 'ping')
      return ws.send(JSON.stringify({ type: 'pong' }));

    if (response.type == 'history') return console.log(response);
    return console.log(response);
  };

  ws.onclose = () => console.log('WS: Disconnected');
  ws.onerror = (e) => console.error('WS: Error', e);
};

ws1();

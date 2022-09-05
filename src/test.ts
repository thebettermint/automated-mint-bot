import { WS } from './bot/monitor/ws';

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

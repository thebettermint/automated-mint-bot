import config from '../../../config';

export class WS {
  [index: string]: any;
  wss: any;

  constructor() {}

  _init = () => {
    const WebSocket = require('ws');
    this.wss = new WebSocket.Server({ port: config.ws.port });
    this.wss.on('connection', (socket: any) =>
      this._onConnection(new Peer(socket))
    );
    console.log(
      `The websocket is running on port ${config.ws.port} and listening for requests`
    );
  };

  _onConnection = (peer: any) => {
    peer.socket.on('message', (message: any) => this._onMessage(peer, message));
    this._keepAlive(peer);

    // send displayName
    this._send(peer, {
      type: 'success',
      msg: 'The connection to the server websocket was successful',
      id: peer.id,
    });
  };

  _onMessage = async (sender: any, message: any) => {
    // Try to parse message
    try {
      message = JSON.parse(message);
    } catch (e) {
      return; // TODO: handle malformed JSON
    }

    switch (message?.type) {
      case 'pong':
        sender.lastBeat = Date.now();
        break;
      case 'subscribe':
        sender.lastBeat = Date.now();
        if (this['peerSockets'][sender.id]) this._removePeerSockets(sender);
        this['peerSockets'][sender.id] = sender;
        break;
    }
  };

  sendAll = (message: any) => {
    if (!message) return;
    //if (this.wss.readyState !== this.wss.OPEN) return;

    message = JSON.stringify(message);

    console.log(this['peerSockets']);

    let keys = Object.keys(this['peerSockets']);
    console.log(keys);

    if (!keys || keys.length === 0) return;

    keys.map((id: any) => {
      this['peerSockets'][id].send(message, (error: any) => {
        if (error) console.log(error, 'error sending message to peer');
        console.log('message sent');
      });
    });
  };

  _send = (peer: any, message: any) => {
    if (!peer) return;
    if (this.wss.readyState !== this.wss.OPEN) return;
    message = JSON.stringify(message);
    peer.socket.send(message, (error: any) => {
      if (error) console.log(error, 'error sending message to peer');
      console.log('message sent');
    });
  };

  _removePeerSockets = (peer: any) => {
    console.log(`Removing peer from socket( ${peer.id} )`);
    //this.peerSockets[peer.id].forEach((socket: any) => socket.disconnect());
    delete this['peerSockets'][peer.id];
  };

  _keepAlive = (peer: any) => {
    this._cancelKeepAlive(peer);
    var timeout = 30000;
    if (!peer.lastBeat) {
      peer.lastBeat = Date.now();
    }
    if (Date.now() - peer.lastBeat > 2 * timeout) {
      this._removePeerSockets(peer);
      setTimeout(() => {
        peer.socket.terminate();
      }, 5000);
      return;
    }

    this._send(peer, { type: 'ping' });

    peer.timerId = setTimeout(() => this._keepAlive(peer), timeout);
  };

  _cancelKeepAlive = (peer: any) => {
    if (peer && peer.timerId) {
      clearTimeout(peer.timerId);
    }
  };
}

class Peer {
  socket: any;
  id: string;
  timerId: number;
  lastBeat: number;
  constructor(socket: any) {
    // set socket
    this.socket = socket;
    this.id = this._uuid();
    // for keepalive
    this.timerId = 0;
    this.lastBeat = Date.now();
  }

  _uuid() {
    let uuid = '',
      ii;
    for (ii = 0; ii < 32; ii += 1) {
      switch (ii) {
        case 8:
        case 20:
          uuid += '-';
          uuid += ((Math.random() * 16) | 0).toString(16);
          break;
        case 12:
          uuid += '-';
          uuid += '4';
          break;
        case 16:
          uuid += '-';
          uuid += ((Math.random() * 4) | 8).toString(16);
          break;
        default:
          uuid += ((Math.random() * 16) | 0).toString(16);
      }
    }
    return uuid;
  }
}

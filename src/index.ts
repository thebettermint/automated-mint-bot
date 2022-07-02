import json from '@thebettermint/registry/src/registry.json';
import lib from './lib';

import Client, { constants } from '@thebettermint/xrpl-tx-parser';
import config from '../config/config.json';
import parse from './lib/parse';
import ipfs from './lib/utils/ipfs';

const main = () => {
  const registryAddresses = lib.registry.getAddressArrayRegistry(json);
  console.log(registryAddresses);
  if (registryAddresses instanceof Error) return;

  let api = new Client({
    url: config[0].network,
    registry: registryAddresses,
    reconnect: true,
  });

  let events = constants.wsStatusMessages;

  api.once(events.connected, () => _onConnected());
  api.on(events.tx, (e: any) => _onTx(e));
  api.once(events.closed, () => _onClose());
  api.on(events.reconnect, () => _onReconnect());
  api.on(events.timeout, () => _onTimeout());
  api.on(events.error, (evt: any[]) => _onError(evt));
  api.on('ping', () => api.emit('pong'));

  const _onConnected = () => {
    console.log(events.connected);
  };

  const _onTx = (e: any) => {
    let meta = parse.TXtoCreditMetadata(e);
    if (meta) ipfs.handleUploadToIpfs(meta);
    return;
  };

  const _onTimeout = () => {
    console.log('timeout');
  };

  const _onReconnect = () => {
    console.log('reconnect');
  };

  const _onError = (e: any) => {
    console.log(e);
  };

  const _onClose = () => {
    console.log(events.closed);
  };
};

main();

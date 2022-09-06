import db from '../db';
import { WS } from '../../bot/monitor/ws';

const findAll = async () => {
  let all = await db.Apex.find();
  return all;
};

const add = async (params: { publicAddress: string }) => {
  const asset = new db.Apex(params);
  await asset.save();
  return asset;
};

const findByUUID = async (uuid: string) => {
  const asset: any = await db.Apex.findOne({ uuid: uuid });
  if (!asset) throw Error('uuid not found');
  return asset;
};

const updateToClaimed = async (uuid: string) => {
  const asset = await db.Apex.findOne({ uuid: uuid });
  if (!asset) throw Error('uuid not found');

  asset.claimedAt = new Date(Date.now());
  asset.status = 'claimed';
  await asset.save();
  WS.prototype.sendAll({ type: 'update', status: 'claimed', data: asset });
  return asset;
};

const updateToConsumed = async (uuid: string) => {
  const asset = await db.Apex.findOne({ uuid: uuid });
  if (!asset) throw Error('uuid not found');

  asset.consumedAt = new Date(Date.now());
  asset.status = 'consumed';
  await asset.save();
  WS.prototype.sendAll({ type: 'update', status: 'consumed', data: asset });
  return asset;
};

const findByAddress = async (address: string) => {
  const asset = await db.Apex.findOne({ publicAddress: address });
  if (!asset) throw Error('address not found ');
  return asset;
};

export default {
  add,
  findByUUID,
  findByAddress,
  updateToConsumed,
  updateToClaimed,
  findAll,
};

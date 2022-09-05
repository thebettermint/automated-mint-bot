import db from '../db';
import { wsServer } from 'src/bot/monitor/ws';

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
  wsServer.sendAll(asset);
  return asset;
};

const updateToConsumed = async (uuid: string) => {
  const asset = await db.Apex.findOne({ uuid: uuid });
  if (!asset) throw Error('uuid not found');

  asset.consumedAt = new Date(Date.now());
  asset.status = 'consumed';
  await asset.save();
  wsServer.sendAll(asset);
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
};

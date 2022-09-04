import db from '../db';

const add = async (params: { publicAddress: string }) => {
  const asset = new db.Apex(params);
  await asset.save();
  return asset;
};

const findByUUID = async (uuid: string) => {
  const asset: any = await db.Apex.findOne({ uuid: uuid });
  if (!asset) return 'uuid not found in database';
  return asset;
};

const updateToClaimed = async (uuid: string) => {
  const asset = await db.Apex.findOne({ uuid: uuid });
  if (!asset) return 'uuid not found in database';
  asset.claimedAt = new Date(Date.now());
  asset.status = 'claimed';
  await asset.save();
  return asset;
};

const updateToConsumed = async (uuid: string) => {
  const asset = await db.Apex.findOne({ uuid: uuid });
  if (!asset) return 'uuid not found in database';
  asset.consumedAt = new Date(Date.now());
  asset.status = 'consumed';
  await asset.save();
  return asset;
};

const findByAddress = async (address: string) => {
  const asset = await db.Apex.findOne({ publicAddress: address });
  if (!asset) return 'address not found in database';
  return asset;
};

export default {
  add,
  findByUUID,
  findByAddress,
  updateToConsumed,
  updateToClaimed,
};

import db from '../db';

const add = async (params: { publicAddress: string }) => {
  const asset = new db.Apex(params);
  await asset.save();
  return asset;
};

const findOfferByUUID = async (uuid: string) => {
  const asset: any = await db.Apex.findOne({ uuid: uuid });
  if (!asset) return 'uuid not found in database';
  const { hash, tokenId, offerId } = asset;
  return { hash, tokenId, offerId };
};

export default {
  add,
  findOfferByUUID,
};

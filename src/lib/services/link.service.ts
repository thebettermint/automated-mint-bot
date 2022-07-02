import db from '../helpers/db';

const add = async (params: {
  hash: String;
  tokenId: String;
  offerId: String;
}) => {
  // create link object
  const link = new db.Link(params);
  // save link
  await link.save();

  console.log('saved to db');
  return link;
};

const findOfferByHash = async (hash: string) => {
  const link: any = await db.Link.findOne({ hash: hash });
  if (!link) return 'hash not found in database';
  const { token, offerId } = link;
  return { token, offerId };
};

export default {
  add,
  findOfferByHash,
};

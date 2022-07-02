import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  hash: { type: String },
  token: { type: String },
  offerId: { type: String },
});

export default mongoose.model('Link', schema);

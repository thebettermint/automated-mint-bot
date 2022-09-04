import mongoose from 'mongoose';
import uuid from 'node-uuid';
const Schema = mongoose.Schema;

const schema = new Schema({
  tokenId: { type: String },
  offerId: { type: String },
  publicAddress: { type: String, required: true },
  uuid: {
    type: String,
    unique: true,
    required: true,
    default: function genUUID() {
      return uuid.v4();
    },
  },
  status: { type: String, default: 'init', required: true },
  offeredAt: { type: Date, default: null },
  claimedAt: { type: Date, default: null },
  consumedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: Date,
});

export default mongoose.model('Apex', schema);

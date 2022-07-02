import axios from 'axios';
import FormData from 'form-data';
import env from '../helpers/env';
import db from '../helpers/db';

const ipfs_domain = env['IPFS_DOMAIN'];
const ipfs_port = env['IPFS_PORT'];

const ipfsAddFile = async ({ image, json }: { image: any; json?: any }) => {
  try {
    const formData = new FormData();
    const file = image;
    const meta = json;

    //if (file) formData.append('file', file.buffer, 'asset');
    if (file) formData.append('file', file, 'asset');
    if (meta) formData.append('file', meta, 'meta');

    let uriTail = '';
    if (file && meta) uriTail = '&recursive=true&wrap-with-directory=true';

    const response = await axios.post(
      `${ipfs_domain}:${ipfs_port}/api/v0/add?pin=true&${uriTail}`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    if (file && meta) {
      let data = response.data.replaceAll('}', '},');
      let handledString = '[' + data.slice(0, data.length - 2) + ']';
      return handledString;
    }
    return response.data;
  } catch (e: any) {
    console.log(`API error @ ipfs add: ${e.message}`);
    return Error(e.message);
  }
};

const ipfsAddMeta = async (json: any) => {
  try {
    const formData = new FormData();
    const meta = json;

    formData.append('file', JSON.stringify(meta), 'meta');

    const response = await axios.post(
      `${ipfs_domain}:${ipfs_port}/api/v0/add?pin=true&recursive=true`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    return response.data;
  } catch (e: any) {
    console.log(`API error @ ipfs add: ${e.message}`);
    return Error(e.message);
  }
};

const findOfferByHash = async (hash: string) => {
  const link: any = await db.Link.findOne({ hash: hash });
  if (!link) return 'hash not found in database';
  const { token, offerId } = link;
  return { token, offerId };
};

export default {
  ipfsAddFile,
  ipfsAddMeta,
  findOfferByHash,
};

import FormData from 'form-data';
import axios from 'axios';
import env from '../helpers/env';
import fs from 'fs';

const ipfs_domain = env['IPFS_DOMAIN'];
const ipfs_port = env['IPFS_PORT'];

const ipfsAddFile = async ({ image, json }: { image?: any; json?: any }) => {
  try {
    const formData = new FormData();
    const file = image;
    const meta = json;

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

const handleUploadToIpfs = async (meta: any) => {
  let assetPath = require.resolve(
    `@thebettermint/registry/${meta.image.replace(
      'https://github.com/thebettermint/registry/blob/main/',
      ''
    )}`
  );

  let buffer = fs.readFileSync(assetPath);
  let image = await ipfsAddFile({ image: buffer });
  let file = await ipfsAddFile({ json: JSON.stringify(meta.file) });

  let template = {
    schema: 'https://ipfs.whirled.io/14381274987132894078913278946187469123',
    nftType: 'thebettermint.taxCred.v0',
    name: 'Tax Credit NFT',
    description:
      'This is a tax credit generated by thebettermint xrpl-mint-bot',
    image: `ipfs://${image.Hash}`,
    file: `ipfs://${file.Hash}`,
  };

  let json = Object.assign(
    template,
    { collection: meta.collection },
    { attributes: meta.attributes }
  );
  let final = await ipfsAddFile({ json: JSON.stringify(json) });
  return final.Hash;
};

export default { ipfsAddFile, ipfsAddMeta, handleUploadToIpfs };
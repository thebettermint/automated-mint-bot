import FormData from 'form-data';
import axios from 'axios';
import config from '../../../config';

axios.defaults.baseURL = `${config.ipfs.domain}:${config.ipfs.port}`;

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
      `/api/v0/add?pin=true&${uriTail}`,
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
      `/api/v0/add?pin=true&recursive=true`,
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

const handleUploadToIpfs = async (buffer: any) => {
  let image = await ipfsAddFile({ image: buffer });

  let json = {
    schema: 'https://ipfs.thebettermint.dev/ipfs/Qmewr341234123489123749812734',
    nftType: 'thebettermint.apex.v0',
    name: '2022 Apex Developer Summit Demo',
    description:
      'This is a demo non-fungible token generated by thebettermint xrpl-mint-bot',
    image: `ipfs://${image.Hash}`,
  };

  let final = await ipfsAddFile({ json: JSON.stringify(json) });
  return final.Hash;
};

export default { ipfsAddFile, ipfsAddMeta, handleUploadToIpfs };

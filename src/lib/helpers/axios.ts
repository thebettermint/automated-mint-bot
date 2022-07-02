import axios from 'axios';

export const getAssetFromExternal = async (uri: string) => {
  let asset = await axios.get(uri, {
    timeout: 10000,
    responseType: 'arraybuffer',
    /*     onDownloadProgress: (progressEvent: any) => {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
    }, */
  });
  return asset.data;
};

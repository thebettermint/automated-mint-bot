import config from '../../config';
import ipfs from '../lib/ipfs';
import x from '../lib/xrpl';
import apexService from '../db/services/apex.service';
import path from 'path';
import { processQRCode } from '../lib/qr';
import { processOverlay } from '../lib/sharp';

import { wsServer } from '../bot/monitor/ws';

const assetPath: any = {
  mock1: path.resolve(config.directory, 'src/api/assets/images/mock1.png'),
  mock2: path.resolve(config.directory, 'src/api/assets/images/mock2.png'),
};

const onDemand = async ({ address }: { address: string }) => {
  const api = await x.client.init(config.nodes.xrplnft.wss);

  console.log(wsServer.peerSockets);

  try {
    let dbAsset = await apexService.add({
      publicAddress: address,
    });

    let assetKeys = Object.keys(assetPath);
    let selectionPath = assetKeys[Math.floor(Math.random() * assetKeys.length)];

    let qrData = await processQRCode({
      address: address,
      uuid: dbAsset.uuid,
      issuer: config.wallet.address,
      createdAt: dbAsset.createdAt,
    });

    // Process image to generate nft
    let processImage = await processOverlay(assetPath[selectionPath], qrData);

    // upload image and meta data to ipfs
    let [json, image] = await ipfs.handleUploadToIpfs(processImage);
    if (json instanceof Error || image instanceof Error)
      throw Error('Error @ IPFS Upload');

    console.log(`IPFS Upload Successful. CID: ${json}`);

    await api.connect();

    let nft = await x.nftCreate({ api: api, uri: `ipfs://${json}` });
    if (!nft || nft instanceof Error) throw Error('Error @ Token Mint');

    let offerId = await x.nftTransfer({
      api: api,
      destination: address,
      id: nft[1],
    });

    if (!offerId || offerId instanceof Error)
      throw Error('Error @ OfferCreate');

    dbAsset.tokenId = nft[1];
    dbAsset.offerId = offerId;
    dbAsset.status = 'offered';
    dbAsset.offeredAt = new Date(Date.now());
    dbAsset.updatedAt = new Date(Date.now());

    dbAsset.cid = json;
    dbAsset.meta.image = image;
    dbAsset.meta.json = json;

    await dbAsset.save();

    wsServer.sendAll(dbAsset);

    return dbAsset;
  } catch (error: any) {
    console.log(error);
    return Error(error.message);
  } finally {
    api.disconnect();
  }
};

export default onDemand;
import { Request, Response } from 'express';

import ipfsService from '../services/ipfs.service';

const ping = async (res: Response) => {
  return res.json('pong');
};

const add = async (req: Request, res: Response) => {
  const { file, meta } = req.body;
  ipfsService.ipfsAddFile({ image: file, json: meta });
  return res.json('pong');
};

const getOfferId = async (req: Request, res: Response) => {
  const { address, destination, hash } = req.body;
  console.log(address);
  console.log(destination);
  console.log(hash);

  let resp = new Promise(async (resolve) => {
    let data = await ipfsService.findOfferByHash(hash);
    resolve(data);
  });

  return res.json(resp);
};

export default {
  ping,
  add,
  getOfferId,
};

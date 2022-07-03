import { Request, Response, NextFunction } from 'express';

import linkService from '../services/link.service';

const ping = async (_req: Request, res: Response, _next: NextFunction) => {
  return res.json('pong');
};

const getOfferId = async (req: Request, res: Response) => {
  const { hash } = req.params;
  let resp = await new Promise(async (resolve) => {
    let data = await linkService.findOfferByHash(hash);
    resolve(data);
  });

  return res.json(resp);
};

export default {
  ping,
  getOfferId,
};

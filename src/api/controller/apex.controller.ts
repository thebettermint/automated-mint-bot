import { Request, Response, NextFunction } from 'express';

import apexService from '../../db/services/apex.service';
import onDemand from '../../bot/demand';

const ping = async (_req: Request, res: Response, _next: NextFunction) => {
  return res.json('pong');
};

const getOfferId = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  let resp = await new Promise(async (resolve) => {
    let data = await apexService.findOfferByUUID(uuid);
    resolve(data);
  });

  return res.json(resp);
};

const ondemand = async (req: Request, res: Response) => {
  const { address } = req.body;
  let resp = await new Promise(async (resolve, reject) => {
    let data = await onDemand({ address: address });
    if (data instanceof Error) reject(data);
    resolve(data);
  });

  return res.json(resp);
};

export default {
  ping,
  getOfferId,
  ondemand,
};

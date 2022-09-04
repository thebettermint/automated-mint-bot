import { Request, Response, NextFunction } from 'express';

import apexService from '../../db/services/apex.service';
import onDemand from '../../bot/demand';

const ping = async (_req: Request, res: Response, _next: NextFunction) => {
  return res.json('pong');
};

const getByAddress = async (req: Request, res: Response) => {
  const { address } = req.params;
  let resp = await apexService.findByAddress(address);
  return res.json(resp);
};

const getByUUID = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  let response = await apexService.findByUUID(uuid);
  return res.json(response);
};

const claimed = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  let data = await apexService.updateToClaimed(uuid);
  return res.json(data);
};

const consumed = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  let data = await apexService.updateToConsumed(uuid);
  return res.json(data);
};

const ondemand = async (req: Request, res: Response) => {
  const { address } = req.body;
  let data = await onDemand({ address: address });
  return res.json(data);
};

export default {
  ping,
  ondemand,
  getByAddress,
  getByUUID,
  claimed,
  consumed,
};

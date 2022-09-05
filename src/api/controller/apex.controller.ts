import { Request, Response, NextFunction } from 'express';

import apexService from '../../db/services/apex.service';
import onDemand from '../../bot/demand';
import errorHandler from '../middleware/error';

const ping = async (_req: Request, res: Response, _next: NextFunction) => {
  return res.json('pong');
};

const getByAddress = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    let resp = await apexService.findByAddress(address);
    return res.json(resp);
  } catch (e) {
    return errorHandler(e, res);
  }
};

const getByUUID = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    let response = await apexService.findByUUID(uuid);
    return res.json(response);
  } catch (e) {
    return errorHandler(e, res);
  }
};

const claimed = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.body;
    let data = await apexService.updateToClaimed(uuid);
    return res.json(data);
  } catch (e) {
    return errorHandler(e, res);
  }
};

const consumed = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.body;
    let data = await apexService.updateToConsumed(uuid);
    return res.json(data);
  } catch (e) {
    return errorHandler(e, res);
  }
};

const ondemand = async (req: Request, res: Response) => {
  try {
    const { address } = req.body;
    let data = await onDemand({ address: address });
    return res.json(data);
  } catch (e) {
    return errorHandler(e, res);
  }
};

export default {
  ping,
  ondemand,
  getByAddress,
  getByUUID,
  claimed,
  consumed,
};

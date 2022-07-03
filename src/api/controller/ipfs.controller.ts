import { Request, Response, NextFunction } from 'express';

const ping = async (_req: Request, res: Response, _next: NextFunction) => {
  return res.json('pong');
};

export default {
  ping,
};

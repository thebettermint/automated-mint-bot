import { Request, Response, NextFunction } from 'express';
import config from '../../../config';

declare global {
  namespace Express {
    export interface Request {
      file: any;
      meta: any;
    }
  }
}

const secret = config.api.secret;

const bearer = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  if (token && typeof token === 'string')
    token = token.replace(/^Bearer\s+/, '');

  if (token && typeof token === 'string') {
    if (secret !== token)
      return res.status(401).json({ message: 'Unauthorized' });
    return next();
  }

  return res.status(401).json({ message: 'Unauthorized' });
};

export default {
  bearer,
};

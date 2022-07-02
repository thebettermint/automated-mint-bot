import { Request, Response, NextFunction } from 'express';
import env from '../helpers/env';

declare global {
  namespace Express {
    export interface Request {
      file: any;
      meta: any;
    }
  }
}

const secret = env['secret'] || '';

const bearer = (roles: any = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return [
    async (req: Request, res: Response, next: NextFunction) => {
      let token = req.headers['x-access-token'] || req.headers['authorization'];
      if (!token) next();

      if (token && typeof token == 'string')
        token = token.replace(/^Bearer\s+/, '');

      if (token && typeof token == 'string') {
        if (secret !== token)
          return res.status(401).json({ message: 'Unauthorized' });
        return next();
      }
      return res.status(401).json({ message: 'Unauthorized' });
    },
  ];
};

export default {
  bearer,
};

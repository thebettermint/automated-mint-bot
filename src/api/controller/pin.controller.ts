import {
  //Request,
  Response,
  //NextFunction
} from 'express';

const ping = async (
  /* req:Request, */ res: Response /* next:NextFunction */
) => {
  return res.json('pong');
};

export default {
  ping,
};

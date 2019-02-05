import { Request, Response, NextFunction } from 'express';

export const baseController = (
  promise: (...args: any[]) => Promise<any>,
  getParamsFn?: Function
) => async (req: Request, res: Response, next: NextFunction) => {
  const boundParams = getParamsFn ? getParamsFn(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.json(result || { message: 'OK' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

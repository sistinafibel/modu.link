import * as express from 'express';

export const sendErrorJson = (res: express.Response, code: number, message: string, errorCode: string = null) => {
  // throw new HttpException(code, message);
  res.status(code).json({ message, errorCode });
};

export const sendJson = (res: express.Response, data: any = { success: true }) => {
  res.status(200).json(data);
};

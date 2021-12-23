import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  const status: number = error.status || 500;
  const message: string = error.message || 'Something went wrong';
  if (status >= 500) logger.error(`${status}, ${message}`);

  if (error.type) {
    res.status(status).render('404');
    return;
  }
  res.status(status).json({ message });
}

export default errorMiddleware;

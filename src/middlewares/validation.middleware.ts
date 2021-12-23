import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';

export function validationMiddleware(type: any, skipMissingProperties = false): RequestHandler {
  return (req, res, next) => {
    validate(plainToInstance(type, req.body), { skipMissingProperties }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
}

export function validationParamsMiddleware(type: any, skipMissingProperties = false): RequestHandler {
  return (req, res, next) => {
    validate(plainToInstance(type, req.params), { skipMissingProperties }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
}

/**
 * service / dao 에서 발생 이슈 검증
 *
 * @param type
 * @param data
 * @param skipMissingProperties
 */
export function validationServiceMiddleware(type: any, data: any, skipMissingProperties = false): Promise<boolean> {
  return new Promise((resolve, reject) => {
    validate(plainToInstance(type, data), { skipMissingProperties }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');

        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

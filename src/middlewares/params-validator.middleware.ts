import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { HttpError } from '../utils';

const validateParams = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);
    if (error) {
      throw new HttpError(error.details[0].message?.replace(/['"]/g, ''), 400);
    }
    next();
  };
};

export { validateParams };

import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { HttpError } from '../utils';

const validateBody = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpError(error.details[0].message?.replace(/['"]/g, ''), 400);
    }
    next();
  };
};

export { validateBody };

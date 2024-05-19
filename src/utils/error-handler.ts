import { Response } from 'express';
import { ServiceErrorHandler } from './service-error-handler';

class ErrorHandler {
  static handleErrorResponse(res: Response, error: Error) {
    if (error instanceof ServiceErrorHandler) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export { ErrorHandler };

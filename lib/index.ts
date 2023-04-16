import { Request, Response, NextFunction } from 'express';
import * as Errors from './models/errors';
import { ErrorHandlerOptions, ErrorHandlerMiddleware } from './models/options';

export function errorHandler(options: ErrorHandlerOptions = {}): ErrorHandlerMiddleware {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    const errorHandler = 
      (options.handlers && options.handlers[(err as Errors.HttpError).name])
        ? options.handlers[(err as Errors.HttpError).name]
        : defaultErrorHandler;
    errorHandler(err, res, options);
  };

  function defaultErrorHandler(
    error: any,
    res: Response,
    options: ErrorHandlerOptions
  ): void {
    const { logger, reporter, formaters } = options;
    const statusCode = (error as any).statusCode || Errors.InternalServerError.statusCode;
  
    let format: string | undefined;
    if (formaters) {
      format = error.format;
    }
  
    let errorResponse: any;
    if (format && formaters && formaters[format]) {
      errorResponse = formaters[format](error);
    } else {
      errorResponse = {
        error: {
          message: error.message || 'Something went wrong!',
          code: statusCode,
        }
      };
    }

    if (statusCode >= 500) {
      if (logger) {
        logger('error', error.message, { stack: error.stack });
      }
      if (reporter) {
        reporter(error);
      }
    } else if (statusCode >= 400) {
      if (logger) {
        logger('warn', error.message, { stack: error.stack });
      }
    }
  
    res.status(statusCode).json(errorResponse).send();
  }
}

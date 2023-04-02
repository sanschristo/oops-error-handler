import { Request, Response, NextFunction } from 'express';

class HttpError extends Error {
  statusCode: number;
  name: string;
  constructor(name: string, message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class UnauthorizedError extends HttpError {
  constructor(message?: string) {
    super('UnauthorizedError', message || 'Unauthorized', 401);
  }
}

class ForbiddenError extends HttpError {
  constructor(message?: string) {
    super('ForbiddenError', message || 'Forbidden', 403);
  }
}

class NotFoundError extends HttpError {
  constructor(message?: string) {
    super('NotFoundError', message || 'Not Found', 404);
  }
}

class StateConflict extends HttpError {
  constructor(message?: string) {
    super('StateConflict', message || 'State Conflict', 409);
  }
}

class UnprocessableEntityError extends HttpError {
  constructor(message?: string) {
    super('UnprocessableEntityError', message || 'Unprocessable Entity', 422);
  }
}

class TooManyRequestsError extends HttpError {
  constructor(message?: string) {
    super('TooManyRequestsError', message || 'Too Many Requests', 429);
  }
}

function handleErrors(logger = console) {
  return function(err: Error, req: Request, res: Response, next: NextFunction) {
    logger.error(err.stack);

    if (err instanceof HttpError) {
      res.status(err.statusCode).send(err.message);
    } else {
      res.status(500).send('Something broke!');
    }
  }
}

export {
  HttpError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  StateConflict,
  UnprocessableEntityError,
  TooManyRequestsError,
  handleErrors,
};

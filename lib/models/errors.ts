export class HttpError extends Error {
  statusCode: number;
  name: string;
  errors?: Error[];
  format?: string;

  constructor(
    name: string,
    message: string,
    statusCode: number,
    errors?: Error[],
    format?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    this.errors = errors;
    this.format = format;
    Error.captureStackTrace(this, this.constructor);
  }

  setFormat(format: string = this.name) {
    this.format = format;
  }
}

export class BadRequestError extends HttpError {
    constructor(message?: string, errors?: Error[], format?: string) {
        super('BadRequestError', message || 'Bad Request', 400, errors, format);
    }
}
  
export class UnauthorizedError extends HttpError {
    constructor(message?: string, errors?: Error[], format?: string) {
        super('UnauthorizedError', message || 'Unauthorized', 401, errors, format);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message?: string, errors?: Error[], format?: string) {
        super('ForbiddenError', message || 'Forbidden', 403, errors, format);
    }
}

export class NotFoundError extends HttpError {
    constructor(message?: string, errors?: Error[], format?: string) {
        super('NotFoundError', message || 'Not Found', 404, errors, format);
    }
}

export class StateConflictError extends HttpError {
  constructor(message?: string, errors?: Error[], format?: string) {
    super('StateConflict', message || 'State Conflict', 409, errors, format);
  }
}

export class UnprocessableEntityError extends HttpError {
    constructor(message?: string, errors?: Error[], format?: string) {
        super('UnprocessableEntityError', message || 'Unprocessable Entity', 422, errors, format);
    }
}

export class TooManyRequestsError extends HttpError {
    constructor(message?: string, errors?: Error[], format?: string) {
        super('TooManyRequestsError', message || 'Too Many Requests', 429, errors, format);
    }
}

export class InternalServerError extends HttpError {
    static statusCode = 500;
    constructor(message?: string, errors?: Error[], format?: string) {
        super('InternalServerError', message || 'Internal Server Error', 500, errors, format);
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.TooManyRequestsError = exports.UnprocessableEntityError = exports.StateConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.HttpError = void 0;
class HttpError extends Error {
    constructor(name, message, statusCode, errors, format) {
        super(message);
        this.statusCode = statusCode;
        this.name = name;
        this.errors = errors;
        this.format = format;
        Error.captureStackTrace(this, this.constructor);
    }
    setFormat(format = this.name) {
        this.format = format;
    }
}
exports.HttpError = HttpError;
class BadRequestError extends HttpError {
    constructor(message, errors, format) {
        super('BadRequestError', message || 'Bad Request', 400, errors, format);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends HttpError {
    constructor(message, errors, format) {
        super('UnauthorizedError', message || 'Unauthorized', 401, errors, format);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends HttpError {
    constructor(message, errors, format) {
        super('ForbiddenError', message || 'Forbidden', 403, errors, format);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends HttpError {
    constructor(message, errors, format) {
        super('NotFoundError', message || 'Not Found', 404, errors, format);
    }
}
exports.NotFoundError = NotFoundError;
class StateConflictError extends HttpError {
    constructor(message, errors, format) {
        super('StateConflict', message || 'State Conflict', 409, errors, format);
    }
}
exports.StateConflictError = StateConflictError;
class UnprocessableEntityError extends HttpError {
    constructor(message, errors, format) {
        super('UnprocessableEntityError', message || 'Unprocessable Entity', 422, errors, format);
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
class TooManyRequestsError extends HttpError {
    constructor(message, errors, format) {
        super('TooManyRequestsError', message || 'Too Many Requests', 429, errors, format);
    }
}
exports.TooManyRequestsError = TooManyRequestsError;
class InternalServerError extends HttpError {
    constructor(message, errors, format) {
        super('InternalServerError', message || 'Internal Server Error', 500, errors, format);
    }
}
InternalServerError.statusCode = 500;
exports.InternalServerError = InternalServerError;

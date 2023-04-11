export declare class HttpError extends Error {
    statusCode: number;
    name: string;
    errors?: Error[];
    format?: string;
    constructor(name: string, message: string, statusCode: number, errors?: Error[], format?: string);
    setFormat(format?: string): void;
}
export declare class BadRequestError extends HttpError {
    constructor(message?: string, errors?: Error[], format?: string);
}
export declare class UnauthorizedError extends HttpError {
    constructor(message?: string, errors?: Error[], format?: string);
}
export declare class ForbiddenError extends HttpError {
    constructor(message?: string, errors?: Error[], format?: string);
}
export declare class NotFoundError extends HttpError {
    constructor(message?: string, errors?: Error[], format?: string);
}
export declare class StateConflictError extends HttpError {
    constructor(message?: string, errors?: Error[], format?: string);
}
export declare class UnprocessableEntityError extends HttpError {
    constructor(message?: string, errors?: Error[], format?: string);
}
export declare class TooManyRequestsError extends HttpError {
    constructor(message?: string, errors?: Error[], format?: string);
}
export declare class InternalServerError extends HttpError {
    static statusCode: number;
    constructor(message?: string, errors?: Error[], format?: string);
}

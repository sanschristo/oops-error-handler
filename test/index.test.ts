import express from 'express';
import { errorHandler } from '../lib/index'
import * as errors from '../lib/models/errors';

describe('ErrorHandler', () => {
    let sendStub: jest.Mock;
    let jsonStub: jest.Mock;
    let statusStub: jest.Mock;
    let res: Partial<express.Response>;

    beforeEach(() => {
        sendStub = jest.fn();
        jsonStub = jest.fn().mockReturnValue({ send: sendStub });
        statusStub = jest.fn().mockReturnValue({ json: jsonStub});
        res = { status: statusStub };
    });

    it('Does not throw when used by express app', () => {
        const app = express();
        app.use(errorHandler());
    });

    it('Returns a function', () => {
        const handler = errorHandler();
        expect(typeof handler).toBe('function');
    });

    it('Handles unknown errors as 500', () => {
        errorHandler()(new Error(), undefined as any, res as any, () => {});

        expect(statusStub).toHaveBeenCalledWith(500);
        expect(jsonStub).toHaveBeenCalledWith({error: {message: 'Something went wrong!', code: 500}});
        expect(sendStub).toHaveBeenCalled();
    });

    it('Handles known errors', () => {
        const knownErrors = [
            new errors.BadRequestError(),
            new errors.UnauthorizedError(),
            new errors.ForbiddenError(),
            new errors.NotFoundError(),
            new errors.StateConflictError(),
            new errors.UnprocessableEntityError(),
            new errors.TooManyRequestsError(),
            new errors.InternalServerError()
        ];

        knownErrors.forEach((error) => {
            errorHandler()(error, undefined as any, res as any, () => {});
    
            expect(statusStub).toHaveBeenCalledWith(error.statusCode);
            expect(jsonStub).toHaveBeenCalledWith({error: {message: error.message, code: error.statusCode}});
            expect(sendStub).toHaveBeenCalled();
        });
    });

    it('Uses custom handlers', () => {
        const error = new errors.BadRequestError();
        const options = { handlers: { BadRequestError: jest.fn() } };

        errorHandler(options)(error, undefined as any, res as any, () => {});

        expect(options.handlers.BadRequestError).toBeCalledWith(error, res, options);
    });

    it('Uses default handlers for unspecified errors', () => {
        const error = new errors.InternalServerError();
        const options = { handlers: { BadRequestError: jest.fn() } };

        errorHandler(options)(error, undefined as any, res as any, () => {});

        expect(options.handlers.BadRequestError).not.toBeCalled();
        expect(statusStub).toHaveBeenCalledWith(500);
        expect(jsonStub).toHaveBeenCalledWith({error: {message: error.message, code: 500}});
        expect(sendStub).toHaveBeenCalled();
    });

    it('Uses custom formater', () => {
        const error = new errors.BadRequestError();
        const options = { formaters: { BadRequestError: jest.fn() } };
        error.setFormat();

        errorHandler(options)(error, undefined as any, res as any, () => {});

        expect(options.formaters.BadRequestError).toBeCalledWith(error);
    });

    it('Uses custom formater when it does not match the name of the error', () => {
        const error = new errors.BadRequestError();
        const options = { formaters: { foo: jest.fn() } };
        error.setFormat('foo');

        errorHandler(options)(error, undefined as any, res as any, () => {});

        expect(options.formaters.foo).toBeCalledWith(error);
    });

    it('Uses default formater for unspecified errors', () => {
        const error = new errors.InternalServerError();
        const options = { formaters: { BadRequestError: jest.fn() } };
        error.setFormat();

        errorHandler(options)(error, undefined as any, res as any, () => {});

        expect(options.formaters.BadRequestError).not.toBeCalledWith(error);
    });

    it('Uses customer logger for server errors', () => {
        const error = new errors.InternalServerError();
        const options = { logger: jest.fn() };

        errorHandler(options)(error, undefined as any, res as any, () => {});

        expect(options.logger).toBeCalledWith('error', error.message, { stack: error.stack });
    });

    it('Uses customer logger for client errors', () => {
        const error = new errors.UnprocessableEntityError();
        const options = { logger: jest.fn() };

        errorHandler(options)(error, undefined as any, res as any, () => {});

        expect(options.logger).toBeCalledWith('warn', error.message, { stack: error.stack });
    });

    it('It reports server errors', () => {
        const error = new errors.InternalServerError();
        const options = { reporter: jest.fn() };

        errorHandler(options)(error, undefined as any, res as any, () => {});

        expect(options.reporter).toBeCalledWith(error);
    });

    it('Does not report client errors', () => {
        const error = new errors.UnprocessableEntityError();
        const options = { reporter: jest.fn() };

        errorHandler(options)(error, undefined as any, res as any, () => {});

        expect(options.reporter).not.toBeCalled();
    });
});

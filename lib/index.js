"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const Errors = __importStar(require("./models/errors"));
function errorHandler(options = {}) {
    return (req, res, next) => {
        try {
            next();
        }
        catch (error) {
            const errorHandler = (options.handlers && options.handlers[error.name])
                ? options.handlers[error.name]
                : defaultErrorHandler;
            errorHandler(error, res, options);
        }
    };
    function defaultErrorHandler(error, res, options) {
        const { logger, reporter, formaters, handlers } = options;
        const statusCode = error.statusCode || Errors.InternalServerError.statusCode;
        let format;
        if (formaters) {
            format = error.format;
        }
        let errorResponse;
        if (format && formaters && formaters[format]) {
            errorResponse = formaters[format](error);
        }
        else {
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
        }
        else if (statusCode >= 400) {
            if (logger) {
                logger('warn', error.message, { stack: error.stack });
            }
        }
        res.status(statusCode).json(errorResponse);
    }
}
exports.errorHandler = errorHandler;

import { Request, Response, NextFunction } from "express";
export interface ErrorResponse {
    error: {
        message: string;
        code: string;
        details?: any;
    };
}
export type ErrorResponseFormater = (error: Error) => any;
export interface ErrorResponseFormaters {
    [key: string]: ErrorResponseFormater;
}
type SyncLogger = (level: 'error' | 'warn' | 'info', message: string, metadata?: any) => void;
type AsyncLogger = (level: 'error' | 'warn' | 'info', message: string, metadata?: any) => Promise<void>;
export type Logger = SyncLogger | AsyncLogger;
export type ErrorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => void;
export type ErrorHandler = (error: any, res: Response, options: ErrorHandlerOptions) => void;
export interface ErrorHandlerOptions {
    handlers?: Record<string, ErrorHandler>;
    formaters?: ErrorResponseFormaters;
    logger?: Logger;
    reporter?: (error: Error) => Promise<void>;
}
export {};

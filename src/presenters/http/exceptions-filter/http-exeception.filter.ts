import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

import { Exception } from '@domain/exceptions/common/base.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    public catch(exception: Error, host: ArgumentsHost): void {
        const request = host.switchToHttp().getRequest<Request>();
        const response = host.switchToHttp().getResponse<Response>();

        let statusCode = 500;
        let errorResponse = { message: exception?.message };

        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
            errorResponse = { message: exception.message };
        } else if (exception instanceof Exception) {
            statusCode = exception.code;
            errorResponse = { message: exception.message };
        }

        const { body, ip, params, query, path, method } = request;
        const message = {
            body: { ...body },
            ip,
            params,
            query,
            path,
            method,
        };

        Logger.log(message);
        response.status(statusCode).json(errorResponse);
    }
}

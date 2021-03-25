import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { DateHelper } from '@shared/helpers/date.helper';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    public catch(exception: any, host: ArgumentsHost): void {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json({
            status,
            timestamp: DateHelper.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        });
    }
}

import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Inject,
    Logger,
    LoggerService,
} from "@nestjs/common";
import { Request, Response } from "express";

import * as date from "@helpers/date.helper";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(
        @Inject(Logger)
        private readonly logger: LoggerService
    ) {}

    public catch(exception: any, host: ArgumentsHost): void {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception.getMessage() || "Something went wrong";

        this.log(request, message, status);

        response.status(status).json({
            message,
            status,
            timestamp: date.now().format("YYYY-MM-DD HH:mm:ss"),
        });
    }

    private log(request: Request, message: string, status: number): void {
        const { baseUrl, body, params, query } = request;

        const errorContext = {
            baseUrl,
            body,
            message,
            params,
            query,
            status,
            userEmail: request?.user.email,
        };

        delete errorContext.body.password;
        delete errorContext.body.passwordConfirmation;

        this.logger.error(errorContext);
    }
}

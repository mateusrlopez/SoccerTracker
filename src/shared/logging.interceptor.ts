import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    Logger,
    LoggerService,
    NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(@Inject(Logger) private readonly logger: LoggerService) {}

    public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest<Request>();

        this.log(request);

        return next.handle();
    }

    private log(request: Request): void {
        const { baseUrl, body, ip, params, query } = request;

        const logContext = {
            baseUrl,
            body: { ...body },
            ip,
            params,
            query,
            userEmail: request?.user?.email,
        };

        delete logContext.body.password;
        delete logContext.body.passwordConfirmation;

        this.logger.log(logContext);
    }
}

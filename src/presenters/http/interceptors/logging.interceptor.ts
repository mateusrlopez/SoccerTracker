import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const httpContxt = context.switchToHttp();

        const request = httpContxt.getRequest<Request>();
        const requestStartTime = Date.now();

        return next.handle().pipe(
            tap((): void => {
                const { body, ip, params, query, path, method } = request;
                const requestEndTime = Date.now();

                const message = {
                    body: { ...body },
                    ip,
                    params,
                    query,
                    path,
                    method,
                    spentTime: `${requestEndTime - requestStartTime}ms`,
                };

                Logger.log(message);
            })
        );
    }
}

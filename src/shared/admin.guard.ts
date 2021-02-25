import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export class AdminGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest<Request>();

        return request?.user.admin;
    }
}

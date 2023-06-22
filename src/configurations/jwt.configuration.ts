import { registerAs } from '@nestjs/config';
import { get } from 'env-var';

export interface IJwtConfiguration {
    secret: string;
}

export const JwtConfiguration = registerAs<IJwtConfiguration>('jwt', () => ({
    secret: get('JWT_SECRET').required().asString(),
}));

import { registerAs } from '@nestjs/config';
import { get } from 'env-var';

export interface IAppConfig {
    port: number;
    prefix: string;
}

export const AppConfig = registerAs<IAppConfig>('app', () => ({
    port: get('PORT').required().asPortNumber(),
    prefix: get('API_PREFIX').asString(),
}));

import { registerAs } from '@nestjs/config';
import { get } from 'env-var';

export interface ICorsConfig {
    headers: string[];
    methods: string[];
    origin: string[];
}

export const CorsConfig = registerAs<ICorsConfig>('cors', () => ({
    headers: get('CORS_HEADERS').required().asArray(','),
    methods: get('CORS_METHODS').required().asArray(','),
    origin: get('CORS_ORIGIN').required().asArray(','),
}));

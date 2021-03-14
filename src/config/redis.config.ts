import * as env from '@shared/helpers/env.helper';

export const redisConfig = {
    host: env.getVariable('REDIS_HOST'),
    password: env.getVariable('REDIS_PASSWORD'),
    port: env.getNumericVariable('REDIS_PORT'),
};

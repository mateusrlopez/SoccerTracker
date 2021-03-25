import { EnvHelper } from '@shared/helpers/env.helper';

export const RedisConfig = {
    host: EnvHelper.getVariable('REDIS_HOST'),
    password: EnvHelper.getVariable('REDIS_PASSWORD'),
    port: EnvHelper.getNumericVariable('REDIS_PORT'),
};

import { BullModuleOptions } from '@nestjs/bull';

import { EnvHelper } from '@shared/helpers/env.helper';

import { RedisConfig } from './redis.config';

export const QueueConfig: BullModuleOptions = {
    redis: {
        db: EnvHelper.getNumericVariable('QUEUE_DB'),
        host: RedisConfig.host,
        password: RedisConfig.password,
        port: RedisConfig.port,
    },
};

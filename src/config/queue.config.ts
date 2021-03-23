import { BullModuleOptions } from '@nestjs/bull';

import * as env from '@shared/helpers/env.helper';

import { RedisConfig } from './redis.config';

export const QueueConfig: BullModuleOptions = {
    redis: {
        db: env.getNumericVariable('QUEUE_DB'),
        host: RedisConfig.host,
        password: RedisConfig.password,
        port: RedisConfig.port,
    },
};

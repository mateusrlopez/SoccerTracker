import { CacheModuleOptions } from '@nestjs/common';
import * as RedisStore from 'cache-manager-redis-store';

import * as env from '@shared/helpers/env.helper';

import { RedisConfig } from './redis.config';

export const CacheConfig: CacheModuleOptions = {
    auth_pass: RedisConfig.password,
    db: env.getNumericVariable('CACHE_DB'),
    host: RedisConfig.host,
    max: env.getNumericVariable('CACHE_MAX'),
    port: RedisConfig.port,
    store: RedisStore,
    ttl: env.getNumericVariable('CACHE_TTL'),
};

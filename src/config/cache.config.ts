import { CacheModuleOptions } from '@nestjs/common';
import * as RedisStore from 'cache-manager-redis-store';

import { EnvHelper } from '@shared/helpers/env.helper';

import { RedisConfig } from './redis.config';

export const CacheConfig: CacheModuleOptions = {
    auth_pass: RedisConfig.password,
    db: EnvHelper.getNumericVariable('CACHE_DB'),
    host: RedisConfig.host,
    max: EnvHelper.getNumericVariable('CACHE_MAX'),
    port: RedisConfig.port,
    store: RedisStore,
    ttl: EnvHelper.getNumericVariable('CACHE_TTL'),
};

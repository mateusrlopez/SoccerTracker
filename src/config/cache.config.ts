import { CacheModuleOptions } from "@nestjs/common";
import * as RedisStore from "cache-manager-redis-store";

import * as env from "@helpers/env.helper";

import { redisConfig } from "./redis.config";

export const cacheConfig: CacheModuleOptions = {
    auth_pass: redisConfig.password,
    db: env.getNumericVariable("CACHE_DB"),
    host: redisConfig.host,
    max: env.getNumericVariable("CACHE_MAX"),
    port: redisConfig.port,
    store: RedisStore,
    ttl: env.getNumericVariable("CACHE_TTL"),
};

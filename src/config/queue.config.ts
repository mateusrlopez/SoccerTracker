import { BullModuleOptions } from "@nestjs/bull";

import * as env from "@helpers/env.helper";

import { redisConfig } from "./redis.config";

export const queueConfig: BullModuleOptions = {
    redis: {
        db: env.getNumericVariable("QUEUE_DB"),
        host: redisConfig.host,
        password: redisConfig.password,
        port: redisConfig.port,
    },
};

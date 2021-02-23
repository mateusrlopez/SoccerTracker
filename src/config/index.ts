import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

export { appConfig } from "./app.config";
export { cacheConfig } from "./cache.config";
export { corsConfig } from "./cors.config";
export { databaseConfig } from "./database.config";
export { jwtConfig } from "./jwt.config";
export { loggerConfig } from "./logger.config";
export { mailerConfig } from "./mailer.config";
export { queueConfig } from "./queue.config";
export { redisConfig } from "./redis.config";

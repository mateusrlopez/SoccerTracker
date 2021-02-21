import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as dotenv from "dotenv";
import * as helmet from "helmet";
import { WinstonModule } from "nest-winston";

import { appConfig } from "@config/app.config";
import { corsConfig } from "@config/cors.config";
import { loggerConfig } from "@config/logger.config";

import { AppModule } from "./app.module";

dotenv.config();

async function bootstrap() {
    const logger = WinstonModule.createLogger(loggerConfig);

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger,
    });
    const { hostname, port, routePrefix } = appConfig;

    app.enableCors(corsConfig);
    app.setGlobalPrefix(routePrefix);

    app.use(helmet());

    await app.listen(port, hostname, () => {
        logger.log(`Application started at port ${port}`);
    });
}
bootstrap();

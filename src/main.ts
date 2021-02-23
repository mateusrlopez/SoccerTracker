import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as helmet from "helmet";
import { WinstonModule } from "nest-winston";
import "dotenv/config";

import { appConfig, corsConfig, loggerConfig } from "@config/index";

import { AppModule } from "./app.module";

async function bootstrap() {
    const { hostname, port, routePrefix } = appConfig;
    const logger = WinstonModule.createLogger(loggerConfig);

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger,
    });

    app.enableCors(corsConfig);
    app.setGlobalPrefix(routePrefix);

    app.use(helmet());

    await app.listen(port, hostname, () => {
        logger.log(`Application started at port ${port}`);
    });
}
bootstrap();

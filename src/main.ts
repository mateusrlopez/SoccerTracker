import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';

import { appConfig } from '@config/app.config';
import { corsConfig } from '@config/cors.config';
import { loggerConfig } from '@config/logger.config';

import { AppModule } from './app.module';

async function bootstrap() {
    const { hostname, port, routePrefix } = appConfig;
    const logger = WinstonModule.createLogger(loggerConfig);

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger,
    });

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.enableCors(corsConfig);
    app.setGlobalPrefix(routePrefix);

    app.use(helmet());

    await app.listen(port, hostname, () => {
        logger.log(`Application started at port ${port}`);
    });
}
bootstrap();

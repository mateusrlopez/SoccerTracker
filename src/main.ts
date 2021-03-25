import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import { WinstonModule } from 'nest-winston';

import { AppConfig } from '@config/app.config';
import { CorsConfig } from '@config/cors.config';
import { LoggerConfig } from '@config/logger.config';

import { AppModule } from './app.module';

async function bootstrap() {
    const { hostname, port, routePrefix } = AppConfig;
    const logger = WinstonModule.createLogger(LoggerConfig);

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger,
    });

    app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true, transform: true }));
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector), {
            strategy: 'exposeAll',
            excludeExtraneousValues: false,
        })
    );

    app.enableCors(CorsConfig);
    app.setGlobalPrefix(routePrefix);

    app.use(helmet());

    await app.listen(port, hostname, () => {
        logger.log(`Application started at port ${port}`);
    });
}

bootstrap();

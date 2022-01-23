import { ClassSerializerInterceptor, INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as express from 'express';
import * as helmet from 'helmet';

import { IAppConfig } from '@config/app.config';
import { ICorsConfig } from '@config/cors.config';

import { AppModule } from './app.module';

function buildAPIDocumentation(app: INestApplication) {
    const title = 'Soccer Stats';
    const description = 'Soccer Stats API Documentation';
    const version = '1.0.0';

    const config = new DocumentBuilder().setTitle(title).setDescription(description).setVersion(version).build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('documentation', app, document);
}

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService = app.get(ConfigService);

    const { port, prefix } = configService.get<IAppConfig>('app');
    const { headers, methods, origin } = configService.get<ICorsConfig>('cors');

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector), { excludeExtraneousValues: true }));
    app.setGlobalPrefix(prefix);

    app.enableCors({ exposedHeaders: headers, methods, origin });
    app.use(helmet());
    app.use(compression());
    app.use(express.json({ limit: '50mb' }));

    buildAPIDocumentation(app);

    await app.listen(port, () => Logger.log(`Application server started at port ${port}`));
}

bootstrap();

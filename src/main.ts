import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { IApplicationConfiguration } from './configurations/application.configuration';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector), {
            strategy: 'exposeAll',
            excludeExtraneousValues: false,
        })
    );

    app.enableCors({ origin: '*' });

    app.use(helmet.default());
    app.use(compression());

    const configurationService = app.get<ConfigService>(ConfigService);

    const { port } = configurationService.get<IApplicationConfiguration>('application');

    await app.listen(port, () => Logger.log(`application server started on port ${port}`));
}

bootstrap();

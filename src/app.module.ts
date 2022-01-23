import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppConfig } from '@config/app.config';
import { CorsConfig } from '@config/cors.config';
import { DatabaseConfig } from '@config/database.config';
import { FileStorageClientConfig } from '@config/file-storage-client.config';
import { FileStorageConfig } from '@config/file-storage.config';
import { InfrastructureModule } from '@infra/modules/infra.module';
import { StadiumModule } from '@infra/modules/stadium.module';
import { TeamModule } from '@infra/modules/team.module';
import { HttpExceptionFilter } from '@presenters/http/exceptions-filter/http-exeception.filter';
import { LoggingInterceptor } from '@presenters/http/interceptors/logging.interceptor';

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: process.env.NODE_ENV === 'production',
            load: [AppConfig, CorsConfig, DatabaseConfig, FileStorageConfig, FileStorageClientConfig],
            isGlobal: true,
        }),
        InfrastructureModule,
        TeamModule,
        StadiumModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
    ],
})
export class AppModule {}

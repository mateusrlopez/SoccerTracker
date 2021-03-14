import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { CacheModule, ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@auth/auth.module';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { cacheConfig } from '@config/cache.config';
import { databaseConfig } from '@config/database.config';
import { mailerConfig } from '@config/mailer.config';
import { queueConfig } from '@config/queue.config';
import { PasswordModule } from '@password-reset/password-reset.module';
import { PlayerModule } from '@player/player.module';
import { GlobalExceptionFilter } from '@shared/exception.filter';
import { LoggingInterceptor } from '@shared/logging.interceptor';
import { ValidationPipe } from '@shared/validation.pipe';
import { StadiumModule } from '@stadium/stadium.module';
import { TeamModule } from '@team/team.module';
import { UserModule } from '@user/user.module';

@Module({
    controllers: [],
    exports: [],
    imports: [
        BullModule.forRoot(queueConfig),
        CacheModule.register(cacheConfig),
        MailerModule.forRoot(mailerConfig),
        TypeOrmModule.forRoot(databaseConfig),
        AuthModule,
        PasswordModule,
        UserModule,
        TeamModule,
        StadiumModule,
        PlayerModule,
    ],
    providers: [
        Logger,
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
        {
            provide: APP_GUARD,
            useClass: JwtGuard,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class AppModule {}

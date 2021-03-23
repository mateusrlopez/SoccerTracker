import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { CacheModule, ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@auth/auth.module';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { CacheConfig } from '@config/cache.config';
import { DatabaseConfig } from '@config/database.config';
import { MailerConfig } from '@config/mailer.config';
import { QueueConfig } from '@config/queue.config';
import { ManagerModule } from '@manager/manager.module';
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
        BullModule.forRoot(QueueConfig),
        CacheModule.register(CacheConfig),
        MailerModule.forRoot(MailerConfig),
        ScheduleModule.forRoot(),
        TypeOrmModule.forRoot(DatabaseConfig),
        AuthModule,
        PasswordModule,
        UserModule,
        TeamModule,
        StadiumModule,
        PlayerModule,
        ManagerModule,
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

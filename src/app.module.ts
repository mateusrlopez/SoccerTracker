import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { UserModule } from './users/user.module';
import { ApplicationConfiguration } from './configurations/application.configuration';
import { AuthModule } from './auth/auth.module';
import { StadiumModule } from './stadiums/stadium.module';
import { TeamModule } from './teams/team.module';
import { MatchModule } from './matches/match.module';
import { GlobalExceptionFilter } from './http/exception.filter';
import { JwtConfiguration } from './configurations/jwt.configuration';
import { JwtGuard } from './auth/guards/jwt.guard';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: process.env.NODE_ENV === 'production',
            load: [ApplicationConfiguration, JwtConfiguration],
        }),
        UserModule,
        AuthModule,
        StadiumModule,
        TeamModule,
        MatchModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
        {
            provide: APP_GUARD,
            useClass: JwtGuard,
        },
    ],
})
export class AppModule {}

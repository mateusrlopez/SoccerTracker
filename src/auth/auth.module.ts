import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IJwtConfiguration } from '../configurations/jwt.configuration';
import { UserModule } from '../user/user.module';
import { AuthServiceProvider, JwtServiceProvider } from './auth.providers';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const configuration = configService.get<IJwtConfiguration>('jwt');
                return {
                    secret: configuration.secret,
                };
            },
        }),
        PassportModule,
    ],
    controllers: [AuthController],
    providers: [JwtServiceProvider, AuthServiceProvider, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtConfig } from '@config/jwt.config';
import { UserModule } from '@user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    controllers: [AuthController],
    exports: [AuthService],
    imports: [
        JwtModule.register({
            secret: JwtConfig.secret,
        }),
        PassportModule.register({
            session: false,
        }),
        UserModule,
    ],
    providers: [AuthService, JWTStrategy, LocalStrategy],
})
export class AuthModule {}

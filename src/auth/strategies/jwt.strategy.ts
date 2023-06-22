import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IUser } from '../../users/entities/user.entity';
import { IJwtConfiguration } from '../../configurations/jwt.configuration';
import { IAuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: IAuthService,
        private readonly configService: ConfigService
    ) {
        const configuration = configService.get<IJwtConfiguration>('jwt');

        super({
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configuration.secret,
        });
    }

    public async validate(payload: string): Promise<IUser> {
        return this.authService.validateToken(payload);
    }
}

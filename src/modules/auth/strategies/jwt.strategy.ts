import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtConfig } from '@config';
import { IUser } from '@user/interfaces/user.interface';

import { AuthService } from '../auth.service';
import { ITokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfig.secret,
        });
    }

    public async validate(payload: ITokenPayload): Promise<IUser> {
        return this.authService.retrieveUser(payload.email);
    }
}

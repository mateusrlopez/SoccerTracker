import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IUser } from '../../user/entities/user.entity';
import { IAuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: IAuthService) {
        super({
            session: false,
            passwordField: 'password',
            usernameFields: 'email',
        });
    }

    public async validate(username: string, password: string): Promise<IUser> {
        return this.authService.validateSignIn(username, password);
    }
}

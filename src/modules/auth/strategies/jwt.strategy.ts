import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { AuthService } from "@auth/auth.service";
import { JWTPayload } from "@auth/interfaces/jwt-payload.interface";
import { jwtConfig } from "@config/jwt.config";
import { User } from "@user/entities/user.entity";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secreOrKey: jwtConfig.secret,
        });
    }

    public async validate(payload: JWTPayload): Promise<User> {
        return this.authService.retrieveUser(payload.email);
    }
}

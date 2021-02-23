import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { jwtConfig } from "@config/jwt.config";
import { User } from "@user/entities/user.entity";

import { AuthService } from "../auth.service";
import { JWTPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfig.secret,
        });
    }

    public async validate(payload: JWTPayload): Promise<User> {
        return this.authService.retrieveUser(payload.email);
    }
}

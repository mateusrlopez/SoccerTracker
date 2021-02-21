import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import * as hash from "@helpers/hash.helper";
import { ICreateUserDto } from "@user/interfaces/create-user-dto.interface";
import { IUser } from "@user/interfaces/user.interface";
import { UserService } from "@user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    public async register(createUserDto: ICreateUserDto): Promise<IUser> {
        return this.userService.create(createUserDto);
    }

    public async validate(email: string, password: string): Promise<IUser> {
        const user = await this.userService.findByEmail(email);

        if (typeof user === "undefined" || !hash.compare(password, user.password)) {
            throw new UnauthorizedException("Invalid credentials");
        }

        return user;
    }

    public async retrieveUser(email: string): Promise<IUser> {
        const user = await this.userService.findByEmail(email);

        if (typeof user === "undefined") {
            throw new UnauthorizedException("Invalid user");
        }

        return user;
    }

    public async assignToken(user: IUser): Promise<string> {
        return this.jwtService.signAsync(user.email);
    }
}

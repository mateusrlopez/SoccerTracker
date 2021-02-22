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
        try {
            const user = await this.userService.findByEmail(email);

            if (!hash.compare(password, user.password)) {
                throw new Error();
            }

            return user;
        } catch (e) {
            throw new UnauthorizedException("Invalid credentials");
        }
    }

    public async retrieveUser(email: string): Promise<IUser> {
        try {
            const user = await this.userService.findByEmail(email);
            return user;
        } catch (e) {
            throw new UnauthorizedException("Invalid users");
        }
    }

    public async assignToken(user: IUser): Promise<string> {
        return this.jwtService.signAsync(user.email);
    }
}

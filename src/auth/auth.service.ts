import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync, hash, genSalt } from 'bcryptjs';
import { UserNotExistsException } from '../user/exceptions/not-exists.exceptions';
import { IUser } from '../user/entities/user.entity';
import { IUserService } from '../user/user.service';
import { ICreateUser } from '../user/dto/create-user.dto';

export interface IAuthService {
    register(createUserDto: ICreateUser): Promise<IUser>;
    validateSignIn(email: string, password: string): Promise<IUser>;
    assignToken(user: IUser): Promise<string>;
    validateToken(payload: string): Promise<IUser>;
}

export interface IJwtService {
    signAsync(payload: string): Promise<string>;
}

@Injectable()
export class AuthServiceImplementation implements IAuthService {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: IUserService,
        @Inject('JWT_SERVICE') private readonly jwtService: IJwtService
    ) {}

    async register(createUserDto: ICreateUser): Promise<IUser> {
        const salt = await genSalt(10);
        const hashedPassword = await hash(createUserDto.password, salt);

        return this.userService.create({ ...createUserDto, password: hashedPassword });
    }

    async validateSignIn(email: string, password: string): Promise<IUser> {
        let user: IUser;

        try {
            user = await this.userService.findOneByEmail(email);
        } catch (e) {
            if (e instanceof UserNotExistsException) {
                throw new UnauthorizedException('Invalid user');
            }
        }

        if (!compareSync(password, user.password)) {
            throw new UnauthorizedException('Invalid user');
        }

        return user;
    }

    async assignToken(user: IUser): Promise<string> {
        return this.jwtService.signAsync(user.email);
    }

    async validateToken(payload: string): Promise<IUser> {
        let user: IUser;

        try {
            user = await this.userService.findOneByEmail(payload);
        } catch (e) {
            if (e instanceof UserNotExistsException) {
                throw new UnauthorizedException('Invalid user');
            }
        }

        return user;
    }
}

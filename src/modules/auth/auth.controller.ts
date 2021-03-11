import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { CreateUserDto } from '@user/dto/create-user.dto';
import { IUser } from '@user/interfaces/user.interface';

import { AuthService } from './auth.service';
import { AuthUser } from './decorators/auth-user.decorator';
import { Public } from './decorators/public-route.decorator';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    public async register(
        @Body() createUserDto: CreateUserDto,
        @Res({ passthrough: true }) res: Response
    ): Promise<IUser> {
        const user = await this.authService.register(createUserDto);
        const token = await this.authService.assignToken(user);

        res.append('Authorization', `Bearer ${token}`);

        return user;
    }

    @Public()
    @Post('login')
    @UseGuards(LocalGuard)
    public async login(
        @AuthUser() user: IUser,
        @Res({ passthrough: true }) res: Response
    ): Promise<IUser> {
        const token = await this.authService.assignToken(user);

        res.append('Authorization', `Bearer ${token}`);

        return user;
    }

    @Get('me')
    @UseGuards(JwtGuard)
    public async me(@AuthUser() user: IUser): Promise<IUser> {
        return user;
    }
}

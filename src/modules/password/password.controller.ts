import { Body, Controller, HttpCode, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from '@auth/auth.service';
import { Public } from '@auth/decorators/public-route.decorator';
import { IUser } from '@user/interfaces/user.interface';

import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PasswordService } from './password.service';

@Controller('password')
export class PasswordController {
    constructor(
        private readonly authService: AuthService,
        private readonly passwordService: PasswordService
    ) {}

    @Public()
    @Put('reset')
    public async resetPassword(
        @Body() resetPasswordDto: ResetPasswordDto,
        @Res({ passthrough: true }) res: Response
    ): Promise<IUser> {
        const user = await this.passwordService.resetPassword(resetPasswordDto);
        const token = await this.authService.assignToken(user);

        res.append('Authorization', `Bearer ${token}`);

        return user;
    }

    @Public()
    @Post('request-reset')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async requestReset(
        @Body() requestPasswordResetDto: RequestPasswordResetDto
    ): Promise<void> {
        await this.passwordService.createPasswordResetRequest(requestPasswordResetDto);
    }
}

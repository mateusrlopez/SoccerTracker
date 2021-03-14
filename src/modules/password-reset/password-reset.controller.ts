import { Body, Controller, HttpCode, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from '@auth/auth.service';
import { Public } from '@auth/decorators/public-route.decorator';
import { IUser } from '@user/interfaces/user.interface';

import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PasswordResetService } from './password-reset.service';

@Controller('password')
export class PasswordResetController {
    constructor(
        private readonly authService: AuthService,
        private readonly passwordResetService: PasswordResetService
    ) {}

    @Public()
    @Put('reset')
    public async resetPassword(
        @Body() resetPasswordDto: ResetPasswordDto,
        @Res({ passthrough: true }) res: Response
    ): Promise<IUser> {
        const user = await this.passwordResetService.resetPassword(resetPasswordDto);
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
        await this.passwordResetService.createPasswordResetRequest(requestPasswordResetDto);
    }
}
